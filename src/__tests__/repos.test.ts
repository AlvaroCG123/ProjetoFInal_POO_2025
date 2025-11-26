import { Livro } from '../models/Livro';
import { LivroRepo } from '../repos/LivroRepo';
import * as fs from 'fs';

const testFilePath = './test_books.json';

describe('LivroRepo', () => {
  let repo: LivroRepo;

  beforeEach(() => {
    repo = new LivroRepo(testFilePath);
    (repo as any).livros = []; 
  });

  afterAll(() => {
    if (fs.existsSync(testFilePath)) fs.unlinkSync(testFilePath);
  });

  test('Deve adicionar um livro corretamente', () => {
    const livro = new Livro('1', 'Test Book', 'Tester', '001', 2023);
    repo.add(livro);
    expect(repo.list()).toHaveLength(1);
    expect(repo.findById('1')).toEqual(livro);
  });

  test('Deve remover um livro corretamente', () => {
    const livro = new Livro('1', 'Test Book', 'Tester', '001', 2023);
    repo.add(livro);
    const removed = repo.remove('1');
    expect(removed).toBe(true);
    expect(repo.list()).toHaveLength(0);
  });
});