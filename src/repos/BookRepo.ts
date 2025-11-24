import { Book } from '../models/Book';
import { FileStorage } from '../utils/FileStorage';

export class BookRepo {
  private path: string;
  private books: Book[] = [];

  constructor(path: string) {
    this.path = path;
  }

  async load() {
    const raw = await FileStorage.load<any[]>(this.path);
    this.books = raw.map(r => new Book(r._id, r._title, r._author, r._isbn, r._year));
    // restore availability if provided
    this.books.forEach((b, i) => { if (raw[i]._available === false) b.available = false; });
  }

  async save() {
    await FileStorage.save(this.path, this.books.map(b => ({
      _id: b.id,
      _title: b.title,
      _author: b.author,
      _isbn: b.isbn,
      _year: b.year,
      _available: b.available
    })));
  }

  list(): Book[] { return this.books; }

  add(book: Book) {
    this.books.push(book);
  }

  update(id: string, fields: Partial<{title:string;author:string;isbn:string;year:number;available:boolean}>) {
    const b = this.books.find(x => x.id === id);
    if (!b) return false;
    if (fields.title !== undefined) b.title = fields.title;
    if (fields.author !== undefined) b.author = fields.author;
    if (fields.isbn !== undefined) b.isbn = fields.isbn;
    if (fields.year !== undefined) b.year = fields.year;
    if (fields.available !== undefined) b.available = fields.available;
    return true;
  }

  remove(id: string) {
    const idx = this.books.findIndex(x => x.id === id);
    if (idx === -1) return false;
    this.books.splice(idx, 1);
    return true;
  }

  findById(id: string) { return this.books.find(x => x.id === id); }
}
