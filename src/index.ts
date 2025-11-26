import * as readline from 'readline-sync';
import { Livro } from './models/Livro';
import { Membro } from './models/Membro';
import { Emprestimo } from './models/Emprestimo';
import { LivroRepo } from './repos/LivroRepo';
import { MembroRepo } from './repos/MembroRepo';
import { EmprestimoRepo } from './repos/EmprestimoRepo';

const dataDir = './data';
const bookRepo = new LivroRepo(`${dataDir}/livros.json`);
const memberRepo = new MembroRepo(`${dataDir}/membros.json`);
const loanRepo = new EmprestimoRepo(`${dataDir}/emprestimos.json`);

function nextId(prefix = ''): string {
  return prefix + Date.now().toString(36) + Math.floor(Math.random() * 1000).toString(36);
}

async function loadAll() {
  await bookRepo.load();
  await memberRepo.load();
  await loanRepo.load();
}

async function saveAll() {
  await bookRepo.save();
  await memberRepo.save();
  await loanRepo.save();
}

function pause() { console.log('Pressione Enter para continuar...'); readline.question(''); }

async function manageBooks() {
  while (true) {
    console.log('\n== Cadastro de Livros ==');
    console.log('1) Adicionar livro');
    console.log('2) Listar livros');
    console.log('3) Atualizar livro');
    console.log('4) Remover livro');
    console.log('0) Voltar');
    const opt = readline.question('Escolha: ');
    if (opt === '1') {
      const titulo = readline.question('Titulo: ');
      const autor = readline.question('Autor: ');
      const codigo = readline.question('Codigo: ');
      const ano = parseInt(readline.question('Ano: '), 10) || 0;
      const livro = new Livro(nextId('b-'), titulo, autor, codigo, ano);
      bookRepo.add(livro);
      await bookRepo.save();
      console.log('Livro adicionado.');
      pause();
    } else if (opt === '2') {
      console.log('\nLivros cadastrados:');
      bookRepo.list().forEach(l => console.log(l.toString()));
      pause();
    } else if (opt === '3') {
      const id = readline.question('ID do livro: ');
      const l = bookRepo.findById(id);
      if (!l) { console.log('Livro nao encontrado.'); pause(); continue; }
      const titulo = readline.question(`Titulo (${(l as any).titulo}): `) || (l as any).titulo;
      const autor = readline.question(`Autor (${(l as any).autor}): `) || (l as any).autor;
      const codigo = readline.question(`Codigo (${(l as any).codigo}): `) || (l as any).codigo;
      const ano = parseInt(readline.question(`Ano (${(l as any).ano}): `) || `${(l as any).ano}`, 10) || (l as any).ano;
      bookRepo.update(id, { titulo, autor, codigo, ano });
      await bookRepo.save();
      console.log('Atualizado.'); pause();
    } else if (opt === '4') {
      const id = readline.question('ID do livro: ');
      if (bookRepo.remove(id)) { await bookRepo.save(); console.log('Removido.'); } else console.log('ID nao encontrado.');
      pause();
    } else break;
  }
}

async function manageMembers() {
  while (true) {
    console.log('\n== Cadastro de Membros ==');
    console.log('1) Adicionar membro');
    console.log('2) Listar membros');
    console.log('3) Atualizar membro');
    console.log('4) Remover membro');
    console.log('0) Voltar');
    const opt = readline.question('Escolha: ');
    if (opt === '1') {
      const nome = readline.question('Nome: ');
      const endereco = readline.question('Endereco: ');
      const telefone = readline.question('Telefone: ');
      const matricula = readline.question('Numero de matricula: ');
      const membro = new Membro(nextId('m-'), nome, endereco, telefone, matricula);
      memberRepo.add(membro);
      await memberRepo.save();
      console.log('Membro adicionado.'); pause();
    } else if (opt === '2') {
      console.log('\nMembros cadastrados:');
      memberRepo.list().forEach(m => console.log(m.getInfo())); pause();
    } else if (opt === '3') {
      const id = readline.question('ID do membro: ');
      const m = memberRepo.findById(id);
      if (!m) { console.log('Membro não encontrado.'); pause(); continue; }
      const nome = readline.question(`Nome (${(m as any).nome}): `) || (m as any).nome;
      const endereco = readline.question(`Endereço (${(m as any).endereco}): `) || (m as any).endereco;
      const telefone = readline.question(`Telefone (${(m as any).telefone}): `) || (m as any).telefone;
      const matricula = readline.question(`Matrícula (${(m as any).numeroMatricula}): `) || (m as any).numeroMatricula;
      memberRepo.update(id, { nome, endereco, telefone, numeroMatricula: matricula });
      await memberRepo.save();
      console.log('Atualizado.'); pause();
    } else if (opt === '4') {
      const id = readline.question('ID do membro: ');
      if (memberRepo.remove(id)) { await memberRepo.save(); console.log('Removido.'); } else console.log('ID nao encontrado.');
      pause();
    } else break;
  }
}

async function manageLoans() {
  while (true) {
    console.log('\n== Emprestimos ==');
    console.log('1) Realizar emprestimo');
    console.log('2) Listar emprestimos ativos');
    console.log('3) Registrar devolucao');
    console.log('4) Historico de emprestimos');
    console.log('0) Voltar');
    const opt = readline.question('Escolha: ');
    if (opt === '1') {
      const livroId = readline.question('ID do livro: ');
      const livro = bookRepo.findById(livroId);
      if (!livro) { console.log('Livro nao encontrado.'); pause(); continue; }
      if (!(livro as any).disponivel) { console.log('Livro nao disponivel.'); pause(); continue; }
      const membroId = readline.question('ID do membro: ');
      const membro = memberRepo.findById(membroId);
      if (!membro) { console.log('Membro nao encontrado.'); pause(); continue; }
      const dataEmprestimo = new Date().toISOString();
      const due = new Date(); due.setDate(due.getDate() + 14);
      const dataDevolucao = due.toISOString();
      const emprestimo = new Emprestimo(nextId('l-'), livroId, membroId, dataEmprestimo, dataDevolucao);
      loanRepo.add(emprestimo);
      (livro as any).disponivel = false;
      await loanRepo.save();
      await bookRepo.save();
      console.log('Emprestimo registrado.'); pause();
    } else if (opt === '2') {
      console.log('\nEmprestimos ativos:');
      loanRepo.listActive().forEach(l => console.log(l.toString())); pause();
    } else if (opt === '3') {
      const id = readline.question('ID do emprestimo: ');
      const e = loanRepo.findById(id);
      if (!e) { console.log('Emprestimo não encontrado.'); pause(); continue; }
      if ((e as any).status === 'devolvido' || (e as any).status === 'returned') { console.log('Ja devolvido.'); pause(); continue; }
      const dataRetorno = new Date().toISOString();
      (e as any).registrarDevolucao(dataRetorno);
      const livro = bookRepo.findById((e as any).livroId);
      if (livro) (livro as any).disponivel = true;
      await loanRepo.save();
      await bookRepo.save();
      console.log('Devolução registrada.'); pause();
    } else if (opt === '4') {
      console.log('\nHistórico de empréstimos:');
      loanRepo.list().forEach(l => console.log(l.toString())); pause();
    } else break;
  }
}

async function main() {
  console.log('Sistema de Biblioteca - POO (TypeScript)');
  await loadAll();
  while (true) {
    console.log('\n=== Menu Principal ===');
    console.log('1) Cadastro de Livros');
    console.log('2) Cadastro de Membros');
    console.log('3) Emprestimos');
    console.log('0) Sair');
    const opt = readline.question('Escolha: ');
    if (opt === '1') await manageBooks();
    else if (opt === '2') await manageMembers();
    else if (opt === '3') await manageLoans();
    else if (opt === '0') { await saveAll(); break; }
  }
  console.log('Encerrando...');
}

main().catch(err => console.error('Erro:', err));
