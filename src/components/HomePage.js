import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, Loader } from 'semantic-ui-react';

const getAllUsers = gql`
  {
    allUsers {
      username
    }
  }
`;

const Home = ({ data: { loading, allUsers } }) => {
  return loading ? (
    <Loader
      active
      inline="centered"
      size="big"
      style={{
        marginTop: 30
      }}
    />
  ) : (
    <Card
      style={{
        marginTop: 30
      }}
    >
      <Card.Content header="User Name" />
      <Card.Content description={allUsers.map(user => user.username)} />
    </Card>
  );
};

export default graphql(getAllUsers)(Home);
