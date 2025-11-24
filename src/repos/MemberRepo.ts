import { Member } from '../models/Member';
import { FileStorage } from '../utils/FileStorage';

export class MemberRepo {
  private path: string;
  private members: Member[] = [];

  constructor(path: string) {
    this.path = path;
  }

  async load() {
    const raw = await FileStorage.load<any[]>(this.path);
    this.members = raw.map(r => new Member(r._id, r._name, r._address, r._phone, r._enrollmentNumber));
  }

  async save() {
    await FileStorage.save(this.path, this.members.map(m => ({
      _id: m.id,
      _name: m.name,
      _address: m.address,
      _phone: m.phone,
      _enrollmentNumber: (m as any).enrollmentNumber
    })));
  }

  list(): Member[] { return this.members; }

  add(member: Member) { this.members.push(member); }

  update(id: string, fields: Partial<{name:string;address:string;phone:string;enrollmentNumber:string}>) {
    const m = this.members.find(x => x.id === id);
    if (!m) return false;
    if (fields.name !== undefined) m.name = fields.name;
    if (fields.address !== undefined) m.address = fields.address;
    if (fields.phone !== undefined) m.phone = fields.phone;
    if (fields.enrollmentNumber !== undefined) (m as any).enrollmentNumber = fields.enrollmentNumber;
    return true;
  }

  remove(id: string) {
    const idx = this.members.findIndex(x => x.id === id);
    if (idx === -1) return false;
    this.members.splice(idx, 1);
    return true;
  }

  findById(id: string) { return this.members.find(x => x.id === id); }
}
