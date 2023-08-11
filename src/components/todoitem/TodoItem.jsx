import React, { Component } from "react";
import { TodoConsumer } from "../../context";
import "./todoitem_style.scss";

class TodoItem extends Component {
  state = {
    isEditing: false,
    editText: "",
    editTitle: "",
  };

  handleEditInputChange = (event) => {
    this.setState({ editText: event.target.value });
  };

  handleEditTitleChange = (event) => {
    this.setState({ editTitle: event.target.value });
  };

  handleCheckboxChange = (dispatch, id, completed) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  handleArchiveChange = (dispatch, id) => {
    dispatch({ type: "ARCHIVE_TODO", payload: id });
  };

  startEdit = () => {
    this.setState({
      isEditing: true,
      editText: this.props.text,
      editTitle: this.props.title,
    });
  };

  cancelEdit = () => {
    this.setState({ isEditing: false, editText: "", editTitle: "" });
  };

  saveEdit = (dispatch, todoId) => {
    if (
      this.state.editText.trim() !== "" ||
      this.state.editTitle.trim() !== ""
    ) {
      dispatch({
        type: "EDIT_TODO",
        payload: {
          id: todoId,
          title: this.state.editTitle,
          text: this.state.editText,
        },
      });
    }
    this.setState({ isEditing: false, editText: "", editTitle: "" });
  };

  render() {
    const { id, text, title, completed, archived } = this.props;

    return (
      <TodoConsumer>
        {({ dispatch }) => (
          <li key={id} className={`todo-item ${archived ? "archived" : ""}`}>
            <div className="paren">
              <div className="todo-info">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() =>
                    this.handleCheckboxChange(dispatch, id, completed)
                  }
                />
                {this.state.isEditing ? (
                  <>
                    <input
                      type="text"
                      value={this.state.editTitle}
                      onChange={this.handleEditTitleChange}
                    />
                    <input
                      type="text"
                      value={this.state.editText}
                      onChange={this.handleEditInputChange}
                    />
                  </>
                ) : (
                  <>
                    <label>Title: {title}</label>
                    <label>Description: {text}</label>
                  </>
                )}
              </div>
              <div className="btn-container">
                {this.state.isEditing ? (
                  <>
                    <button className="save-button" onClick={() => this.saveEdit(dispatch, id)}>
                      Save
                    </button>
                    <button className="cancel-button" onClick={this.cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="edit-button" onClick={this.startEdit}>Edit</button>
                    <button className="remove-button" onClick={() => dispatch({ type: "REMOVE_TODO", payload: id })}>
                      Remove
                    </button>
                  </>
                )}
                <button
                  className={`archive-button ${archived ? "unarchive" : "archive"}`}
                  onClick={() =>
                    dispatch({
                      type: "ARCHIVE_TODO",
                      payload: id,
                    })
                  }
                >
                  {archived ? "Unarchive" : "Archive"}
                </button>
              </div>
            </div>
          </li>
        )}
      </TodoConsumer>
    );
  }
}

export default TodoItem;
