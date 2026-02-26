/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./controllers/todo.controller.ts"
/*!****************************************!*\
  !*** ./controllers/todo.controller.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TodoController: () => (/* binding */ TodoController)
/* harmony export */ });
class TodoController {
    constructor(service, view) {
        this.onTodoListChanged = (todos) => {
            this.view.displayTodos(todos);
        };
        this.handleAddTodo = (todoText) => {
            this.service.addTodo(todoText);
        };
        this.handleEditTodo = (id, todoText) => {
            this.service.editTodo(id, todoText);
        };
        this.handleDeleteTodo = (id) => {
            this.service.deleteTodo(id);
        };
        this.handleToggleTodo = (id) => {
            this.service.toggleTodo(id);
        };
        this.service = service;
        this.view = view;
        // Explicit this binding
        this.service.bindTodoListChanged(this.onTodoListChanged);
        this.view.bindAddTodo(this.handleAddTodo);
        this.view.bindEditTodo(this.handleEditTodo);
        this.view.bindDeleteTodo(this.handleDeleteTodo);
        this.view.bindToggleTodo(this.handleToggleTodo);
        // Display initial todos
        this.onTodoListChanged(this.service.todos);
    }
}


/***/ },

/***/ "./models/todo.model.ts"
/*!******************************!*\
  !*** ./models/todo.model.ts ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Todo: () => (/* binding */ Todo)
/* harmony export */ });
class Todo {
    constructor({ text, complete } = { complete: false }) {
        this.id = this.uuidv4();
        this.text = text;
        this.complete = complete;
    }
    uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
    }
}


/***/ },

/***/ "./services/todo.service.ts"
/*!**********************************!*\
  !*** ./services/todo.service.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TodoService: () => (/* binding */ TodoService)
/* harmony export */ });
/* harmony import */ var _models_todo_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/todo.model */ "./models/todo.model.ts");

class TodoService {
    constructor() {
        this.todos = (JSON.parse(localStorage.getItem("todos")) || []).map((todo) => new _models_todo_model__WEBPACK_IMPORTED_MODULE_0__.Todo(todo));
    }
    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback;
    }
    _commit(todos) {
        this.onTodoListChanged(todos);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    addTodo(text) {
        this.todos.push(new _models_todo_model__WEBPACK_IMPORTED_MODULE_0__.Todo({ text }));
        this._commit(this.todos);
    }
    editTodo(id, updatedText) {
        this.todos = this.todos.map((todo) => todo.id === id
            ? new _models_todo_model__WEBPACK_IMPORTED_MODULE_0__.Todo(Object.assign(Object.assign({}, todo), { text: updatedText }))
            : todo);
        this._commit(this.todos);
    }
    deleteTodo(_id) {
        this.todos = this.todos.filter(({ id }) => id !== _id);
        this._commit(this.todos);
    }
    toggleTodo(_id) {
        this.todos = this.todos.map((todo) => todo.id === _id ? new _models_todo_model__WEBPACK_IMPORTED_MODULE_0__.Todo(Object.assign(Object.assign({}, todo), { complete: !todo.complete })) : todo);
        this._commit(this.todos);
    }
}


/***/ },

/***/ "./views/todo.views.ts"
/*!*****************************!*\
  !*** ./views/todo.views.ts ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TodoView: () => (/* binding */ TodoView)
/* harmony export */ });
class TodoView {
    constructor() {
        this.app = this.getElement("#root");
        this.form = this.createElement("form");
        this.input = this.createElement("input");
        this.input.type = "text";
        this.input.placeholder = "Add todo";
        this.input.name = "todo";
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
        return this.input.value;
    }
    _resetInput() {
        this.input.value = "";
    }
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className)
            element.classList.add(className);
        return element;
    }
    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }
    displayTodos(todos) {
        // Delete all nodes
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }
        // Show default message
        if (todos.length === 0) {
            const p = this.createElement("p");
            p.textContent = "Nothing to do! Add a task?";
            this.todoList.append(p);
        }
        else {
            // Create nodes
            todos.forEach((todo) => {
                const li = this.createElement("li");
                li.id = todo.id;
                const checkbox = this.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = todo.complete;
                const span = this.createElement("span");
                span.contentEditable = "true";
                span.classList.add("editable");
                if (todo.complete) {
                    const strike = this.createElement("s");
                    strike.textContent = todo.text;
                    span.append(strike);
                }
                else {
                    span.textContent = todo.text;
                }
                const deleteButton = this.createElement("button", "delete");
                deleteButton.textContent = "Delete";
                li.append(checkbox, span, deleteButton);
                // Append nodes
                this.todoList.append(li);
            });
        }
        // Debugging
        console.log(todos);
    }
    _initLocalListeners() {
        this.todoList.addEventListener("input", (event) => {
            if (event.target.className === "editable") {
                this._temporaryTodoText = event.target.innerText;
            }
        });
    }
    bindAddTodo(handler) {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (this._todoText) {
                handler(this._todoText);
                this._resetInput();
            }
        });
    }
    bindDeleteTodo(handler) {
        this.todoList.addEventListener("click", (event) => {
            if (event.target.className === "delete") {
                const id = event.target.parentElement.id;
                handler(id);
            }
        });
    }
    bindEditTodo(handler) {
        this.todoList.addEventListener("focusout", (event) => {
            if (this._temporaryTodoText) {
                const id = event.target.parentElement.id;
                handler(id, this._temporaryTodoText);
                this._temporaryTodoText = "";
            }
        });
    }
    bindToggleTodo(handler) {
        this.todoList.addEventListener("change", (event) => {
            if (event.target.type === "checkbox") {
                const id = event.target.parentElement.id;
                handler(id);
            }
        });
    }
}


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_todo_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/todo.controller */ "./controllers/todo.controller.ts");
/* harmony import */ var _views_todo_views__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views/todo.views */ "./views/todo.views.ts");
/* harmony import */ var _services_todo_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/todo.service */ "./services/todo.service.ts");



const app = new _controllers_todo_controller__WEBPACK_IMPORTED_MODULE_0__.TodoController(new _services_todo_service__WEBPACK_IMPORTED_MODULE_2__.TodoService(), new _views_todo_views__WEBPACK_IMPORTED_MODULE_1__.TodoView());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztnQkFFTCxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDZCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7Ozs7Ozs7VUM1SkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0M1QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7OztBQ04rRDtBQUNqQjtBQUNRO0FBQ3RELE1BQU0sR0FBRyxHQUFHLElBQUksd0VBQWMsQ0FBQyxJQUFJLCtEQUFXLEVBQUUsRUFBRSxJQUFJLHVEQUFRLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29udHJvbGxlcnMvdG9kby5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL21vZGVscy90b2RvLm1vZGVsLnRzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL3RvZG8uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi92aWV3cy90b2RvLnZpZXdzLnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb2RvU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy90b2RvLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVG9kb1ZpZXcgfSBmcm9tIFwiLi4vdmlld3MvdG9kby52aWV3c1wiO1xyXG5pbXBvcnQgeyBUb2RvIH0gZnJvbSBcIi4uL21vZGVscy90b2RvLm1vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVG9kb0NvbnRyb2xsZXIge1xyXG4gIHByaXZhdGUgc2VydmljZTogVG9kb1NlcnZpY2U7XHJcbiAgcHJpdmF0ZSB2aWV3OiBUb2RvVmlldztcclxuXHJcbiAgY29uc3RydWN0b3Ioc2VydmljZTogVG9kb1NlcnZpY2UsIHZpZXc6IFRvZG9WaWV3KSB7XHJcbiAgICB0aGlzLnNlcnZpY2UgPSBzZXJ2aWNlO1xyXG4gICAgdGhpcy52aWV3ID0gdmlldztcclxuXHJcbiAgICAvLyBFeHBsaWNpdCB0aGlzIGJpbmRpbmdcclxuICAgIHRoaXMuc2VydmljZS5iaW5kVG9kb0xpc3RDaGFuZ2VkKHRoaXMub25Ub2RvTGlzdENoYW5nZWQpO1xyXG4gICAgdGhpcy52aWV3LmJpbmRBZGRUb2RvKHRoaXMuaGFuZGxlQWRkVG9kbyk7XHJcbiAgICB0aGlzLnZpZXcuYmluZEVkaXRUb2RvKHRoaXMuaGFuZGxlRWRpdFRvZG8pO1xyXG4gICAgdGhpcy52aWV3LmJpbmREZWxldGVUb2RvKHRoaXMuaGFuZGxlRGVsZXRlVG9kbyk7XHJcbiAgICB0aGlzLnZpZXcuYmluZFRvZ2dsZVRvZG8odGhpcy5oYW5kbGVUb2dnbGVUb2RvKTtcclxuXHJcbiAgICAvLyBEaXNwbGF5IGluaXRpYWwgdG9kb3NcclxuICAgIHRoaXMub25Ub2RvTGlzdENoYW5nZWQodGhpcy5zZXJ2aWNlLnRvZG9zKTtcclxuICB9XHJcblxyXG4gIG9uVG9kb0xpc3RDaGFuZ2VkID0gKHRvZG9zOiBUb2RvW10pOiB2b2lkID0+IHtcclxuICAgIHRoaXMudmlldy5kaXNwbGF5VG9kb3ModG9kb3MpO1xyXG4gIH07XHJcblxyXG4gIGhhbmRsZUFkZFRvZG8gPSAodG9kb1RleHQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5zZXJ2aWNlLmFkZFRvZG8odG9kb1RleHQpO1xyXG4gIH07XHJcblxyXG4gIGhhbmRsZUVkaXRUb2RvID0gKGlkOiBzdHJpbmcsIHRvZG9UZXh0OiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuc2VydmljZS5lZGl0VG9kbyhpZCwgdG9kb1RleHQpO1xyXG4gIH07XHJcblxyXG4gIGhhbmRsZURlbGV0ZVRvZG8gPSAoaWQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5zZXJ2aWNlLmRlbGV0ZVRvZG8oaWQpO1xyXG4gIH07XHJcblxyXG4gIGhhbmRsZVRvZ2dsZVRvZG8gPSAoaWQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5zZXJ2aWNlLnRvZ2dsZVRvZG8oaWQpO1xyXG4gIH07XHJcbn1cclxuIiwiaW50ZXJmYWNlIFRvZG9EVE8ge1xyXG4gIHRleHQ/OiBzdHJpbmc7XHJcbiAgY29tcGxldGU/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVG9kbyB7XHJcbiAgcHVibGljIGlkOiBzdHJpbmc7XHJcbiAgcHVibGljIHRleHQ6IHN0cmluZztcclxuICBwdWJsaWMgY29tcGxldGU6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHsgdGV4dCwgY29tcGxldGUgfTogVG9kb0RUTyA9IHsgY29tcGxldGU6IGZhbHNlIH0pIHtcclxuICAgIHRoaXMuaWQgPSB0aGlzLnV1aWR2NCgpO1xyXG4gICAgdGhpcy50ZXh0ID0gdGV4dCBhcyBzdHJpbmc7XHJcbiAgICB0aGlzLmNvbXBsZXRlID0gY29tcGxldGUgYXMgYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIHV1aWR2NCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICgoWzFlN10gYXMgYW55KSArIC0xZTMgKyAtNGUzICsgLThlMyArIC0xZTExKS5yZXBsYWNlKFxyXG4gICAgICAvWzAxOF0vZyxcclxuICAgICAgKGM6IG51bWJlcikgPT5cclxuICAgICAgICAoXHJcbiAgICAgICAgICBjIF5cclxuICAgICAgICAgIChjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoYyAvIDQpKSlcclxuICAgICAgICApLnRvU3RyaW5nKDE2KSxcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFRvZG8gfSBmcm9tIFwiLi4vbW9kZWxzL3RvZG8ubW9kZWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUb2RvU2VydmljZSB7XHJcbiAgcHVibGljIHRvZG9zOiBUb2RvW107XHJcbiAgcHJpdmF0ZSBvblRvZG9MaXN0Q2hhbmdlZDogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMudG9kb3MgPSAoSlNPTi5wYXJzZSg8c3RyaW5nPmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9kb3NcIikpIHx8IFtdKS5tYXAoXHJcbiAgICAgICh0b2RvOiBUb2RvKSA9PiBuZXcgVG9kbyh0b2RvKSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBiaW5kVG9kb0xpc3RDaGFuZ2VkKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvZG9MaXN0Q2hhbmdlZCA9IGNhbGxiYWNrO1xyXG4gIH1cclxuXHJcbiAgX2NvbW1pdCh0b2RvczogVG9kb1tdKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG9kb0xpc3RDaGFuZ2VkKHRvZG9zKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9kb3NcIiwgSlNPTi5zdHJpbmdpZnkodG9kb3MpKTtcclxuICB9XHJcblxyXG4gIGFkZFRvZG8odGV4dDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnRvZG9zLnB1c2gobmV3IFRvZG8oeyB0ZXh0IH0pKTtcclxuXHJcbiAgICB0aGlzLl9jb21taXQodGhpcy50b2Rvcyk7XHJcbiAgfVxyXG5cclxuICBlZGl0VG9kbyhpZDogc3RyaW5nLCB1cGRhdGVkVGV4dDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnRvZG9zID0gdGhpcy50b2Rvcy5tYXAoKHRvZG8pID0+XHJcbiAgICAgIHRvZG8uaWQgPT09IGlkXHJcbiAgICAgICAgPyBuZXcgVG9kbyh7XHJcbiAgICAgICAgICAgIC4uLnRvZG8sXHJcbiAgICAgICAgICAgIHRleHQ6IHVwZGF0ZWRUZXh0LFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICA6IHRvZG8sXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2NvbW1pdCh0aGlzLnRvZG9zKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZVRvZG8oX2lkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMudG9kb3MgPSB0aGlzLnRvZG9zLmZpbHRlcigoeyBpZCB9KSA9PiBpZCAhPT0gX2lkKTtcclxuXHJcbiAgICB0aGlzLl9jb21taXQodGhpcy50b2Rvcyk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVUb2RvKF9pZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnRvZG9zID0gdGhpcy50b2Rvcy5tYXAoKHRvZG8pID0+XHJcbiAgICAgIHRvZG8uaWQgPT09IF9pZCA/IG5ldyBUb2RvKHsgLi4udG9kbywgY29tcGxldGU6ICF0b2RvLmNvbXBsZXRlIH0pIDogdG9kbyxcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fY29tbWl0KHRoaXMudG9kb3MpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBUb2RvIH0gZnJvbSBcIi4uL21vZGVscy90b2RvLm1vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVG9kb1ZpZXcge1xyXG4gIHB1YmxpYyBhcHA6IEhUTUxFbGVtZW50O1xyXG4gIHB1YmxpYyBmb3JtOiBIVE1MRWxlbWVudDtcclxuICBwdWJsaWMgaW5wdXQ6IEhUTUxFbGVtZW50O1xyXG4gIHB1YmxpYyBzdWJtaXRCdXR0b246IEhUTUxFbGVtZW50O1xyXG4gIHB1YmxpYyB0aXRsZTogSFRNTEVsZW1lbnQ7XHJcbiAgcHVibGljIHRvZG9MaXN0OiBIVE1MRWxlbWVudDtcclxuICBwdWJsaWMgX3RlbXBvcmFyeVRvZG9UZXh0OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5hcHAgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50KFwiI3Jvb3RcIik7XHJcbiAgICB0aGlzLmZvcm0gPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xyXG4gICAgdGhpcy5pbnB1dCA9IHRoaXMuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgKHRoaXMuaW5wdXQgYXMgSFRNTElucHV0RWxlbWVudCkudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgKHRoaXMuaW5wdXQgYXMgSFRNTElucHV0RWxlbWVudCkucGxhY2Vob2xkZXIgPSBcIkFkZCB0b2RvXCI7XHJcbiAgICAodGhpcy5pbnB1dCBhcyBIVE1MSW5wdXRFbGVtZW50KS5uYW1lID0gXCJ0b2RvXCI7XHJcbiAgICB0aGlzLnN1Ym1pdEJ1dHRvbiA9IHRoaXMuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHRoaXMuc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gXCJTdWJtaXRcIjtcclxuICAgIHRoaXMuZm9ybS5hcHBlbmQodGhpcy5pbnB1dCwgdGhpcy5zdWJtaXRCdXR0b24pO1xyXG4gICAgdGhpcy50aXRsZSA9IHRoaXMuY3JlYXRlRWxlbWVudChcImgxXCIpO1xyXG4gICAgdGhpcy50aXRsZS50ZXh0Q29udGVudCA9IFwiVG9kb3NcIjtcclxuICAgIHRoaXMudG9kb0xpc3QgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCBcInRvZG8tbGlzdFwiKTtcclxuICAgIHRoaXMuYXBwLmFwcGVuZCh0aGlzLnRpdGxlLCB0aGlzLmZvcm0sIHRoaXMudG9kb0xpc3QpO1xyXG5cclxuICAgIHRoaXMuX3RlbXBvcmFyeVRvZG9UZXh0ID0gXCJcIjtcclxuICAgIHRoaXMuX2luaXRMb2NhbExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IF90b2RvVGV4dCgpIHtcclxuICAgIHJldHVybiAodGhpcy5pbnB1dCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcclxuICB9XHJcblxyXG4gIF9yZXNldElucHV0KCkge1xyXG4gICAgKHRoaXMuaW5wdXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSBcIlwiO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRWxlbWVudCh0YWc6IHN0cmluZywgY2xhc3NOYW1lPzogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG5cclxuICAgIGlmIChjbGFzc05hbWUpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG5cclxuICAgIHJldHVybiBlbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0RWxlbWVudChzZWxlY3Rvcjogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcblxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5VG9kb3ModG9kb3M6IFRvZG9bXSkge1xyXG4gICAgLy8gRGVsZXRlIGFsbCBub2Rlc1xyXG4gICAgd2hpbGUgKHRoaXMudG9kb0xpc3QuZmlyc3RDaGlsZCkge1xyXG4gICAgICB0aGlzLnRvZG9MaXN0LnJlbW92ZUNoaWxkKHRoaXMudG9kb0xpc3QuZmlyc3RDaGlsZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2hvdyBkZWZhdWx0IG1lc3NhZ2VcclxuICAgIGlmICh0b2Rvcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgY29uc3QgcCA9IHRoaXMuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgIHAudGV4dENvbnRlbnQgPSBcIk5vdGhpbmcgdG8gZG8hIEFkZCBhIHRhc2s/XCI7XHJcbiAgICAgIHRoaXMudG9kb0xpc3QuYXBwZW5kKHApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gQ3JlYXRlIG5vZGVzXHJcbiAgICAgIHRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcclxuICAgICAgICBjb25zdCBsaTogSFRNTEVsZW1lbnQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICAgICAgICBsaS5pZCA9IHRvZG8uaWQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gdGhpcy5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgKGNoZWNrYm94IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnR5cGUgPSBcImNoZWNrYm94XCI7XHJcbiAgICAgICAgKGNoZWNrYm94IGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQgPSB0b2RvLmNvbXBsZXRlO1xyXG5cclxuICAgICAgICBjb25zdCBzcGFuOiBIVE1MRWxlbWVudCA9IHRoaXMuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgKHNwYW4gYXMgSFRNTFNwYW5FbGVtZW50KS5jb250ZW50RWRpdGFibGUgPSBcInRydWVcIjtcclxuICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoXCJlZGl0YWJsZVwiKTtcclxuXHJcbiAgICAgICAgaWYgKHRvZG8uY29tcGxldGUpIHtcclxuICAgICAgICAgIGNvbnN0IHN0cmlrZTogSFRNTEVsZW1lbnQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJzXCIpO1xyXG4gICAgICAgICAgc3RyaWtlLnRleHRDb250ZW50ID0gdG9kby50ZXh0O1xyXG4gICAgICAgICAgc3Bhbi5hcHBlbmQoc3RyaWtlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3Bhbi50ZXh0Q29udGVudCA9IHRvZG8udGV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbjogSFRNTEVsZW1lbnQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgICAgICBcImJ1dHRvblwiLFxyXG4gICAgICAgICAgXCJkZWxldGVcIixcclxuICAgICAgICApO1xyXG4gICAgICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVsZXRlXCI7XHJcbiAgICAgICAgbGkuYXBwZW5kKGNoZWNrYm94LCBzcGFuLCBkZWxldGVCdXR0b24pO1xyXG5cclxuICAgICAgICAvLyBBcHBlbmQgbm9kZXNcclxuICAgICAgICB0aGlzLnRvZG9MaXN0LmFwcGVuZChsaSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERlYnVnZ2luZ1xyXG4gICAgY29uc29sZS5sb2codG9kb3MpO1xyXG4gIH1cclxuXHJcbiAgX2luaXRMb2NhbExpc3RlbmVycygpOiB2b2lkIHtcclxuICAgIHRoaXMudG9kb0xpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChldmVudCkgPT4ge1xyXG4gICAgICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS5jbGFzc05hbWUgPT09IFwiZWRpdGFibGVcIikge1xyXG4gICAgICAgIHRoaXMuX3RlbXBvcmFyeVRvZG9UZXh0ID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS5pbm5lclRleHQ7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYmluZEFkZFRvZG8oaGFuZGxlcjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuX3RvZG9UZXh0KSB7XHJcbiAgICAgICAgaGFuZGxlcih0aGlzLl90b2RvVGV4dCk7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRJbnB1dCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGJpbmREZWxldGVUb2RvKGhhbmRsZXI6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLnRvZG9MaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkuY2xhc3NOYW1lID09PSBcImRlbGV0ZVwiKSB7XHJcbiAgICAgICAgY29uc3QgaWQ6IHN0cmluZyA9IChcclxuICAgICAgICAgIChldmVudC50YXJnZXQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpLnBhcmVudEVsZW1lbnQgYXMgSFRNTEVsZW1lbnRcclxuICAgICAgICApLmlkO1xyXG5cclxuICAgICAgICBoYW5kbGVyKGlkKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBiaW5kRWRpdFRvZG8oaGFuZGxlcjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIHRoaXMudG9kb0xpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIChldmVudCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fdGVtcG9yYXJ5VG9kb1RleHQpIHtcclxuICAgICAgICBjb25zdCBpZDogc3RyaW5nID0gKFxyXG4gICAgICAgICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MQnV0dG9uRWxlbWVudCkucGFyZW50RWxlbWVudCBhcyBIVE1MRWxlbWVudFxyXG4gICAgICAgICkuaWQ7XHJcblxyXG4gICAgICAgIGhhbmRsZXIoaWQsIHRoaXMuX3RlbXBvcmFyeVRvZG9UZXh0KTtcclxuICAgICAgICB0aGlzLl90ZW1wb3JhcnlUb2RvVGV4dCA9IFwiXCI7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYmluZFRvZ2dsZVRvZG8oaGFuZGxlcjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIHRoaXMudG9kb0xpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XHJcbiAgICAgICAgY29uc3QgaWQ6IHN0cmluZyA9IChcclxuICAgICAgICAgIChldmVudC50YXJnZXQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpLnBhcmVudEVsZW1lbnQgYXMgSFRNTEVsZW1lbnRcclxuICAgICAgICApLmlkO1xyXG5cclxuICAgICAgICBoYW5kbGVyKGlkKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBUb2RvQ29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJzL3RvZG8uY29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBUb2RvVmlldyB9IGZyb20gXCIuL3ZpZXdzL3RvZG8udmlld3NcIjtcclxuaW1wb3J0IHsgVG9kb1NlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy90b2RvLnNlcnZpY2VcIjtcclxuY29uc3QgYXBwID0gbmV3IFRvZG9Db250cm9sbGVyKG5ldyBUb2RvU2VydmljZSgpLCBuZXcgVG9kb1ZpZXcoKSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==