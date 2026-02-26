import { Todo } from "../models/todo.model";

export class TodoService {
  public todos: Todo[];
  private onTodoListChanged: any;

  constructor() {
    this.todos = (JSON.parse(<string>localStorage.getItem("todos")) || []).map(
      (todo: Todo) => new Todo(todo),
    );
  }

  bindTodoListChanged(callback: Function): void {
    this.onTodoListChanged = callback;
  }

  _commit(todos: Todo[]): void {
    this.onTodoListChanged(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  addTodo(text: string): void {
    this.todos.push(new Todo({ text }));

    this._commit(this.todos);
  }

  editTodo(id: string, updatedText: string): void {
    this.todos = this.todos.map((todo) =>
      todo.id === id
        ? new Todo({
            ...todo,
            text: updatedText,
          })
        : todo,
    );

    this._commit(this.todos);
  }

  deleteTodo(_id: string): void {
    this.todos = this.todos.filter(({ id }) => id !== _id);

    this._commit(this.todos);
  }

  toggleTodo(_id: string): void {
    this.todos = this.todos.map((todo) =>
      todo.id === _id ? new Todo({ ...todo, complete: !todo.complete }) : todo,
    );

    this._commit(this.todos);
  }
}
