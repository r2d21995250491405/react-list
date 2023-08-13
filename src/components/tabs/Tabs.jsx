import React, { Component } from "react";
import "./tabs_style.scss";

class TabsComponent extends Component {
  state = {
    activeTab: "active",
  };
  

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab });
    this.props.onTabChange(tab);
  };

  render() {
    const { activeTab } = this.state;
    const themeClass = this.props.theme === "dark" ? "dark-theme" : "light-theme";

    return (
      <div className={`tabs-container ${themeClass}`}>
        <button
          className={`tab-button ${activeTab === "all" ? "active" : ""}`}
          onClick={() => this.handleTabChange("all")}
        >
          All
        </button>
        <button
          className={`tab-button ${activeTab === "active" ? "active" : ""}`}
          onClick={() => this.handleTabChange("active")}
        >
          Active Tasks
        </button>
        <button
          className={`tab-button ${activeTab === "incomplete" ? "active" : ""}`}
          onClick={() => this.handleTabChange("incomplete")}
        >
          Incomplete Tasks
        </button>
        <button
          className={`tab-button ${activeTab === "archive" ? "active" : ""}`}
          onClick={() => this.handleTabChange("archive")}
        >
          Archive
        </button>
      </div>
    );
  }
}

export default TabsComponent;
