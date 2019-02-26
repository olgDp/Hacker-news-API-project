import React, { Component } from "react";
import Button from "../Button";
import { sortBy } from "lodash";
import SortButton from "../SortButton";

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, "title"),
  AUTHOR: list => sortBy(list, "author"),
  COMMENTS: list => sortBy(list, "num_comments").reverse(),
  POINTS: list => sortBy(list, "points").reverse()
};

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: "NONE",
      isSortReverse: false
    };
  }

  onSort = sortKey => {
    const isSortReverse =
      this.state.sortKey === sortKey && !this.state.isSortReverse;

    this.setState({ sortKey, isSortReverse });
  };

  render() {
    const { list, onDismiss } = this.props;
    const { sortKey, isSortReverse } = this.state;

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">
              <SortButton
                sortKey={"TITLE"}
                onSort={this.onSort}
                activeSortKey={sortKey}
              >
                Title&nbsp;↑↓
              </SortButton>
            </th>
            <th scope="col">
              <SortButton
                sortKey={"AUTHOR"}
                onSort={this.onSort}
                activeSortKey={sortKey}
              >
                Author&nbsp;↑↓
              </SortButton>
            </th>
            <th scope="col">
              <SortButton
                sortKey={"COMMENTS"}
                onSort={this.onSort}
                activeSortKey={sortKey}
              >
                Comments&nbsp;↑↓
              </SortButton>
            </th>
            <th scope="col">
              <SortButton
                sortKey={"POINTS"}
                onSort={this.onSort}
                activeSortKey={sortKey}
              >
                Points&nbsp;↑↓
              </SortButton>
            </th>
            <th scope="col">Archive</th>
          </tr>
        </thead>
        <tbody>
          {reverseSortedList.map(
            ({ objectID, url, title, author, num_comments, points }) => {
              return (
                <tr key={objectID}>
                  <th scope="row">
                    <a href={url}>{title}</a>
                  </th>
                  <td>{author}</td>
                  <td>{num_comments}</td>
                  <td>{points}</td>
                  <td>
                    <Button
                      onClick={() => onDismiss(objectID)}
                      type="button"
                      className="btn btn-secondary"
                    >
                      remove
                    </Button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    );
  }
}

export default Table;
