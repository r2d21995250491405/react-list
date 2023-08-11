// src/context.js
import React, { createContext, Component } from "react";

const TodoContext = createContext();

class TodoProvider extends Component {
  state = {
    todos: JSON.parse(localStorage.getItem("todos")) || [],
  };

  todoReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TODO":
        const updatedTodosAdd = [...state.todos, action.payload];
        localStorage.setItem("todos", JSON.stringify(updatedTodosAdd));
        return {
          todos: updatedTodosAdd,
        };
      case "EDIT_TODO":
        const updatedTodosEdit = state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                text: action.payload.text,
                title: action.payload.title,
              }
            : todo
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodosEdit));
        return {
          todos: updatedTodosEdit,
        };
      case "TOGGLE_TODO":
        const updatedTodosToggle = state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodosToggle));
        return {
          todos: updatedTodosToggle,
        };
      case "ARCHIVE_TODO":
        const updatedTodosArchive = state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, archived: !todo.archived }
            : todo
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodosArchive));
        return {
          todos: updatedTodosArchive,
        };
      case "REMOVE_TODO":
        const updatedTodosRemove = state.todos.filter(
          (todo) => todo.id !== action.payload
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodosRemove));
        return {
          todos: updatedTodosRemove,
        };
      default:
        return state;
    }
  };

  dispatch = (action) => {
    this.setState((prevState) => this.todoReducer(prevState, action));
  };

  render() {
    return (
      <TodoContext.Provider
        value={{ state: this.state, dispatch: this.dispatch }}
      >
        {this.props.children}
      </TodoContext.Provider>
    );
  }
}

const TodoConsumer = TodoContext.Consumer;

export { TodoProvider, TodoConsumer };
