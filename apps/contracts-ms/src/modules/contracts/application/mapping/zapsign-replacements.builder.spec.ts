import { build_zapsign_replacements } from './zapsign-replacements.builder';

describe('build_zapsign_replacements', () => {
  it('retorna vacío sin datos', () => {
    expect(build_zapsign_replacements(undefined, undefined)).toEqual([]);
  });

  it('combina template_data y replacements explícitos (explícito gana)', () => {
    const r = build_zapsign_replacements(
      { nombre: 'Ana' },
      [{ from: 'nombre', to: 'Override' }],
    );
    const map = new Map(r.map((x) => [x.from, x.to]));
    expect(map.get('nombre')).toBe('Override');
  });

  it('genera variantes de clave para template_data', () => {
    const r = build_zapsign_replacements({ NombreCliente: 'X' }, undefined);
    expect(r.length).toBeGreaterThan(0);
    expect(r.some((x) => x.to === 'X')).toBe(true);
  });
});
