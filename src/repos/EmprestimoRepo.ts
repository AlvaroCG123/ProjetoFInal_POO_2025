import { Emprestimo } from '../models/Emprestimo';
import { ArmazenamentoArquivo } from '../utils/ArmazenamentoArquivo';

export class EmprestimoRepo {
  private path: string;
  private emprestimos: Emprestimo[] = [];

  constructor(path: string) {
    this.path = path;
  }

  async load() {
    const raw = await ArmazenamentoArquivo.load<any[]>(this.path);
    this.emprestimos = raw.map(r => {
      const e = new Emprestimo(
        r._id,
        r._livroId ?? r._bookId,
        r._membroId ?? r._memberId,
        r._dataEmprestimo ?? r._loanDate,
        r._dataDevolucao ?? r._dueDate
      );
      const status = r._status ?? r._status;
      if (r._status === 'returned' || r._status === 'devolvido') (e as any).registrarDevolucao(r._returnDate ?? r._dataRetorno);
      if (r._dataRetorno || r._returnDate) (e as any).registrarDevolucao(r._dataRetorno ?? r._returnDate);
      return e;
    });
  }

  async save() {
    await ArmazenamentoArquivo.save(this.path, this.emprestimos.map(e => ({
      _id: e.id,
      _livroId: (e as any).livroId ?? undefined,
      _membroId: (e as any).membroId ?? undefined,
      _dataEmprestimo: (e as any).dataEmprestimo ?? undefined,
      _dataDevolucao: (e as any).dataDevolucao ?? undefined,
      _dataRetorno: (e as any).dataRetorno ?? undefined,
      _status: (e as any).status
    })));
  }

  list(): Emprestimo[] { return this.emprestimos; }

  add(emprestimo: Emprestimo) { this.emprestimos.push(emprestimo); }

  findById(id: string) { return this.emprestimos.find(x => x.id === id); }

  listActive() { return this.emprestimos.filter(l => l.status === 'ativo'); }
}
