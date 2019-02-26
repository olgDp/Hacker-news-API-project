import React from "react";
import Button from "../Button";
import classNames from "classnames";

const SortButton = ({ sortKey, activeSortKey, onSort, children }) => {
  const sortClass = classNames(
    "btn btn-sm",
    { "btn-success": sortKey === activeSortKey },
    { "btn-secondary": sortKey !== activeSortKey }
  );

  return (
    <Button onClick={() => onSort(sortKey)} className={sortClass}>
      {children}
    </Button>
  );
};

export default SortButton;
