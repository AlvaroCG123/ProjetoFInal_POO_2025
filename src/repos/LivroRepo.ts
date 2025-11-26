import { Livro } from '../models/Livro';
import { ArmazenamentoArquivo } from '../utils/ArmazenamentoArquivo';

export class LivroRepo {
  private path: string;
  private livros: Livro[] = [];

  constructor(path: string) {
    this.path = path;
  }

  async load() {
    const raw = await ArmazenamentoArquivo.load<any[]>(this.path);
    this.livros = raw.map(r => new Livro(
      r._id,
      r._titulo ?? r._title,
      r._autor ?? r._author,
      r._codigo,
      r._ano ?? r._year
    ));
    this.livros.forEach((l, i) => {
      const item = raw[i];
      if (item && (item._disponivel === false || item._available === false)) (l as any).disponivel = false;
    });
  }

  async save() {
    await ArmazenamentoArquivo.save(this.path, this.livros.map(l => ({
      _id: l.id,
      _titulo: (l as any).titulo,
      _autor: (l as any).autor,
      _codigo: (l as any).codigo,
      _ano: (l as any).ano,
      _disponivel: (l as any).disponivel
    })));
  }

  list(): Livro[] { return this.livros; }

  add(livro: Livro) { this.livros.push(livro); }

  update(id: string, fields: Partial<{titulo:string;autor:string;codigo:string;ano:number;disponivel:boolean}>) {
    const l = this.livros.find(x => x.id === id);
    if (!l) return false;
    if (fields.titulo !== undefined) l.titulo = fields.titulo;
    if (fields.autor !== undefined) l.autor = fields.autor;
    if (fields.codigo !== undefined) l.codigo = fields.codigo;
    if (fields.ano !== undefined) l.ano = fields.ano;
    if (fields.disponivel !== undefined) l.disponivel = fields.disponivel;
    return true;
  }

  remove(id: string) {
    const idx = this.livros.findIndex(x => x.id === id);
    if (idx === -1) return false;
    this.livros.splice(idx, 1);
    return true;
  }

  findById(id: string) { return this.livros.find(x => x.id === id); }
}
