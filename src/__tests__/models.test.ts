import { Livro } from '../models/Livro';
import { Membro } from '../models/Membro';
import { Emprestimo } from '../models/Emprestimo';

describe('Models basic behavior', () => {
  test('Livro getters/setters and toString', () => {
    const b = new Livro('b1', 'Título', 'Autor', '123', 2020);
    expect(b.id).toBe('b1');
    expect((b as any).titulo).toBe('Título');
    (b as any).titulo = 'Novo';
    expect((b as any).titulo).toBe('Novo');
    expect(b.toString()).toContain('Novo');
  });

  test('Membro inheritance and getInfo', () => {
    const m = new Membro('m1', 'João', 'Rua A', '9999', '2023');
    expect(m.id).toBe('m1');
    expect(m.getInfo()).toContain('Membro');
    expect((m as any).numeroMatricula).toBe('2023');
  });

  test('Emprestimo registrarDevolucao changes status', () => {
    const loan = new Emprestimo('l1', 'b1', 'm1', new Date().toISOString(), new Date().toISOString());
    expect((loan as any).status).toBe('ativo');
    (loan as any).registrarDevolucao(new Date().toISOString());
    expect((loan as any).status).toBe('devolvido');
  });
});
