import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  @Output() deletedTodo: EventEmitter<number> = new EventEmitter<number>();

  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) {}

  deleteTodo(): void {
  Swal.fire({
    title: 'Tem certeza?',
    text: 'Deseja excluir esta tarefa?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.todoService.deleteTodo(this.todo.id);
      this.deletedTodo.emit(this.todo.id);

      Swal.fire('Excluído!', 'A tarefa foi removida.', 'success');
    }
  });
}

  onTaskChecked(): void {
    this.todoService.updateTodo(this.todo);
  }

  editar() {
    this.editTodo.emit(this.todo);
  }
}


