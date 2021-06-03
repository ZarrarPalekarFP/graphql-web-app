import { gql } from "apollo-boost";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const addAuthorMutation = gql`
  mutation ($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
      name
    }
  }
`;

export { getAuthorsQuery, addAuthorMutation };
