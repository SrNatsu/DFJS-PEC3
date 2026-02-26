import { Todo } from "../models/todo.model";

export class TodoView {
  public app: HTMLElement;
  public form: HTMLElement;
  public input: HTMLElement;
  public submitButton: HTMLElement;
  public title: HTMLElement;
  public todoList: HTMLElement;
  public _temporaryTodoText: string;

  constructor() {
    this.app = <HTMLElement>this.getElement("#root");
    this.form = this.createElement("form");
    this.input = this.createElement("input");
    (this.input as HTMLInputElement).type = "text";
    (this.input as HTMLInputElement).placeholder = "Add todo";
    (this.input as HTMLInputElement).name = "todo";
    this.submitButton = this.createElement("button");
    this.submitButton.textContent = "Submit";
    this.form.append(this.input, this.submitButton);
    this.title = this.createElement("h1");
    this.title.textContent = "Todos";
    this.todoList = this.createElement("ul", "todo-list");
    this.app.append(this.title, this.form, this.todoList);

    this._temporaryTodoText = "";
    this._initLocalListeners();
  }

  get _todoText() {
    return (this.input as HTMLInputElement).value;
  }

  _resetInput() {
    (this.input as HTMLInputElement).value = "";
  }

  createElement(tag: string, className?: string) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector: string) {
    const element = document.querySelector(selector);

    return element;
  }

  displayTodos(todos: Todo[]) {
    // Delete all nodes
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }

    // Show default message
    if (todos.length === 0) {
      const p = this.createElement("p");
      p.textContent = "Nothing to do! Add a task?";
      this.todoList.append(p);
    } else {
      // Create nodes
      todos.forEach((todo) => {
        const li: HTMLElement = this.createElement("li");
        li.id = todo.id;

        const checkbox = this.createElement("input");
        (checkbox as HTMLInputElement).type = "checkbox";
        (checkbox as HTMLInputElement).checked = todo.complete;

        const span: HTMLElement = this.createElement("span");
        (span as HTMLSpanElement).contentEditable = "true";
        span.classList.add("editable");

        if (todo.complete) {
          const strike: HTMLElement = this.createElement("s");
          strike.textContent = todo.text;
          span.append(strike);
        } else {
          span.textContent = todo.text;
        }

        const deleteButton: HTMLElement = this.createElement(
          "button",
          "delete",
        );
        deleteButton.textContent = "Delete";
        li.append(checkbox, span, deleteButton);

        // Append nodes
        this.todoList.append(li);
      });
    }

    // Debugging
    console.log(todos);
  }

  _initLocalListeners(): void {
    this.todoList.addEventListener("input", (event) => {
      if ((event.target as HTMLInputElement).className === "editable") {
        this._temporaryTodoText = (event.target as HTMLInputElement).innerText;
      }
    });
  }

  bindAddTodo(handler: Function): void {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (this._todoText) {
        handler(this._todoText);
        this._resetInput();
      }
    });
  }

  bindDeleteTodo(handler: Function): void {
    this.todoList.addEventListener("click", (event) => {
      if ((event.target as HTMLInputElement).className === "delete") {
        const id: string = (
          (event.target as HTMLButtonElement).parentElement as HTMLElement
        ).id;

        handler(id);
      }
    });
  }

  bindEditTodo(handler: Function): void {
    this.todoList.addEventListener("focusout", (event) => {
      if (this._temporaryTodoText) {
        const id: string = (
          (event.target as HTMLButtonElement).parentElement as HTMLElement
        ).id;

        handler(id, this._temporaryTodoText);
        this._temporaryTodoText = "";
      }
    });
  }

  bindToggleTodo(handler: Function): void {
    this.todoList.addEventListener("change", (event) => {
      if ((event.target as HTMLInputElement).type === "checkbox") {
        const id: string = (
          (event.target as HTMLButtonElement).parentElement as HTMLElement
        ).id;

        handler(id);
      }
    });
  }
}
