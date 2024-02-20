import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation CreateUser($input: createUserInput) {
  createUser(input: $input) {
    email
  }
}
`
export const SIGNIN_USER = gql`
mutation Login($input: loginInput) {
  login(input: $input){
    accessToken
    active
    isVerified
    roll
  }
}
`
export const USER_VERIFICATION = gql`
mutation UserVerification($input: verificationInput) {
  userVerification(input: $input) {
    isVerified  
  }
}`

export const SEND_FORGOT_PASSWORD_MAIL = gql`
mutation SendForgotPasswordMail($email: String!) {
  sendForgotPasswordMail(email: $email) {
    status
  }
}`

export const FORGOT_PASSWORD = gql`
mutation ForgotPassword($input: forgotPasswordInput!) {
  forgotPassword(input: $input) {
    status
  }
}`

export const CREATE_POST = gql`
mutation CreatePost($input: createPostInput) {
  createPost(input: $input) {
    title
    description
    createdBy
  }
}`

export const UPDATE_POST = gql`
mutation UpdatePost($input: updatePostInput) {
  updatePost(input: $input) {
    _id
    title
    description
    createdBy
  }
}`

export const DELETE_POST = gql`
mutation DeletePost($id: ID!) {
  deletePost(_id: $id) {
    message
  }
}`

export const UPDATE_USER = gql`
mutation UpdateUserByAdmin($input: updateUserByAdminInput) {
  updateUserByAdmin (input: $input){
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

export const DELETE_USER = gql`
mutation DeleteUserByAdmin($id: ID!) {
  deleteUserByAdmin(_id: $id) {
    message
  }
}`

export const UPLOAD_PROFILE = gql`
mutation UploadProfilePhoto($input: UploadProfilePhotoInput!) {
  uploadProfilePhoto(input: $input)
}`

export const CHANGE_PASSWORD = gql`
mutation ChangePassword($input: changePasswordInput) {
  changePassword(input: $input)
}`

export const TOKEN_VERIFICATION = gql`
mutation TokenVerification($token: String!) {
  tokenVerification(token: $token)
}`