# Relatório Técnico - Paulo Alvarez

## 1. Visão Geral da Solução:

Este projeto teve como objetivo **recuperar e aprimorar uma aplicação web de gerenciamento de tarefas desenvolvida em Angular**, que inicialmente se encontrava em um estado incompleto e apresentava problemas de funcionamento.

O **primeiro passo** foi garantir que o ambiente de desenvolvimento estivesse funcional. Para isso, foram feitas **correções em arquivos de configuração, ajustes em nomes de componentes, importações ausentes e instalações de dependências necessárias** para que a aplicação pudesse ser **executada corretamente**.

Com o ambiente estabilizado, iniciou-se a **etapa de correção dos erros existentes**. Foram identificados e resolvidos diversos bugs que comprometiam a experiência do usuário, como falhas ao adicionar novas tarefas, problemas nos botões de ação (como editar, excluir e limpar), comportamentos invertidos em funcionalidades de exibição e a ausência de validações básicas nos formulários. Algumas dessas correções também envolveram ajustes visuais e de estilo para tornar a interface mais coerente e acessível.

Além das correções, a aplicação passou por um processo de modernização com a adição de **novas funcionalidades**. Foram incorporados recursos como ordenação alfabética, atalho via tecla Enter, adição de múltiplas tarefas simultaneamente, exportação da lista para PDF, filtro de palavras impróprias e substituição dos alertas nativos por uma experiência mais elegante usando a biblioteca SweetAlert2.

Durante todo o processo, foram adotadas **boas práticas de versionamento com Git e registro contínuo no README**, permitindo um controle claro das alterações e facilitando futuras manutenções.

O resultado final é uma aplicação mais estável, intuitiva e equipada com funcionalidades que a tornam realmente útil no contexto de gerenciamento pessoal de tarefas.

---

## 2. Como Executar a Aplicação:

Para rodar este projeto localmente em sua máquina, siga os passos abaixo:

Primeiro, faça o clone do repositório com o seguinte comando:

```bash
git clone https://github.com/Paulo-Alvarez/teste-trainee-dev
```

Em seguida, entre na pasta do projeto:

```bash
cd teste-trainee-dev
```

Agora, instale todas as dependências necessárias:

```bash
npm install
```

Com tudo pronto, inicie o servidor de desenvolvimento com:

```bash
npm start
```

Após isso, a aplicação estará acessível no seu navegador, através do endereço:

http://localhost:4200/

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

1.  **Ao clicar no botão “Salvar”, a tarefa estava sendo adicionada duas vezes:** Esse problema ocorreu porque o método **addTask()** que está no arquivo **new-task.component.ts** continha o trecho **this.todoService.addTodo(newTodo);** duplicado. Corrigi isso e o problema foi resolvido.

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

## 5. Melhorias Implementadas:

Nesta seção, listo as melhorias implementadas e explico o que foi necessário para realizá-las: 

1.  **Implementar um botão “Ordenar de A a Z”:** Para implementar esse botão, foi adicionado um novo botão no arquivo **todo.component.html**, utilizando o mesmo padrão visual dos demais botões já existentes na interface. Em seguida, foi criada uma função no arquivo **todo.component.ts** chamada ordenarPorTituloAZ. Essa função utiliza o método **sort** para ordenar a lista de tarefas com base no título de cada uma, ignorando diferenças entre letras maiúsculas e minúsculas.

2.  **Permitir que o usuário adicione uma tarefa pressionando a tecla Enter no campo de texto:** Para garantir esse comportamento, foi adicionado o evento **(keyup.enter)** ao campo de entrada de texto no arquivo **todo.component.html**. Esse evento chama a função **salvarTodo()**, que já era utilizada pelo botão "Salvar", garantindo que ambas as formas de interação executem a mesma lógica.

3.  **Permitir a adição de múltiplas tarefas de uma só vez:** Para permitir que o usuário adicione várias tarefas em uma única ação, foi ajustada a função **salvarTodo()** no arquivo **todo.component.ts**. Agora, o campo de entrada aceita múltiplos títulos separados pelo caractere |. Para fazer isso foi utilizado a **manipulação de strings com split('|') e trim()**, a **Validação com filter(t => t)** para remover itens vazios e a Estrutura de repetição com **forEach()**.

4.  **Implementar um filtro de palavras obscenas:** foi integrada a biblioteca bad-words ao projeto. Após instalar a biblioteca via npm e importar o filtro no arquivo **todo.component.ts**, foi criada uma instância do filtro para verificar os títulos das tarefas antes de adicioná-las. Na função **salvarTodo()**, cada título digitado é checado com o método **isProfane()** do filtro. No momento, as palavras proibidas são somente na língua inglesa, mas em uma futura versão é possível ampliar para diferentes idiomas.

5.  **Adicionar a funcionalidade de exportar a lista de tarefas atual para um arquivo PDF:** para implementar essa funcionalidade, foi instalada a biblioteca jsPDF via npm e importada no arquivo **todo.component.ts**. Em seguida, foi criada a função **exportarParaPDF()**, que gera um documento PDF contendo a lista atual de tarefas, incluindo seu status (concluída ou não). Essa função utiliza métodos do jsPDF para formatar e salvar o arquivo PDF. Por fim, foi adicionado um botão no arquivo **todo.component.html** que dispara a função ao ser clicado.

6.  **Substituir todos os alerts e confirms nativos do navegador por uma experiência mais moderna, utilizando a biblioteca SweetAlert:** Foi instalada a biblioteca SweetAlert2 via npm e importada no arquivo **todo.component.ts** e **todo-item.component.ts**. Em seguida, todos os alert() e confirm() nativos do navegador foram substituídos por chamadas aos métodos da SweetAlert, como Swal.fire().

---

## 6. Relatório de Débito Técnico:

Todas as correções de bugs e melhorias planejadas foram implementadas com sucesso dentro do prazo estabelecido. Não houve itens pendentes ou dificuldades técnicas que tenham impedido a entrega completa das funcionalidades previstas.

---

## 7. Relatório de Melhorias:

Nesta seção, listo algumas sugestões de melhorias que poderiam ser implementadas para melhorar ainda mais a aplicação proposta: 

### Botão Marcar todas como concluídas
Adição de botão que teria como funcionalidade marcar todas as tarefas como concluídas. Seria uma adição natural para a interface, e melhoraria a produtividade dos usuários.

### Categorias ou etiquetas
Dar a possibilidade do usuário etiquetar que tipo de tarefa está sendo adicionada (ex: pessoal, trabalho, estudo, etc), de modo a potencializar a sua organização.

### Filtrar por Categorias
Além disso, seria interessante existir uma maneira de filtrar as tarefas pelas categorias que o usuário selecionou para as suas atividades.

### Data e Hora Limite
Dar a possibilidade do usuário estipular dia e hora limite para que aquela tarefa seja concluída, de modo que ele tenha um lembrete visual do prazo.

### Ordenar por data e Hora Limite
Do mesmo modo, seria interessante que o usuário pudesse ordernar as suas tarefas de acordo com o prazo final para que a aplização o ajude a dar prioridade para os projetos mais urgentes.

### Nível de Prioridade
Dar a possibilidade do usuário estipular o nível de prioridade daquela tarefa (ex: Prioridade, Muito Importante, Importante, Bônus, etc). Assim, o usuário poderia se guiar com base na prioridade de concluir deteminada tarefa.

### Ordenar e/ou Filtrar por Nível de Prioridade
Continuando a sugestão anterior, pode ser interessante implementar uma maneira do usuário poder ordenar por nível de prioridade (ex: mais urgentes primeiro) e também filtrar pelo nível desejado.

### Login Simples
Utilizar sistema de login e senha para que o usuário possa utilizar a sua aplicação de modo personalizado e privado.

### Personalização da Interface
Dar a possibilidade do usuáiro ter mais controle da interface que irá utilizar, como ajuste de temas e tamanho da letra).

### Descrição adicional da tarefa
Permitir que, além do título, o usuário escreva uma descrição mais detalhada.

---

## 8. Decisões e Considerações:

Durante o desenvolvimento da aplicação, optei por seguir uma uma abordagem procedimental realizando os ajustes e implementações sugeridas uma a uma, conforme os bugs e melhorias listados no desafio. Essa abordagem me permitiu entender com clareza o impacto de cada mudança no funcionamento do sistema.

Algumas correções foram feitas de forma antecipada, antes mesmo de serem solicitadas nas etapas posteriores. Isso aconteceu, por exemplo, no tratamento para evitar que tarefas com títulos vazios ou compostos apenas por espaços fossem adicionadas, e também na inclusão de uma barra de rolagem na lista de tarefas, garantindo a usabilidade mesmo quando há muitos itens.

Além disso, busquei manter a organização do projeto ao longo do processo. Utilizei o Git de forma contínua para versionamento, criando commits a cada implementação ou correção importante, o que facilitou a rastreabilidade das alterações. Também mantive a documentação atualizada no arquivo README.md, registrando detalhes relevantes do desenvolvimento.

Em relação à estrutura da aplicação, o projeto já utilizava o serviço TodoService para centralizar a lógica de manipulação de tarefas. Em alguns pontos, foi necessário apenas corrigir a ausência da importação desse serviço ou ajustar chamadas duplicadas para garantir consistência com a arquitetura original proposta.
