# PRD — Dúvidas de Estudo

## 1. Problema

### Qual problema específico você está resolvendo?
Durante sessões de estudo, alunos encontram dúvidas pontuais que não conseguem resolver na hora — seja por falta de tempo, por não querer perder o fio do raciocínio, ou por precisar de uma explicação mais elaborada. O comportamento mais comum é: **anotar no papel, no bloco de notas, ou simplesmente esquecer**.

O problema não é ter dúvidas — é perdê-las.

### Por que esse problema vale a pena ser resolvido?
Dúvidas não resolvidas acumulam lacunas no aprendizado. Estudantes que não têm um sistema para capturar e revisitar suas dúvidas tendem a revisar o conteúdo de forma superficial, sem atacar os pontos onde realmente travam. Um sistema simples de captura e acompanhamento de dúvidas transforma uma experiência passiva em ativa.

### Quem é o usuário?
**Estudantes de cursos técnicos e de graduação** que acompanham videoaulas ou fazem leituras de forma assíncrona — especialmente em bootcamps, faculdades EAD, ou preparatórios. Eles estudam com frequência em sessões curtas e fragmentadas, e precisam de um lugar rápido para registrar o que não entenderam sem sair do fluxo.

---

## 2. Funcionalidades Essenciais

| Funcionalidade | Por que é essencial? |
|---|---|
| Registrar uma dúvida com título, descrição e matéria | Sem isso, o produto não existe. É a ação central. |
| Listar dúvidas pendentes | O usuário precisa enxergar o que ainda não resolveu. |
| Marcar uma dúvida como resolvida | O ciclo de vida de uma dúvida termina aqui. Sem isso, tudo acumula sem sentido. |
| Deletar uma dúvida | Dúvidas criadas por engano ou que perderam relevância precisam poder ser removidas. |

### Funcionalidades que foram descartadas e por quê
- **Edição completa de uma dúvida**: Após registrar, o usuário raramente volta para reescrever. O que muda é o status (pendente → resolvida). Adicionar edição aumentaria complexidade sem resolver o problema central.
- **Categorias customizadas**: Deixaria o sistema mais complexo sem evidência de que o usuário precisa disso. Uma tag de matéria simples já satisfaz a necessidade de filtragem.
- **Notificações / lembretes**: Está fora do escopo de uma interface web estática com json-server.

---

## 3. Decisões Técnicas

### Estrutura da API

A API expõe uma única entidade: `duvidas`.

```json
// GET /duvidas
[
  {
    "id": "1",
    "titulo": "O que é closure em JavaScript?",
    "descricao": "Entendi o conceito mas não sei quando usar na prática.",
    "materia": "JavaScript",
    "resolvida": false,
    "criadaEm": "2025-01-15T14:30:00.000Z"
  }
]
```

### Campos e seus propósitos

| Campo | Tipo | Propósito |
|---|---|---|
| `id` | string | Identificador único gerado pelo json-server |
| `titulo` | string | Resumo curto da dúvida (obrigatório) |
| `descricao` | string | Detalhamento da dúvida (opcional) |
| `materia` | string | Contexto de onde surgiu a dúvida |
| `resolvida` | boolean | Estado principal que muda ao longo do tempo |
| `criadaEm` | ISO string | Para ordenar cronologicamente |

### Operações e justificativas

| Método | Endpoint | Justificativa |
|---|---|---|
| `GET` | `/duvidas` | Buscar todas as dúvidas ao carregar a tela |
| `POST` | `/duvidas` | Criar uma nova dúvida pelo formulário |
| `PATCH` | `/duvidas/:id` | Atualizar apenas o campo `resolvida` (não substitui o objeto todo) |
| `DELETE` | `/duvidas/:id` | Remover uma dúvida da lista |

> **Por PATCH e não PUT?** PUT substituiria o objeto inteiro. Como só queremos mudar `resolvida`, PATCH é semanticamente correto e mais seguro.

### Decisão sobre confirmação antes de deletar
Sim, há confirmação. Uma dúvida deletada sem querer não pode ser recuperada (json-server não tem lixeira). O custo de um clique a mais é menor que o custo de perder um registro. A confirmação é feita via `window.confirm` nesta versão, com possibilidade de evoluir para um modal.
