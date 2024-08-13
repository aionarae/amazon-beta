import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      _id
      email
      username
      role
      status
      created_at
    }
  }
`;