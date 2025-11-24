import { Loan } from '../models/Loan';
import { FileStorage } from '../utils/FileStorage';

export class LoanRepo {
  private path: string;
  private loans: Loan[] = [];

  constructor(path: string) {
    this.path = path;
  }

  async load() {
    const raw = await FileStorage.load<any[]>(this.path);
    this.loans = raw.map(r => {
      const loan = new Loan(r._id, r._bookId, r._memberId, r._loanDate, r._dueDate);
      if (r._status === 'returned') loan.registerReturn(r._returnDate);
      return loan;
    });
  }

  async save() {
    await FileStorage.save(this.path, this.loans.map(l => ({
      _id: l.id,
      _bookId: l.bookId,
      _memberId: l.memberId,
      _loanDate: l.loanDate,
      _dueDate: l.dueDate,
      _returnDate: l.returnDate,
      _status: l.status
    })));
  }

  list(): Loan[] { return this.loans; }

  add(loan: Loan) { this.loans.push(loan); }

  findById(id: string) { return this.loans.find(x => x.id === id); }

  listActive() { return this.loans.filter(l => l.status === 'active'); }
}
