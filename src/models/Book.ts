export class Book {
  private _id: string;
  private _title: string;
  private _author: string;
  private _isbn: string;
  private _year: number;
  private _available: boolean;

  constructor(id: string, title: string, author: string, isbn: string, year: number) {
    this._id = id;
    this._title = title;
    this._author = author;
    this._isbn = isbn;
    this._year = year;
    this._available = true;
  }

  get id(): string {
    return this._id;
  }
  get title(): string {
    return this._title;
  }
  set title(v: string) {
    this._title = v;
  }

  get author(): string {
    return this._author;
  }
  set author(v: string) {
    this._author = v;
  }

  get isbn(): string {
    return this._isbn;
  }
  set isbn(v: string) {
    this._isbn = v;
  }

  get year(): number {
    return this._year;
  }
  set year(v: number) {
    this._year = v;
  }

  get available(): boolean {
    return this._available;
  }
  set available(v: boolean) {
    this._available = v;
  }

  public toString(): string {
    return `ID: ${this._id} | ${this._title} — ${this._author} | ISBN: ${this._isbn} | ${this._year} | Disponível: ${this._available}`;
  }
}
