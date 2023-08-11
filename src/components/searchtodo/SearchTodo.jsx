import React, { Component } from "react";
import './searchtodo_style.scss'

class SearchTodo extends Component {
  state = {
    searchQuery: "",
  };

  

  handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    this.setState({ searchQuery });
    this.props.onSearch(searchQuery); 
    
  };

  render() {
    return (
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Tasks by Title"
          value={this.state.searchQuery}
          onChange={this.handleSearchChange}
        />
      </div>
    );
  }
}

export default SearchTodo;
