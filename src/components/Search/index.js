import React, { Component } from "react";

class Search extends Component {
  state = {
    value: ""
  };

  componentDidMount() {
    this.refs.input.focus();
  }

  onInputChange = e => {
    const { value } = e.target;

    this.setState({
      value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { onSearchSubmit } = this.props;

    onSearchSubmit(this.state.value);
  };

  render() {
    const { value } = this.state;

    return (
      <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
        <input
          className="form-control mr-sm-2"
          style={{ width: "400px" }}
          type="text"
          onChange={this.onInputChange}
          value={value}
          ref="input"
        />
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    );
  }
}

export default Search;
