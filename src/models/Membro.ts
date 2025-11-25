import { Pessoa } from './Pessoa';

export class Membro extends Pessoa {
  private _numeroMatricula: string;

  constructor(id: string, nome: string, endereco: string, telefone: string, numeroMatricula: string) {
    super(id, nome, endereco, telefone);
    this._numeroMatricula = numeroMatricula;
  }

  get numeroMatricula(): string {
    return this._numeroMatricula;
  }
  set numeroMatricula(v: string) {
    this._numeroMatricula = v;
  }

  public getInfo(): string {
    return `Membro -> ${super.getInfo()} | Matrícula: ${this._numeroMatricula}`;
  }
}
