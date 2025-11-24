import { Person } from './Person';

export class Member extends Person {
  private _enrollmentNumber: string;

  constructor(id: string, name: string, address: string, phone: string, enrollmentNumber: string) {
    super(id, name, address, phone);
    this._enrollmentNumber = enrollmentNumber;
  }

  get enrollmentNumber(): string {
    return this._enrollmentNumber;
  }
  set enrollmentNumber(v: string) {
    this._enrollmentNumber = v;
  }

  // Polimorfismo: sobrescreve getInfo
  public getInfo(): string {
    return `Membro -> ${super.getInfo()} | Matrícula: ${this._enrollmentNumber}`;
  }
}
