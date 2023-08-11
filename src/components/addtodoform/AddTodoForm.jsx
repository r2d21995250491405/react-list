import React, { Component } from "react";
import "./addtodo_style.scss";

class AddTodoForm extends Component {
  state = {
    newTodoText: "",
    newTodoTitle: "",
  };

  handleInputChange = (event) => {
    this.setState({ newTodoText: event.target.value });
  };

  handleTitleChange = (event) => {
    this.setState({ newTodoTitle: event.target.value });
  };

  addTodo = (dispatch) => {
    const { newTodoText, newTodoTitle } = this.state;
    if (newTodoText.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: newTodoText,
        title: newTodoTitle,
        completed: false,
        archived: false,
      };
      dispatch({ type: "ADD_TODO", payload: newTodo });
      this.setState({ newTodoText: "", newTodoTitle: "" });
    }
  };

  render() {
    return (
      <div className="add-todo-form">
        <input
          className="add-todo-input"
          type="text"
          placeholder="Enter description"
          value={this.state.newTodoText}
          onChange={this.handleInputChange}
        />
        <input
          className="add-todo-input"
          type="text"
          placeholder="Enter title"
          value={this.state.newTodoTitle}
          onChange={this.handleTitleChange}
        />
        <button
          className="add-todo-button"
          onClick={() => this.addTodo(this.props.dispatch)}
        >
          Add Todo
        </button>
      </div>
    );
  }
}

export default AddTodoForm;
