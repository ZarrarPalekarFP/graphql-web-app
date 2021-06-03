import React, { useRef, useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";

import {
  addAuthorMutation,
  getAuthorsQuery,
} from "../graphqlQueries/AuthorsQueries";

const AddAuthor = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState();

  const nameInput = useRef();
  const ageInput = useRef();

  const submitForm = () => {
    props.addAuthorMutation({
      variables: {
        name,
        age: parseInt(age, 10),
      },
      refetchQueries: [{ query: getAuthorsQuery }], //to refresh the book list after adding a book
    });
    nameInput.current.value = "";
    ageInput.current.value = "";
  };

  return (
    <form
      id="add-author"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }}
    >
      <div className="field">
        <label>Author name:</label>
        <input
          ref={nameInput}
          required
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label>Author age:</label>
        <input
          ref={ageInput}
          required
          type="number"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
      </div>
      <button type="submit">+</button>
    </form>
  );
};

export default compose(
  graphql(addAuthorMutation, { name: "addAuthorMutation" })
)(AddAuthor);
