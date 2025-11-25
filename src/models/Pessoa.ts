export class Pessoa {
  protected _id: string;
  protected _nome: string;
  protected _endereco: string;
  protected _telefone: string;

  constructor(id: string, nome: string, endereco: string, telefone: string) {
    this._id = id;
    this._nome = nome;
    this._endereco = endereco;
    this._telefone = telefone;
  }

  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }
  set nome(v: string) {
    this._nome = v;
  }

  get endereco(): string {
    return this._endereco;
  }
  set endereco(v: string) {
    this._endereco = v;
  }

  get telefone(): string {
    return this._telefone;
  }
  set telefone(v: string) {
    this._telefone = v;
  }

  public getInfo(): string {
    return `ID: ${this._id} | ${this._nome} | ${this._endereco} | ${this._telefone}`;
  }
}
