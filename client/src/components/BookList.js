import React from "react";
import { graphql } from "@apollo/client/react/hoc";
import {getBooksQuery} from '../Queries/queries'
 

const BoolList = (props) => {
  const displayBooks = () => {
    let data = props.data;
    if (data.loading) {
      return <div>Loading Books</div>;
    } else {
      return data.books.map((book) => {
        return <li key={book.id}>{book.name}</li>;
      });
    }
  };

  return <div id="book-list">{displayBooks()}</div>;
};

export default graphql(getBooksQuery)(BoolList);
