# RELATÓRIO DE PROJETO - TO DO LIST GERÊNCIA DE CONFIGURAÇÃO

## Identificação

**Integrantes da equipe**:
- João Lucas
- João Gabriel
- Ocimar Schroeder

---

## 1. Estrutura Inicial

- **Branch principal ('main') criada e configurada?** Sim.
- **Branch 'develop' criada a partir de 'main'?** Sim.

A configuração inicial do repositório foi realizada pelo líder da equipe, João Lucas. O objetivo era estabelecer uma base de trabalho limpa, seguindo a estrutura fundamental do Git Flow. Primeiro, o repositório foi criado de forma vazia no GitHub e clonado localmente. Em seguida, o projeto Node.js foi iniciado, e a estrutura de código inicial foi comitada na branch `main`. A partir deste ponto, a branch `develop` foi criada para servir como a linha principal de desenvolvimento, isolando o código em produção (`main`) do código em andamento (`develop`).

**Comandos utilizados:**
```bash
# Clone do repositório e inicialização do projeto
git clone <URL_DO_REPOSITORIO>
cd <nome_do_repositorio>
npm init -y
npm install express

# Primeiro commit na main
git add .
git commit -m "chore: initial project structure"

# Criação e push da branch develop
git branch develop
git push -u origin main
git push origin develop
```

## 2. Fase 1 - Git Flow

### 2.1 Features

Nesta fase, cada integrante ficou responsável por desenvolver features em branches separadas, partindo sempre da `develop`. As seguintes features foram criadas:

- **`feature/list-tasks`** (por João Gabriel): Adicionou um endpoint `GET /tasks` para listar todas as tarefas.

- **`feature/create-task`** (por Ocimar): Adicionou um endpoint `POST /tasks` para criar uma nova tarefa.

- **`feature/delete-task-jg`** (por João Gabriel): Adicionou um endpoint `DELETE /tasks/:id` para remover uma tarefa.

- **`feature/delete-task-ocimar`** (por Ocimar): Adicionou uma implementação alternativa para o mesmo endpoint, com o objetivo de gerar um conflito intencional.

- **`feature/update-task-jl`** (por João Lucas): Adicionou um endpoint `PATCH /tasks/:id` para atualizar o status de uma tarefa.

*(Ver Print 2 na seção de Evidências)*

## 2.2 Conflitos

O conflito ocorreu de forma intencional no arquivo `index.js`, quando tentamos integrar a branch `feature/delete-task-ocimar` na `develop`. Isso aconteceu porque a branch `develop` já havia recebido a feature `feature/delete-task-jg`, que implementava a mesma funcionalidade (`DELETE /tasks/:id`) no mesmo local do arquivo.

Para resolver o conflito, o integrante Ocimar seguiu o processo padrão do Git:

- O Git indicou o conflito no terminal após o comando `git merge` *(Ver Print 3)*
- O arquivo `index.js` foi aberto, e os marcadores de conflito (`<<<<<<< HEAD`, `=======`, `>>>>>>>`) estavam visíveis *(Ver Print 4)*
- A equipe decidiu manter a versão que já estava na `develop` (HEAD). O código da branch conflitante foi descartado
- Após a edição manual do arquivo *(Ver Print 5)*, o comando `git add index.js` foi usado para marcar o conflito como resolvido
- Finalmente, um novo commit de merge foi criado com a mensagem "fix: resolve merge conflict in delete task endpoint" para documentar a resolução

## 2.3 Release

- **Criada branch `release/2.0`?** Sim
- **Alterações preparatórias?** Sim, o número da versão foi adicionado em um comentário no topo do arquivo `index.js`
- **Integração com 'main' e geração da tag 'v2.0'?** Sim, a branch `release/2.0` foi integrada na `main` e, em seguida, na `develop`. A tag `v2.0` foi criada no commit de merge na `main`

## 2.4 Hotfix

- **Qual foi o problema corrigido?** Foi identificado que o endpoint `POST /tasks` retornava o objeto completo da tarefa. Para otimizar, um hotfix foi aplicado para que ele retornasse apenas o `id` da nova tarefa
- **Como foi feito o merge?** A branch `hotfix/2.0.1` foi criada a partir da `main`. Após a correção, ela foi integrada primeiro na `main` (e tagueada como `v2.0.1`) e, em seguida, na `develop`, garantindo que a correção fosse incorporada em ambas as linhas de código *(Ver Print 6 na seção de Evidências)*

## 2.5 Uso de Rebase

- **Em qual feature foi aplicado?** Na feature `feature/update-task-jl`
- **O que mudou no histórico?** O desenvolvimento foi feito em dois commits pequenos. Antes de integrar, usamos `git rebase -i HEAD~2` para uni-los em um único commit, mais coeso. Isso tornou o histórico da `develop` mais limpo e linear, pois a feature foi integrada como uma única unidade de trabalho, em vez de múltiplos pequenos passos


3. Fase 2 - Trunk-Based Development

3.1 Branches Curtos

Nesta fase, trabalhamos com branches de vida curta criadas diretamente a partir da main.

    Branches criadas:

        short/improve-error-messages (1 commit)

        short/refactor-get-tasks (2 commits)

3.2 Squash

    Qual merge foi feito usando squash? O merge da branch short/refactor-get-tasks na main.

    Por que foi escolhido? A branch continha dois commits de baixa granularidade ("docs: add comment..." e "feat: update api root message"). Usamos o squash para condensá-los em um único commit significativo na main, mantendo o histórico do tronco limpo e focado em entregas de valor, não nos passos intermediários.

3.3 Tag Final

    Tag criada: v3.0 foi criada no último commit da main para marcar a conclusão desta fase. (Ver Print 7 na seção de Evidências)


  ## 4. Histórico de Commits

Abaixo, a saída completa do comando `git log --oneline --graph --all`, que ilustra todo o fluxo de trabalho do projeto.


## 5. Reflexão Final

**Qual estratégia (Git Flow ou Trunk-Based) foi mais eficiente no grupo? Por quê?**

Após a experiência prática com ambas as estratégias, nossa equipe concluiu que, para o escopo e a escala deste projeto, o Trunk-Based Development se mostrou mais eficiente.

O Git Flow, embora extremamente robusto e seguro, introduziu uma camada de complexidade que pareceu excessiva para uma equipe pequena trabalhando em um ritmo rápido. A necessidade de gerenciar `main`, `develop`, `feature`, `release` e `hotfix` resultou em um número maior de merges e um fluxo de trabalho mais cerimonioso. Essa estrutura é, sem dúvida, valiosa para projetos maiores, com múltiplos releases em produção e uma necessidade estrita de isolamento entre o que está pronto para ser lançado e o que está em desenvolvimento.

Por outro lado, o Trunk-Based Development nos proporcionou um ciclo de feedback muito mais rápido e um processo mais simples. A criação de branches de vida curta diretamente da `main` e sua rápida integração incentivaram a criação de features pequenas e bem definidas. A comunicação na equipe precisou ser mais constante, o que consideramos um ponto positivo. A complexidade do histórico de commits foi drasticamente reduzida, tornando mais fácil entender o progresso do projeto.

Em suma, a eficiência de cada estratégia depende do contexto. Para um projeto universitário, ágil e com uma equipe pequena como a nossa, a simplicidade e a velocidade do Trunk-Based Development superaram a segurança e a estrutura formal do Git Flow.

## Evidências (prints)


<img width="1151" height="406" alt="Image" src="https://github.com/user-attachments/assets/d187862d-ea65-46fd-bb77-965d7e47c9e1" />

<img width="1279" height="582" alt="Image" src="https://github.com/user-attachments/assets/7a283d51-7a5b-485f-ab13-28706a0845f5" />

<img width="1340" height="796" alt="Image" src="https://github.com/user-attachments/assets/18bd96d5-65b4-4c6b-9aef-88a8287342cf" />

![Image](https://github.com/user-attachments/assets/17d2076d-d6d6-4fb9-a6ee-89877df45c7c)

