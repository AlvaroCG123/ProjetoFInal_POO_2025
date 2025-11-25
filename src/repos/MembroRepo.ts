import { Membro } from '../models/Membro';
import { ArmazenamentoArquivo } from '../utils/ArmazenamentoArquivo';

export class MembroRepo {
  private path: string;
  private membros: Membro[] = [];

  constructor(path: string) {
    this.path = path;
  }

  async load() {
    const raw = await ArmazenamentoArquivo.load<any[]>(this.path);
    this.membros = raw.map(r => new Membro(
      r._id,
      r._nome ?? r._name,
      r._endereco ?? r._address,
      r._telefone ?? r._phone,
      r._numeroMatricula ?? r._enrollmentNumber
    ));
  }

  async save() {
    await ArmazenamentoArquivo.save(this.path, this.membros.map(m => ({
      _id: m.id,
      _nome: (m as any).nome,
      _endereco: (m as any).endereco,
      _telefone: (m as any).telefone,
      _numeroMatricula: (m as any).numeroMatricula
    })));
  }

  list(): Membro[] { return this.membros; }

  add(membro: Membro) { this.membros.push(membro); }

  update(id: string, fields: Partial<{nome:string;endereco:string;telefone:string;numeroMatricula:string}>) {
    const m = this.membros.find(x => x.id === id);
    if (!m) return false;
    if (fields.nome !== undefined) (m as any).nome = fields.nome;
    if (fields.endereco !== undefined) (m as any).endereco = fields.endereco;
    if (fields.telefone !== undefined) (m as any).telefone = fields.telefone;
    if (fields.numeroMatricula !== undefined) (m as any).numeroMatricula = fields.numeroMatricula;
    return true;
  }

  remove(id: string) {
    const idx = this.membros.findIndex(x => x.id === id);
    if (idx === -1) return false;
    this.membros.splice(idx, 1);
    return true;
  }

  findById(id: string) { return this.membros.find(x => x.id === id); }
}
