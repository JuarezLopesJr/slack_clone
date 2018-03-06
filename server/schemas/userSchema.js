export default `

  type User {
    _id: String!
    username: String!
    email: String!
    password: String!
    teams: [Team]!
  }

  type Query {
    allUsers:[User]!
    getUser(id: String!): User!
  }

  type Mutation {
    registerUser(
      username: String!,
      email: String!,
      password: String!
    ):User!
  }
`;
