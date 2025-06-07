# Relatório Técnico - Paulo Alvarez

## 1. Visão Geral da Solução:

Bem-vindo(a) ao nosso desafio de código!

Este repositório contém o código-fonte de uma aplicação de gerenciamento de tarefas desenvolvida em Angular. O projeto foi iniciado por um fornecedor anterior, mas foi entregue incompleto, instável e com diversos bugs.

---

## 2. Como Executar a Aplicação:

A empresa IMTS Group precisa de uma aplicação funcional para que seus colaboradores gerenciem suas tarefas. O projeto foi entregue com uma série de problemas que impedem até mesmo sua inicialização, além de falhas de funcionalidade e usabilidade identificadas por um analista de qualidade (QA).

---

## 3. Correção dos Erros Iniciais (npm start):

Após dar o comando de **npm start** no meu terminal, foi percebido um erro que indicava que o **script "start" não havia sido definido no meu arquivo package.json.**

E realmente, ao usar o comando **npm run** não foi indicado o script "start" no arquivo. Para resolver esse problema, fui até o meu arquivo package.json e **inclui o script "start": "ng serve"** na sessão **"scripts"**

Após isso, a aplicação ficou diponível na rota http://localhost:4200/ mas apareceu uma mensagem de **Cannot GET /** ao abrir.

Logo, comecei a investigar o que poderia estar causando isso. Identifiquei que no arquivo **header.components.ts** estava faltando a letra **r** nessa linha de código: **export class HeadeComponent implements OnInit.**

Outro problema que estava impedindo o programa de compilar era que faltava a importação do **TodoService** no arquivo **new-task.component.ts**, adicionei **import { TodoService } from '../../shared/services/todo.service';** para mitigar esse problema. *Aqui também já verifiquei a duplicação de this.todoService.addTodo(newTodo), mas optei por corrigir esse bug na próxima etapa*.

Por fim, também foi necessário instalar o FontAwesome no terminal porque seus ícones estão sendo usados no projeto.

Após isso, os erros iniciais foram todos **resolvidos.**

---

## 4. Relatório de Correção de Bugs:

Nessa seção, listo os bugs e o que foi necessário para resolvê-los:

1.  **Ao clicar no botão “Salvar”, a tarefa estava sendo adicionada duas vezes** Esse problema ocorreu porque o método **addTask()** que está no arquivo **new-task.component.ts** continha o trecho **this.todoService.addTodo(newTodo);** duplicado. Corrigi isso e o problema foi resolvido.
2.  **Só está sendo possível salvar uma tarefa a primeira vez que clica no botão “Salvar”, só é possível salvar uma nova tarefa após atualizar a página (F5):** Esse bug estava sendo ocasionado por causa do trecho **if (this.count > 0) return;** que estava impedindo que o botão funcionasse mais de uma vez. Além disso, retirei o trecho **count = 0;** que se tornou desnecessário e adicionei uma verificação para evitar a criação de tarefas com título vazio (**if (!this.newTaskTitle.trim()) return;**).
3.  **O texto do botão de limpar todas as tarefas não está em português:** Esse problema estava no arquivo **todo.components.ts** e acontecia causa do trecho **return 'Clear All'** que estava na função **get labelClearAll()**. A solução foi simplesmente traduzir o trecho para o português.
4.  **O botão “Exibir Tarefas Concluídas” está, na verdade, ocultando as tarefas concluídas:** A problemática estava no trecho **{{ showCompletedTasks ? 'Exibir Tarefas Concluídas' : 'Ocultar Tarefas Concluídas' }}** que estava com a ordem dos textos trocada. Inverti e o problema foi resolvido.
5.  **O botão “Ocultar Tarefas Concluídas” tem o comportamento invertido, exibindo as tarefas concluídas:** Mesma explicação e solução do problema anterior.
6.  **Ao clicar em “Limpar Tarefas Concluídas”, a ação é executada sem pedir uma confirmação ao usuário** Essa questão foi resolvida ao colocar o trecho **if (confirm('Tem certeza de que deseja limpar as tarefas concluídas?'))** para poder fazer a confirmação da função **clearCompletedTasks()** que está no arquivo **todo.components.ts**.
7.  **O botão “Limpar Tarefas Concluídas” está removendo as tarefas não concluídas em vez das concluídas:** Esse problema se encontrava no arquivo **todo.service.ts** e ocorria porque a função **clearCompletedTasks()** continha o trecho **this.todos = this.todos.filter(({ completed }) => completed === true);** que estava mantendo as tarefas concluídas invés de remover. Foi corrigido ao inverter para false.
8.  **O botão “Editar” não está funcional:** Esse problema se encontrava nos arquivos **todo-item.component.ts** e **todo-item.component.html**. Ocorreu porque o botão Editar não disparava nenhuma ação ao ser clicado. Foi corrigido ao criar o método editar() no TypeScript que emite o evento editTodo, e ao associar esse método ao botão no HTML com (click)="editar()".
9.  **O botão “Editar” está desalinhado e deve ser posicionado ao lado do botão “Remover”:** Esse problema se encontrava no arquivo **todo-item.component.css** e ocorria porque os botões “Editar” e “Remover” não estavam agrupados e alinhados corretamente. Foi corrigido ao aplicar **display: flex, align-items: center e justify-content: space-between** no container **.todo-item**.
10.  **O botão “Remover” deve ter a cor vermelha para indicar uma ação destrutiva:** Esse erro se apresentava por conta do arquivo **todo-item.component.html** que em seu código determinava que a cor da classe **todo-item_delete** deveria ser preto. Alterei para vermelho e funcionou.
11.  **A lista de tarefas não apresenta uma barra de rolagem quando o número de itens ultrapassa a altura do painel, impedindo a visualização de todas as tarefas:** Problema havia sido solucionado anteriormente. Foi necessário colocar o trecho **overflow-y: auto;** na classe **.todo-list_container** que está no arquivo **todo.component.css**.
12.  **Salvar sem digitar um “Título da Tarefa” está adicionando um item em branco à lista:** Também já havia resolvido essa questão anteriormente ao adicionar uma verificação para evitar a criação de tarefas com título vazio ou com apenas espaços (**if (!this.newTaskTitle.trim()) return;**).
13.  **Digitar apenas espaços no campo “Título da Tarefa” e salvar também está adicionando um item em branco:** Mesma explicação e solução do problema anterior.

---

## 5. Requisitos Técnicos (Lista de Tarefas do QA)

A seguir estão os pontos exatos que você deve abordar.

### 5.1. Bugs a Corrigir

1.  Ao clicar no botão “Salvar”, a tarefa está sendo adicionada duas vezes.
2.  Só está sendo possível salvar uma tarefa a primeira vez que clica no botão “Salvar”, só é possível salvar uma nova tarefa após atualizar a página (F5)
3.  O texto do botão de limpar todas as tarefas não está em português.
4.  O botão “Exibir Tarefas Concluídas” está, na verdade, ocultando as tarefas concluídas.
5.  O botão “Ocultar Tarefas Concluídas” tem o comportamento invertido, exibindo as tarefas concluídas.
6.  Ao clicar em “Limpar Tarefas Concluídas”, a ação é executada sem pedir uma confirmação ao usuário.
7.  O botão “Limpar Tarefas Concluídas” está removendo as tarefas não concluídas em vez das concluídas.
8.  O botão “Editar” não está funcional. O comportamento esperado é: ao clicar, o campo “Título da Tarefa” deve ser preenchido com o texto da tarefa selecionada. Ao salvar, o item na lista deve ser atualizado e o campo de texto limpo.
9.  O botão “Editar” está desalinhado e deve ser posicionado ao lado do botão “Remover”.
10.  O botão “Remover” deve ter a cor vermelha para indicar uma ação destrutiva.
11. A lista de tarefas não apresenta uma barra de rolagem quando o número de itens ultrapassa a altura do painel, impedindo a visualização de todas as tarefas.
12. Salvar sem digitar um “Título da Tarefa” está adicionando um item em branco à lista.
13. Digitar apenas espaços no campo “Título da Tarefa” e salvar também está adicionando um item em branco.

### 5.2. Melhorias a Implementar

1.  Implementar um botão “Ordenar de A a Z” que, ao ser clicado, ordene alfabeticamente a lista de tarefas visíveis.
2.  Permitir que o usuário adicione uma tarefa pressionando a tecla `Enter` no campo de texto, além do clique no botão “Salvar”.
3.  Permitir a adição de múltiplas tarefas de uma só vez. O usuário deverá digitar os títulos separados pelo caractere `|` (pipe).
4.  Implementar um filtro de palavras obscenas. Caso o usuário tente cadastrar uma tarefa contendo um palavrão, exiba a mensagem: “Não é permitido cadastrar tarefas com palavras obscenas.” (Sugestão de biblioteca: `https://github.com/web-mech/badwords`).
5.  Adicionar a funcionalidade de exportar a lista de tarefas atual para um arquivo PDF. (Sugestão de biblioteca: `https://github.com/parallax/jsPDF`).
6.  Substituir todos os `alert`s e `confirm`s nativos do navegador por uma experiência mais moderna, utilizando a biblioteca SweetAlert. (Sugestão: `https://sweetalert2.github.io/`).

---

## 6. Instruções de Entrega

Ao finalizar todo o trabalho, você deve:

1.  **Fazer o commit de cada item separadamente**, conforme detalhado na seção "Boas Práticas" abaixo. O histórico de commits é uma parte crucial da avaliação. 

2.  **Substituir o conteúdo deste `README.md`** pelo seu relatório técnico final. O seu relatório deve conter as seguintes seções:

    * **Relatório Técnico - [Seu Nome]**
    * **1. Visão Geral da Solução:** Um breve resumo do que foi feito.
    * **2. Como Executar a Aplicação:** Instruções claras para clonar, instalar e rodar o projeto (`npm install`, `npm start`).
    * **3. Correção dos Erros Iniciais (`npm start`):** Descreva quais eram os erros que impediam a aplicação de rodar e como você os solucionou.
    * **4. Relatório de Correção de Bugs:** Para cada bug da lista, explique a causa raiz e a solução que você implementou.
    * **5. Relatório de Implementação de Melhorias:** Para cada melhoria, descreva sua abordagem técnica e quais bibliotecas foram utilizadas.
    * **6. Relatório de Débito Técnico:** Para cada ítem da lista de bugs e melhorias que você não conseguiu resolver ou implementar, descreva quais foram as dificuldades que você enfrentou na qual fizerem com que você não tenha conseguido entregar.
    * **7. Relatório de Melhorias:** Descreva quais melhorias (novas funcionalidades) você acha interessante que sejam implementadas para evoluir o sistema.
    * **8. Decisões e Considerações:** (Opcional) Espaço para comentar qualquer decisão de arquitetura ou desafio interessante que você encontrou.
    

---

## 7. Boas Práticas e Uso de Ferramentas

### Commits Atômicos
Cada bug corrigido e cada melhoria implementada deve ser um commit individual no repositório. Suas mensagens de commit devem ser claras e descritivas (ex: `fix: corrige a duplicação de tarefas ao salvar` ou `feat: implementa a exportação para PDF`). Isso é fundamental para avaliarmos seu processo de desenvolvimento.

### Uso de Inteligência Artificial
O uso de ferramentas de Inteligência Artificial (como ChatGPT, GitHub Copilot, etc.) é permitido como um recurso de apoio. No entanto, o mais importante é que você **entenda profundamente** o código e as soluções que está entregando. Esteja preparado(a) para explicar suas escolhas e defender a lógica implementada no relatório e na entrevista técnica, pois o conhecimento da solução é de sua total responsabilidade.

---

## 8. Critérios de Avaliação

Lembre-se que avaliaremos:
* **Funcionalidade:** Cumprimento de todos os requisitos.
* **Qualidade do Código:** Legibilidade, organização e boas práticas.
* **Lógica e Eficiência:** Robustez das suas soluções.
* **Comunicação:** Clareza do seu relatório técnico (`README.md`).
* **Controle de Versão:** Qualidade e granularidade das suas mensagens de commit.

---

## 9. Uma Palavra Final

Entendemos que desafios como este podem ser complexos. Se você não conseguir concluir 100% dos itens, não desanime! Entregue o máximo que conseguir e documente seu progresso.

Para nós, a jornada é tão importante quanto o destino. Não estamos buscando um profissional que saiba tudo, mas sim alguém com vontade de aprender, evoluir e que entenda que os erros são parte fundamental do crescimento.

**Boa sorte!**
