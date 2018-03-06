export default `
  type Channel {
    id: Int!
    name: String!
    teamid: Int!
    messages: [Messages!]!
    public: Boolean
  }
`;
