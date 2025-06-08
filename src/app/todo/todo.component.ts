import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';

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

  get labelClearAll(){
    return 'Limpar Todas as Tarefas'
  }

  editarTodo(todo: Todo) {
    this.todoEditando = todo;
    this.tituloInput = todo.title;
  }

  salvarTodo() {
    const titulo = this.tituloInput.trim();
    if (!titulo) return;

    if (this.todoEditando) {
      const updatedTodo = { ...this.todoEditando, title: titulo };
      this.updateTodo(updatedTodo);
      this.todoEditando = null;
    } else {
      this.addTodo(titulo);
    }

    this.tituloInput = '';
  }

  ordenarPorTituloAZ(): void {
    this.todos = this.todos.sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );
  }
}
