import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todo-app';

  public todos: Todo[] = [];

  public todoForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: ['', [Validators.required]],
    });
  }

  add() {
    if (this.todoForm.valid) {
      const newTodo: Todo = {
        id: this.todos.length,
        title: this.todoForm.value.title,
        completed: false,
      };

      this.todos.push(newTodo);
      this.todoForm.reset();
    }
  }

  update(todo: Todo) {
    this.todos[todo.id].completed = !this.todos[todo.id].completed;
  }

  delete(todo: Todo) {
    this.todos = this.todos.filter((val) => todo.id !== val.id);
  }
}
