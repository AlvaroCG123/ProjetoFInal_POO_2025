export class Livro {
  private _id: string;
  private _titulo: string;
  private _autor: string;
  private _codigo: string;
  private _ano: number;
  private _disponivel: boolean;

  constructor(id: string, titulo: string, autor: string, codigo: string, ano: number) {
    this._id = id;
    this._titulo = titulo;
    this._autor = autor;
    this._codigo = codigo;
    this._ano = ano;
    this._disponivel = true;
  }

  get id(): string { return this._id; }
  get titulo(): string { return this._titulo; }
  set titulo(v: string) { this._titulo = v; }

  get autor(): string { return this._autor; }
  set autor(v: string) { this._autor = v; }

  get codigo(): string { return this._codigo; }
  set codigo(v: string) { this._codigo = v; }

  get ano(): number { return this._ano; }
  set ano(v: number) { this._ano = v; }

  get disponivel(): boolean { return this._disponivel; }
  set disponivel(v: boolean) { this._disponivel = v; }

  public toString(): string {
    return `ID: ${this._id} | ${this._titulo} — ${this._autor} | Código: ${this._codigo} | ${this._ano} | Disponível: ${this._disponivel}`;
  }
}
