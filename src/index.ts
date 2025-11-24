import * as readline from 'readline-sync';
import { Book } from './models/Book';
import { Member } from './models/Member';
import { Loan } from './models/Loan';
import { BookRepo } from './repos/BookRepo';
import { MemberRepo } from './repos/MemberRepo';
import { LoanRepo } from './repos/LoanRepo';

const dataDir = './data';
const bookRepo = new BookRepo(`${dataDir}/books.json`);
const memberRepo = new MemberRepo(`${dataDir}/members.json`);
const loanRepo = new LoanRepo(`${dataDir}/loans.json`);

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
      const title = readline.question('Título: ');
      const author = readline.question('Autor: ');
      const isbn = readline.question('ISBN: ');
      const year = parseInt(readline.question('Ano: '), 10) || 0;
      const book = new Book(nextId('b-'), title, author, isbn, year);
      bookRepo.add(book);
      await bookRepo.save();
      console.log('Livro adicionado.');
      pause();
    } else if (opt === '2') {
      console.log('\nLivros cadastrados:');
      bookRepo.list().forEach(b => console.log(b.toString()));
      pause();
    } else if (opt === '3') {
      const id = readline.question('ID do livro: ');
      const b = bookRepo.findById(id);
      if (!b) { console.log('Livro não encontrado.'); pause(); continue; }
      const title = readline.question(`Título (${b.title}): `) || b.title;
      const author = readline.question(`Autor (${b.author}): `) || b.author;
      const isbn = readline.question(`ISBN (${b.isbn}): `) || b.isbn;
      const year = parseInt(readline.question(`Ano (${b.year}): `) || `${b.year}`, 10) || b.year;
      bookRepo.update(id, { title, author, isbn, year });
      await bookRepo.save();
      console.log('Atualizado.'); pause();
    } else if (opt === '4') {
      const id = readline.question('ID do livro: ');
      if (bookRepo.remove(id)) { await bookRepo.save(); console.log('Removido.'); } else console.log('ID não encontrado.');
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
      const name = readline.question('Nome: ');
      const address = readline.question('Endereço: ');
      const phone = readline.question('Telefone: ');
      const enrollment = readline.question('Número de matrícula: ');
      const member = new Member(nextId('m-'), name, address, phone, enrollment);
      memberRepo.add(member);
      await memberRepo.save();
      console.log('Membro adicionado.'); pause();
    } else if (opt === '2') {
      console.log('\nMembros cadastrados:');
      memberRepo.list().forEach(m => console.log(m.getInfo())); pause();
    } else if (opt === '3') {
      const id = readline.question('ID do membro: ');
      const m = memberRepo.findById(id);
      if (!m) { console.log('Membro não encontrado.'); pause(); continue; }
      const name = readline.question(`Nome (${m.name}): `) || m.name;
      const address = readline.question(`Endereço (${m.address}): `) || m.address;
      const phone = readline.question(`Telefone (${m.phone}): `) || m.phone;
      const enrollment = readline.question(`Matrícula (${(m as any).enrollmentNumber}): `) || (m as any).enrollmentNumber;
      memberRepo.update(id, { name, address, phone, enrollmentNumber: enrollment });
      await memberRepo.save();
      console.log('Atualizado.'); pause();
    } else if (opt === '4') {
      const id = readline.question('ID do membro: ');
      if (memberRepo.remove(id)) { await memberRepo.save(); console.log('Removido.'); } else console.log('ID não encontrado.');
      pause();
    } else break;
  }
}

async function manageLoans() {
  while (true) {
    console.log('\n== Empréstimos ==');
    console.log('1) Realizar empréstimo');
    console.log('2) Listar empréstimos ativos');
    console.log('3) Registrar devolução');
    console.log('4) Histórico de empréstimos');
    console.log('0) Voltar');
    const opt = readline.question('Escolha: ');
    if (opt === '1') {
      const bookId = readline.question('ID do livro: ');
      const book = bookRepo.findById(bookId);
      if (!book) { console.log('Livro não encontrado.'); pause(); continue; }
      if (!book.available) { console.log('Livro não disponível.'); pause(); continue; }
      const memberId = readline.question('ID do membro: ');
      const member = memberRepo.findById(memberId);
      if (!member) { console.log('Membro não encontrado.'); pause(); continue; }
      const loanDate = new Date().toISOString();
      const due = new Date(); due.setDate(due.getDate() + 14);
      const dueDate = due.toISOString();
      const loan = new Loan(nextId('l-'), bookId, memberId, loanDate, dueDate);
      loanRepo.add(loan);
      book.available = false;
      await loanRepo.save();
      await bookRepo.save();
      console.log('Empréstimo registrado.'); pause();
    } else if (opt === '2') {
      console.log('\nEmpréstimos ativos:');
      loanRepo.listActive().forEach(l => console.log(l.toString())); pause();
    } else if (opt === '3') {
      const id = readline.question('ID do empréstimo: ');
      const l = loanRepo.findById(id);
      if (!l) { console.log('Empréstimo não encontrado.'); pause(); continue; }
      if (l.status === 'returned') { console.log('Já devolvido.'); pause(); continue; }
      const returnDate = new Date().toISOString();
      l.registerReturn(returnDate);
      const book = bookRepo.findById(l.bookId);
      if (book) book.available = true;
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
    console.log('3) Empréstimos');
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
