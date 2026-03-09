import { LegalRepresentative } from '@transversal/domain/models/legal-representative.model';

/**
 * Patrón para línea que contiene identificación (C.C. No. X, C.E. No. X).
 * Sin flag 'g' para que match() devuelva grupos y podamos usar match.index.
 */
const DOC_PATTERN = /(C\.C\.|C\.E\.|NIT)\s+(?:No\.?\s*)?(\d[\d\s]*)/i;

/** Línea que indica cabecera de tabla o fin de bloque */
const HEADER_OR_SEP = /^\s*\.\s*$|CARGO\s+NOMBRE|IDENTIFICACIÓN/i;

function isContinuationLine(line: string, lineIndex: number, lines: string[]): boolean {
  if (HEADER_OR_SEP.test(line)) return false;
  if (DOC_PATTERN.test(line)) return false;
  if (line.length === 0) return false;
  return true;
}

function parseBlockFirstLine(line: string, docMatch: RegExpMatchArray): { role: string; name: string } {
  const docStr = docMatch[0];
  const idx = line.indexOf(docStr);
  const before = (idx >= 0 ? line.substring(0, idx) : line).trim();
  const parts = before.split(/\s{2,}/).map((p) => p.trim()).filter(Boolean);
  const role = parts.length > 0 ? parts[0] : '';
  const name = parts.length > 1 ? parts.slice(1).join(' ').replace(/\s+/g, ' ').trim() : '';
  return { role, name };
}

function parseContinuationLine(line: string): { role_part: string; name_part: string } {
  const parts = line.split(/\s{2,}/).map((p) => p.trim()).filter(Boolean);
  const role_part = parts.length > 0 ? parts[0] : '';
  const name_part = parts.length > 1 ? parts.slice(1).join(' ').replace(/\s+/g, ' ').trim() : '';
  return { role_part, name_part };
}

/**
 * Parsea el texto de representantes legales del RUES (Colombia).
 * Formato: bloques con cabecera "CARGO NOMBRE IDENTIFICACIÓN", luego líneas con
 * cargo, nombre y "C.C. No. X" o "C.E. No. X"; un mismo representante puede ocupar
 * varias líneas (cargo y nombre se continúan).
 */
export function parseLegalRepresentatives(legal_rep_text: string | undefined): LegalRepresentative[] {
  if (!legal_rep_text || typeof legal_rep_text !== 'string') {
    return [];
  }

  const lines = legal_rep_text
    .split(/\r?\n/)
    .map((line) => line.trim());

  const result: LegalRepresentative[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(DOC_PATTERN);
    if (!match) continue;

    const document_type = match[1].trim();
    const document_number = match[2].replace(/\s/g, '').trim();
    const { role: role_start, name: name_start } = parseBlockFirstLine(line, match);

    let role = role_start;
    let name = name_start;
    let j = i + 1;

    while (j < lines.length && isContinuationLine(lines[j], j, lines)) {
      const { role_part, name_part } = parseContinuationLine(lines[j]);
      if (role_part) role = role ? `${role} ${role_part}` : role_part;
      if (name_part) name = name ? `${name} ${name_part}` : name_part;
      j++;
    }

    result.push(
      new LegalRepresentative(
        name.replace(/\s+/g, ' ').trim(),
        document_type,
        document_number,
        role.replace(/\s+/g, ' ').trim(),
      ),
    );
    i = j - 1;
  }

  return result;
}
