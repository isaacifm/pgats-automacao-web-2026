# PGATS – Automação Web E2E

Testes end-to-end com [Cypress](https://www.cypress.io/) para o site [Automation Exercise](https://automationexercise.com).

Este guia explica como executar a suíte **`cypress/e2e/automation-exercise-modules.cy.js`**, localmente ou pelo GitHub Actions.

## Sobre a suíte

A suíte usa o padrão de módulos: as ações de cada área do site ficam em `cypress/modules/` e o arquivo de teste apenas as combina.

| Módulo | Responsabilidade |
| --- | --- |
| `modules/home` | Acessar e validar a home, assinar a newsletter |
| `modules/register` | Cadastro, login, logout e exclusão de conta |
| `modules/products` | Listagem, detalhe e busca de produtos |
| `modules/cart` | Adicionar produtos e validar o carrinho |
| `modules/checkout` | Validar dados do pedido e pagar |
| `modules/api` | Criar e excluir usuários via API |
| `modules/data` | Gerar dados de usuário para cada teste |

Casos de teste cobertos:

- Test Case 1: Register User
- Test Case 2: Login User with correct email and password
- Test Case 3: Login User with incorrect email and password
- Test Case 4: Logout User
- Test Case 5: Register User with existing email
- Test Case 8: Verify All Products and product detail page
- Test Case 9: Search Product
- Test Case 10: Verify Subscription in home page
- Test Case 15: Place Order: Register before Checkout
- Test Case 16: Place Order: Login before Checkout

Cada teste gera um usuário novo e, ao final, o exclui via API (mesmo quando o teste falha).

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior
- npm (instalado junto com o Node.js)
- Git

## Execução local

1. Clone o repositório e entre na pasta:

   ```bash
   git clone https://github.com/isaacifm/pgats-automacao-web-2026.git
   cd pgats-automacao-web-2026
   ```

2. Instale as dependências:

   ```bash
   npm ci
   ```

3. Execute a suíte em modo headless (sem interface):

   ```bash
   npx cypress run --spec cypress/e2e/automation-exercise-modules.cy.js
   ```

   Para usar outro navegador instalado na máquina, adicione `--browser`:

   ```bash
   npx cypress run --spec cypress/e2e/automation-exercise-modules.cy.js --browser chrome
   ```

4. Ou abra a interface do Cypress para acompanhar os testes:

   ```bash
   npx cypress open
   ```

   Escolha **E2E Testing**, selecione o navegador e clique em `automation-exercise-modules.cy.js`.

### Relatórios

O projeto usa o [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter). Depois de um `cypress run`, o relatório HTML fica em `cypress/reports/html/index.html`. Em caso de falha, as capturas de tela ficam em `cypress/screenshots/`.

## Execução via GitHub Actions

Os testes também podem ser executados pelo GitHub Actions, com o workflow [`.github/workflows/tests.yaml`](.github/workflows/tests.yaml) (**Web E2E Tests**). Ele é disparado manualmente (`workflow_dispatch`):

1. No GitHub, abra a aba **Actions** do repositório.
2. Selecione o workflow **Web E2E Tests** na lista à esquerda.
3. Clique em **Run workflow**, escolha a branch e confirme em **Run workflow**.

O workflow roda em `ubuntu-latest` e:

1. faz o checkout do projeto;
2. instala o Node.js 20 com cache do npm;
3. instala as dependências com `npm ci`;
4. executa `npx cypress run --spec cypress/e2e/automation-exercise-modules.cy.js`;
5. publica os relatórios e screenshots como artefato **relatorios**.

Ao terminar, abra a execução e baixe o artefato **relatorios** na seção **Artifacts** para ver o relatório HTML. Ele é publicado mesmo quando os testes falham.

Também é possível disparar pelo terminal com o [GitHub CLI](https://cli.github.com/):

```bash
gh workflow run tests.yaml
```

## Configuração

As configurações ficam em [`cypress.config.js`](cypress.config.js):

- `baseUrl`: `https://automationexercise.com`
- viewport de 1366x768
- `defaultCommandTimeout` de 10 segundos
- bloqueio de domínios de anúncios e rastreadores (`blockHosts`), que deixam as páginas mais lentas e podem cobrir elementos
