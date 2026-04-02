# dúvidas.log

Registre suas dúvidas de estudo durante as aulas. Não perca o fio do raciocínio — capture agora, resolva depois.

## O problema

Estudantes encontram dúvidas pontuais durante videoaulas e leituras, mas não têm um lugar adequado para capturá-las. O papel rasga, o bloco de notas desaparece, e o Discord mistura tudo. As dúvidas somem e as lacunas ficam.

## Tecnologias

- React 18 + Vite
- TypeScript (tipagem completa, sem `any`)
- Tailwind CSS v3
- json-server (API REST local)
- Hooks: `useState`, `useEffect`, `useCallback`, `useMemo`
- Custom Hook: `useDuvidas`

## Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/duvidas-de-estudo
cd duvidas-de-estudo
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Suba a API (json-server)

```bash
npm run api
```

A API estará disponível em `http://localhost:3000/duvidas`

### 4. Rode o front-end (em outro terminal)

```bash
npm run dev
```

Acesse `http://localhost:5173`

## Variáveis de ambiente

Crie um `.env` na raiz para apontar para sua API (útil no deploy):

```env
VITE_API_URL=http://localhost:3000
```

Em produção, substitua pelo URL do seu json-server deployado (ex: Railway, Render).

## Deploy

- **Front-end**: [Vercel](https://vercel.com) — conecte o repositório e defina `VITE_API_URL` nas environment variables
- **Back-end (json-server)**: [Railway](https://railway.app) ou [Render](https://render.com) — suba o `db.json` com `json-server`

🔗 Demo: _link do deploy aqui_

## Estrutura do projeto

```
src/
├── types/
│   └── duvida.ts          # interfaces e tipos TypeScript
├── services/
│   └── duvidasService.ts  # chamadas à API isoladas
├── hooks/
│   └── useDuvidas.ts      # custom hook com toda a lógica de estado
└── components/
    ├── DuvidasList.tsx     # renderização condicional (loading/erro/vazio/lista)
    ├── DuvidasCard.tsx     # card individual com toggle e delete
    ├── DuvidasForm.tsx     # formulário tipado com validação
    └── FiltroMateria.tsx   # filtro por matéria com useMemo
```

## Decisões de produto

- **Confirmação antes de deletar**: sim, via `window.confirm`. Dúvida deletada não tem recuperação — um clique a mais é mais barato que perder um registro.
- **PATCH e não PUT no toggle**: só o campo `resolvida` muda, substituir o objeto todo seria semanticamente incorreto.
- **Edição completa não foi implementada**: o ciclo de vida de uma dúvida é capturar → resolver → deletar. Edição não resolve o problema central e adicionaria complexidade sem ganho real.
