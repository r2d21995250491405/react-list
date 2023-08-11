import React, { Component } from "react";
import { TodoConsumer } from "../../context";
import TodoItem from "../todoitem/TodoItem";
import TabsComponent from "../tabs/Tabs";
import AddTodoForm from "../addtodoform/AddTodoForm";
import SearchTodo from "../searchtodo/SearchTodo";

import debounce from "lodash.debounce";

class TodoList extends Component {
  state = {
    newTodoText: "",
    newTodoTitle: "",
    activeTab: "active",
  };

  handleInputChange = (event) => {
    this.setState({ newTodoText: event.target.value });
  };

  handleTitleChange = (event) => {
    this.setState({ newTodoTitle: event.target.value });
  };

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab });
  };

  addTodo = (dispatch, text, title) => {
    if (text.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text,
        title,
        completed: false,
        archived: false,
      };
      dispatch({ type: "ADD_TODO", payload: newTodo });
      this.setState({ newTodoText: "", newTodoTitle: "" });
      this.handleTabChange("all");
    }
  };

  handleSearch = (searchText) => {
    this.setState({ newTodoTitle: searchText });
  };

  debouncedFn = debounce(this.handleSearch, 500);

  getFilteredTodos = (todos) => {
    const { activeTab, newTodoTitle } = this.state;

    const filteredByTab = todos.filter((todo) => {
      switch (activeTab) {
        case "all":
          return true;
        case "active":
          return todo.completed;
        case "incomplete":
          return !todo.completed && !todo.archived;
        case "archive":
          return todo.archived;
        default:
          return true;
      }
    });

    return filteredByTab.filter((todo) =>
      todo.title.toLowerCase().includes(newTodoTitle.toLowerCase())
    );
  };

  render() {
    return (
      <TodoConsumer>
        {({ state, dispatch }) => {
          const filteredTodos = this.getFilteredTodos(state.todos);
          return (
            <div>
              <TabsComponent onTabChange={this.handleTabChange} />
              <SearchTodo onSearch={this.debouncedFn} />
              <AddTodoForm dispatch={dispatch} />
              <ul>
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    title={todo.title}
                    completed={todo.completed}
                    archived={todo.archived}
                  />
                ))}
              </ul>
            </div>
          );
        }}
      </TodoConsumer>
    );
  }
}

export default TodoList;
