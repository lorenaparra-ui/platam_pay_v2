import type { SignatureReplacement } from '@modules/contracts/domain/ports/signature-provider.port';

export type TemplateDataInput = Readonly<Record<string, unknown>>;

export type ExplicitReplacementInput = Readonly<{
  from: string;
  to: string;
}>;

/**
 * Construye la lista de reemplazos para ZapSign a partir de `template_data`
 * y `replacements` explícitos (estos últimos tienen prioridad).
 * Basado en la lógica de `CreateContractFromApprovalUseCase` de platam_pay_contracts.
 */
export function build_zapsign_replacements(
  template_data: TemplateDataInput | undefined,
  explicit: readonly ExplicitReplacementInput[] | undefined,
): SignatureReplacement[] {
  const replacement_map = new Map<string, string>();

  if (template_data !== undefined) {
    for (const [raw_key, raw_value] of Object.entries(template_data)) {
      if (raw_value == null) continue;
      const normalized_value = String(raw_value);
      for (const variant of variable_name_variants(raw_key)) {
        if (!replacement_map.has(variant)) {
          replacement_map.set(variant, normalized_value);
        }
      }
    }
  }

  if (explicit !== undefined) {
    for (const r of explicit) {
      replacement_map.set(r.from, r.to);
    }
  }

  return [...replacement_map.entries()].map(([from, to]) => ({ from, to }));
}

function variable_name_variants(raw_key: string): string[] {
  const cleaned = raw_key
    .replaceAll('{{', '')
    .replaceAll('}}', '')
    .trim()
    .replace(/\s+/g, ' ');

  const no_accents = cleaned.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const snake_case = no_accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  const spaced_from_snake = snake_case.replace(/_/g, ' ');

  const base_variants = [
    cleaned,
    cleaned.toUpperCase(),
    cleaned.toLowerCase(),
    no_accents,
    no_accents.toUpperCase(),
    no_accents.toLowerCase(),
    snake_case,
    spaced_from_snake,
    spaced_from_snake.toUpperCase(),
    spaced_from_snake.toLowerCase(),
  ];

  const accent_aware_variants = base_variants.flatMap((value) => [
    value,
    apply_accent_word_aliases(value),
  ]);

  const with_braces = accent_aware_variants.flatMap((value) => [
    value,
    `{{${value}}}`,
    `{{ ${value} }}`,
  ]);

  return with_braces.filter(
    (value, index, array) => value.length > 0 && array.indexOf(value) === index,
  );
}

function apply_accent_word_aliases(value: string): string {
  const aliases: Record<string, string> = {
    NUMERO: 'NÚMERO',
    ELECTRONICO: 'ELECTRÓNICO',
    DIRECCION: 'DIRECCIÓN',
    TELEFONO: 'TELÉFONO',
    IDENTIFICACION: 'IDENTIFICACIÓN',
  };

  let transformed = value;
  for (const [plain, accented] of Object.entries(aliases)) {
    transformed = transformed
      .replaceAll(plain, accented)
      .replaceAll(plain.toLowerCase(), accented.toLowerCase());
  }
  return transformed;
}
