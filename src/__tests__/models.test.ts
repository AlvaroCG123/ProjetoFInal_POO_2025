import { Book } from '../models/Book';
import { Member } from '../models/Member';
import { Loan } from '../models/Loan';

describe('Models basic behavior', () => {
  test('Book getters/setters and toString', () => {
    const b = new Book('b1', 'Título', 'Autor', '123', 2020);
    expect(b.id).toBe('b1');
    expect(b.title).toBe('Título');
    b.title = 'Novo';
    expect(b.title).toBe('Novo');
    expect(b.toString()).toContain('Novo');
  });

  test('Member inheritance and getInfo', () => {
    const m = new Member('m1', 'João', 'Rua A', '9999', '2023');
    expect(m.id).toBe('m1');
    expect(m.getInfo()).toContain('Membro');
    expect((m as any).enrollmentNumber).toBe('2023');
  });

  test('Loan registerReturn changes status', () => {
    const loan = new Loan('l1', 'b1', 'm1', new Date().toISOString(), new Date().toISOString());
    expect(loan.status).toBe('active');
    loan.registerReturn(new Date().toISOString());
    expect(loan.status).toBe('returned');
  });
});
