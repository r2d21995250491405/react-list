import React, { Component } from "react";

class ThemeSwitcher extends Component {
  render() {
    const { theme, toggleTheme } = this.props;
    return (
      <div className="theme-switcher">
        <button className="theme-switch-button" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    );
  }
}

export default ThemeSwitcher;
