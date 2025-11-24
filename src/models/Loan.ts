export type LoanStatus = 'active' | 'returned';

export class Loan {
  private _id: string;
  private _bookId: string;
  private _memberId: string;
  private _loanDate: string; // ISO
  private _dueDate: string; // ISO
  private _returnDate?: string; // ISO
  private _status: LoanStatus;

  constructor(id: string, bookId: string, memberId: string, loanDate: string, dueDate: string) {
    this._id = id;
    this._bookId = bookId;
    this._memberId = memberId;
    this._loanDate = loanDate;
    this._dueDate = dueDate;
    this._status = 'active';
  }

  get id() { return this._id; }
  get bookId() { return this._bookId; }
  get memberId() { return this._memberId; }
  get loanDate() { return this._loanDate; }
  get dueDate() { return this._dueDate; }
  get returnDate() { return this._returnDate; }
  get status() { return this._status; }

  public registerReturn(returnDate: string) {
    this._returnDate = returnDate;
    this._status = 'returned';
  }

  public toString(): string {
    return `ID: ${this._id} | Livro: ${this._bookId} | Membro: ${this._memberId} | Empréstimo: ${this._loanDate} | Devolução: ${this._returnDate ?? '-'} | Status: ${this._status}`;
  }
}
