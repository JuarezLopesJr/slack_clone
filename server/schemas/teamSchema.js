export default `
  type Team {
    id: String!
    name: String!
    members: [User!]!
    owner: User!
    channels: [Channel!]!
  }
`;
