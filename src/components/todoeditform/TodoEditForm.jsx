// src/components/TodoEditForm.js
import React, { Component } from 'react';

class TodoEditForm extends Component {
  state = {
    editText: this.props.text,
  };

  handleEditInputChange = event => {
    this.setState({ editText: event.target.value });
  };

  render() {
    const { id, text, onSave, onCancel } = this.props;

    return (
      <div>
        <input
          type="text"
          value={this.state.editText}
          onChange={this.handleEditInputChange}
        />
        <button onClick={() => onSave(id, this.state.editText)}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    );
  }
}

export default TodoEditForm;
