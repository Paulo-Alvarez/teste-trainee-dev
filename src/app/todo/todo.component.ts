import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';
import { Filter } from 'bad-words';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  showCompletedTasks: boolean = true;

  todoEditando: Todo | null = null;
  tituloInput: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(newTodoTitle: string) {
    const newTodo: Todo = {
      id: this.todos.length + 1,
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
    this.todoService.deleteTodo(todoId);
    this.loadTodos();
  }

  clearAll() {
    if (this.todos.length > 0 && confirm('Are you sure you want to clear all tasks?')) {
      this.todoService.clearAll();
      this.loadTodos();
    }
  }

  clearCompletedTasks() {
    if (confirm('Tem certeza de que deseja limpar as tarefas concluídas?')) {
      this.todoService.clearCompletedTasks();
      this.loadTodos();
    }
  }

  toggleCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
    this.loadTodos();
    this.todos = this.filteredTodos();
  }

  filteredTodos() {
    return this.showCompletedTasks ? this.todos : this.todos.filter(todo => !todo.completed);
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
      alert('Não é permitido cadastrar tarefas com palavras obscenas.');
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
          id: this.todos.length + 1,
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
}
