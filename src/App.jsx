import React, { Component } from "react";
import { TodoProvider } from "./context";
import TodoList from "./components/todolist/TodoList";
import "./App.scss";
import ThemeSwitcher from "./components/themeswitch/ThemeSwitcher";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light", 
    };
  }

  toggleTheme = () => {
    this.setState((prevState) => ({
      theme: prevState.theme === "light" ? "dark" : "light",
    }));
  };

  render() {
    const { theme } = this.state;
    return (
      <TodoProvider>
        <div className={`container ${theme}-theme`}>
          <ThemeSwitcher theme={theme} toggleTheme={this.toggleTheme} />
          <h1>Todo List</h1>
          <TodoList />
        </div>
      </TodoProvider>
    );
  }
}

export default App;
