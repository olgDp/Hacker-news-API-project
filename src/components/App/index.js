import React, { Component } from "react";
import axios from "axios";
// import "./App.css";
import Table from "../Table";
import Header from "../Header";
import Button from "../Button";
import ErrorPage from "../ErrorPage";
import Loading from "../Loading";

import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from "../../constants";

const withLoading = Component => ({ isLoading, ...rest }) => {
  return isLoading ? <Loading /> : <Component {...rest} />;
};

const ButtonWithLoading = withLoading(Button);

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: "",
      searchTerm: DEFAULT_QUERY,
      error: null,
      loading: false
    };
  }

  componentDidMount() {
    this._isMounted = true;

    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    this.setState({ loading: true });

    axios(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  };

  setSearchTopStories = result => {
    const { hits, page } = result;

    this.setState(prevState => {
      const { searchKey, results } = prevState;

      const oldHits =
        results && results[searchKey] ? results[searchKey].hits : [];

      const updatedHits = [...oldHits, ...hits];

      return {
        results: {
          ...results,
          [searchKey]: { hits: updatedHits, page }
        },
        loading: false
      };
    });
  };

  onSearchSubmit = searchTerm => {
    this.setState({ searchKey: searchTerm });

    const keys = Object.keys(this.state.results);
    // Проверяем есть ли новый поисковый запрос в списке сохраненных в кеш
    if (keys.indexOf(searchTerm) === -1) {
      this.fetchSearchTopStories(searchTerm);
    }
  };

  onDismiss = id => {
    const { results, searchKey } = this.state;
    const { hits, page } = results[searchKey];

    const updatedHits = hits.filter(({ objectID }) => id !== objectID);
    const newResults = { ...results, [searchKey]: { hits: updatedHits, page } };

    this.setState({ results: newResults });
  };

  render() {
    const { results, searchKey, error, loading } = this.state;

    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;

    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];

    // console.log(results);

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <ErrorPage />;
    }

    // Заменить на лоадинг
    if (!results) {
      return null;
    }

    return (
      <div className="container">
        <Header
          resultsKeys={Object.keys(results)}
          onSearchSubmit={this.onSearchSubmit}
        />

        <Table list={list} onDismiss={this.onDismiss} />

        <ButtonWithLoading
          isLoading={loading}
          className="btn btn-lg btn-success mb-5"
          onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
        >
          <strong>More posts →</strong>
        </ButtonWithLoading>
        {/* <Button
          className="btn btn-lg btn-success mb-5"
          onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
        >
          <strong>More posts →</strong>
        </Button> */}
      </div>
    );
  }
}

export default App;
