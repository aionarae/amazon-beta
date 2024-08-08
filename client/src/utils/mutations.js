import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($username: String!, $email: String!, $password: String!) {
        login( username: $username, email: $email, password: $password) {
        token
        user {
            _id
            email
        }
        }
    }
    `;

export const CREATE_USER = gql`
    mutation createUser( $username: String!, $email: String!, $password: String!) {
        createUser( username: $username, email: $email, password: $password) {
        token
        user {
            _id
            email
        }
        }
    }
    `;