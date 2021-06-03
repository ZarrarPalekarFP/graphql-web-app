import { gql } from "apollo-boost";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

// https://www.youtube.com/watch?v=ed8SzALpx1Q&t=11649s query variables section 32
const addBookMutation = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const deleteBookMutation = gql`
  mutation ($id: ID!) {
    deleteBook(id: $id) {
      name
    }
  }
`;

const getBookDetailsQuery = gql`
  query ($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
          genre
        }
      }
    }
  }
`;

export {
  getBooksQuery,
  addBookMutation,
  getBookDetailsQuery,
  deleteBookMutation,
};
