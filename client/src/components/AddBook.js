import React, { useState } from "react";
import { graphql,compose } from "@apollo/client/react/hoc";
import {getAuthorsQuery ,addBookMutation} from '../Queries/queries'
const AddBook = (props) => {
   const [name,setName]= useState("")
   const [genre,setGenre]= useState("")
   const [authorid,setAuthorid]= useState("")


  const displayAuthors = () => {
      console.log(props);
    let data = props.data;
    if (data.loading) {
      return <div>Loading Authors</div>;
    } else {
      return data.authors.map((author) => {
        return <option key={author.id} value={author.id} >{author.name}</option>;
      });
    }
  };
  const submitForm =(e) => {
      e.preventDefault();
      console.log(name,genre,authorid);
  }
  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e)=>setName(e.target.value)} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e)=>setGenre(e.target.value)}/>
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e)=>setAuthorid(e.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default  graphql(getAuthorsQuery)(AddBook);
