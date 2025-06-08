import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';
import { Filter } from 'bad-words';
import { jsPDF } from "jspdf";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  filtered: Todo[] = [];
  showCompletedTasks: boolean = true;

  todoEditando: Todo | null = null;
  tituloInput: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      this.applyFilter();
    });
  }

  applyFilter() {
    this.filtered = this.showCompletedTasks
      ? this.todos
      : this.todos.filter(todo => !todo.completed);
  }

  addTodo(newTodoTitle: string) {
    const newTodo: Todo = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      title: newTodoTitle,
      completed: false
    };

    this.todoService.addTodo(newTodo);
    this.loadTodos();
  }

  updateTodo(updatedTodo: Todo) {
    this.todoService.updateTodo(updatedTodo);
    this.loadTodos();
  }

  deleteTodo(todoId: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja excluir esta tarefa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.deleteTodo(todoId);
        this.loadTodos();
        Swal.fire('Excluído!', 'A tarefa foi removida.', 'success');
      }
    });
  }

  clearAll() {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja limpar todas as tarefas? Esta ação não poderá ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, limpar tudo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.clearAll();
        this.loadTodos();
        Swal.fire('Concluído!', 'Todas as tarefas foram removidas.', 'success');
      }
    });
  }

  clearCompletedTasks() {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja limpar as tarefas concluídas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, limpar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.clearCompletedTasks();
        this.loadTodos();
        Swal.fire('Concluído!', 'As tarefas concluídas foram limpas.', 'success');
      }
    });
  }

  toggleCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
    this.applyFilter();
  }

  get labelClearAll() {
    return 'Limpar Todas as Tarefas';
  }

  editarTodo(todo: Todo) {
    this.todoEditando = todo;
    this.tituloInput = todo.title;
  }

  salvarTodo() {
    const filtro = new Filter();

    const titulos = this.tituloInput
      .split('|')
      .map(t => t.trim())
      .filter(t => t);

    const contemPalavraObscena = titulos.some(titulo => filtro.isProfane(titulo));
    if (contemPalavraObscena) {
      Swal.fire({
        icon: 'error',
        title: 'Atenção',
        text: 'Não é permitido cadastrar tarefas com palavras obscenas.'
      });
      return;
    }

    if (this.todoEditando) {
      if (titulos.length > 0) {
        const updatedTodo = { ...this.todoEditando, title: titulos[0] };
        this.updateTodo(updatedTodo);
      }
      this.todoEditando = null;
    } else {
      titulos.forEach(titulo => {
        const newTodo: Todo = {
          id: Date.now() + Math.floor(Math.random() * 1000),
          title: titulo,
          completed: false
        };
        this.todoService.addTodo(newTodo);
      });
    }

    this.tituloInput = '';
    this.loadTodos();
  }

  ordenarPorTituloAZ(): void {
    this.todos = this.todos.sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );
    this.applyFilter();
  }

  exportarParaPDF(): void {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Lista de Tarefas", 10, 10);

    let yPos = 20;
    this.todos.forEach((todo, index) => {
      const status = todo.completed ? "[x]" : "[ ]";
      doc.text(`${index + 1}. ${status} ${todo.title}`, 10, yPos);
      yPos += 10;
    });

    doc.save("tarefas.pdf");
  }

  trackById(index: number, todo: Todo) {
    return todo.id;
  }
}
