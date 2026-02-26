import { TodoController } from "./controllers/todo.controller";
import { TodoView } from "./views/todo.views";
import { TodoService } from "./services/todo.service";
const app = new TodoController(new TodoService(), new TodoView());
