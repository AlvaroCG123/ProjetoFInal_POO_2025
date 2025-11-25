export type StatusEmprestimo = 'ativo' | 'devolvido';

export class Emprestimo {
  private _id: string;
  private _livroId: string;
  private _membroId: string;
  private _dataEmprestimo: string;
  private _dataDevolucao: string; 
  private _dataRetorno?: string; 
  private _status: StatusEmprestimo;

  constructor(id: string, livroId: string, membroId: string, dataEmprestimo: string, dataDevolucao: string) {
    this._id = id;
    this._livroId = livroId;
    this._membroId = membroId;
    this._dataEmprestimo = dataEmprestimo;
    this._dataDevolucao = dataDevolucao;
    this._status = 'ativo';
  }

  get id() { return this._id; }
  get livroId() { return this._livroId; }
  get membroId() { return this._membroId; }
  get dataEmprestimo() { return this._dataEmprestimo; }
  get dataDevolucao() { return this._dataDevolucao; }
  get dataRetorno() { return this._dataRetorno; }
  get status() { return this._status; }

  public registrarDevolucao(dataRetorno: string) {
    this._dataRetorno = dataRetorno;
    this._status = 'devolvido';
  }

  public toString(): string {
    return `ID: ${this._id} | Livro: ${this._livroId} | Membro: ${this._membroId} | Empréstimo: ${this._dataEmprestimo} | Devolução: ${this._dataRetorno ?? '-'} | Status: ${this._status}`;
  }
}
