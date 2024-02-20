import { gql } from '@apollo/client';

export const GET_ALL_POST = gql`
query GetAllPost {
  getAllPost {
    _id
    title
    description
    createdBy{
        firstName
        lastName
      }
  }
}`

export const GET_ALL_POST_PAGINATED = gql`
query GetPaginatedPosts($input: getPaginatedPostsInput!) {
  getPaginatedPosts(input: $input) {
    docs {
      _id
      title
      description
      createdBy{
        _id
        firstName
        lastName
      }
    }
    totalDocs
    limit
    page
    totalPages
    nextPage
    prevPage
  }
}`

export const GET_POST = gql`
query GetPost($id: ID!) {
  getPost(_id: $id) {
    _id
    title
    description    
  }
}`

export const GET_USERS = gql`
query GetUsersByAdmin {
  getUsersByAdmin {
    _id
    firstName
    lastName
    email
    active
    roll
    gender
    age
    dateofbirth
    hobbies
    createdAt
    updatedAt
  }
}`

export const GET_USERS_PAGINATION = gql`
query GetUsersByAdminPaginated($input: getUsersByAdminPaginatedInput) {
  getUsersByAdminPaginated(input: $input) {
    docs {
      _id
      profile
      firstName
      lastName
      email
      active
      isVerified
      roll
      gender
      age
      dateofbirth
      hobbies
      createdAt
      updatedAt
    }
    totalDocs
    limit
    page
    totalPages
    nextPage
    prevPage
  }
}`

export const GET_POSTS = gql`
query GetAllPostsByAdmin($id: ID!) {
  getAllPostsByAdmin(_id: $id) {
    _id
    title
    description
    createdBy {
      firstName
      lastName
    }
  }
}`

export const GET_POSTS_PAGINATION = gql`
query GetAllPostsByAdminPaginated($input: getAllPostsByAdminPaginatedInput) {
  getAllPostsByAdminPaginated(input: $input) {
    docs {
      _id
      title
      description
      createdBy {
        _id
        firstName
        lastName
      }
    }
    totalDocs
    limit
    page
    totalPages
    nextPage
    prevPage
  }
}`

export const GET_USER = gql`
query GetUserByAdmin($id: ID!) {
  getUserByAdmin(_id: $id) {
    _id
    firstName
    lastName
    email
    active    
    gender
    age
    dateofbirth
    hobbies    
  }
}`

export const USER_PROFILE = gql`
query GetUser {
  getUser {
    _id
    firstName
    lastName
    gender
    roll
    hobbies
    email
    dateofbirth
    age
    createdAt
    updatedAt
  }
}`

export const GET_PROFILE = gql`
query Query {
  getProfilePhoto{
     url
  }
}`

export const GER_USER_INFO = gql`
query GetUser {
  getUser {
    _id
    firstName
    lastName
    gender
    hobbies
    dateofbirth
    age
  }
}`
