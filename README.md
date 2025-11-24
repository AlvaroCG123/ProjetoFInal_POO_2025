# Sistema de Biblioteca (TypeScript)

Projeto de POO em TypeScript para gerenciar livros, membros e empréstimos.

Instalação (PowerShell):

```powershell
npm install
```

Rodar (desenvolvimento):

```powershell
npm run start
```

Testes:

```powershell
npm test
```

Arquivos de dados:
- `data/books.json`
- `data/members.json`
- `data/loans.json`

Estrutura:
- `src/models` - classes `Book`, `Person`, `Member`, `Loan`
- `src/repos` - repositórios com persistência JSON
- `src/utils/FileStorage.ts` - utilitário de leitura/escrita
- `src/index.ts` - interface CLI

Observações:
- Projeto simples e didático, serve como base para expandir e melhorar (validações, UI, testes mais completos, etc.).
