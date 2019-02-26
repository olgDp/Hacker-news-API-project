import React from "react";
import Search from "../Search";

const Header = ({ onSearchSubmit, resultsKeys }) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light mb-5"
      style={{ justifyContent: "space-between" }}
    >
      <a className="navbar-brand" href="/">
        <strong>Hacker News ...</strong>
      </a>

      <Search resultsKeys={resultsKeys} onSearchSubmit={onSearchSubmit} />
    </nav>
  );
};

export default Header;
