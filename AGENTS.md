# Diretrizes do Projeto

## Dependências e lockfile
- Este projeto usa `bun` como gerenciador de pacotes.
- SEMPRE que alterar o `package.json` (adicionar, remover ou mudar versão de dependência), rode `bun install` (sem --frozen-lockfile) e commite o arquivo de lockfile atualizado (`bun.lock`) no MESMO commit.
- Nunca faça push de um `package.json` alterado sem o lockfile correspondente.
- Antes de considerar uma tarefa concluída, rode `bun install --frozen-lockfile && bun run build` localmente para simular o ambiente do Cloudflare Pages e confirmar que não há erros.
