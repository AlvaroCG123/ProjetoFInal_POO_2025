import { promises as fs } from 'fs';

export class ArmazenamentoArquivo {
  static async load<T>(path: string): Promise<T> {
    try {
      const content = await fs.readFile(path, 'utf-8');
      return JSON.parse(content) as T;
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        await fs.writeFile(path, JSON.stringify([], null, 2));
        return [] as unknown as T;
      }
      throw err;
    }
  }

  static async save<T>(path: string, data: T): Promise<void> {
    await fs.mkdir(require('path').dirname(path), { recursive: true });
    await fs.writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
  }
}
