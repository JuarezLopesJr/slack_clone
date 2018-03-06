import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Button,
  Form,
  Grid,
  Header,
  // Image,
  // Message,
  Segment
} from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';
import Validator from 'validator';

import InlineMessage from '../messages/InlineMessage';

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      username
      email
      password
    }
  }
`;

class RegisterPage extends Component {
  state = {
    data: {
      username: '',
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = async e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (_isEmpty(errors)) {
      this.setState({ loading: true });

      const response = await this.props.mutate({ variables: this.state.data });

      this.setState({
        loading: false,
        data: { username: '', email: '', password: '' }
      });
      console.log(response);
    }
  };

  validate = data => {
    const errors = {};
    if (!data.username) errors.username = 'Provide a username';
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid email';
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <div>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header
              as="h2"
              color="teal"
              textAlign="center"
              style={{ marginTop: 25 }}
            >
              Slack Clone
            </Header>
            <Form size="large" onSubmit={this.onSubmit} loading={loading}>
              <Segment stacked>
                <Form.Input
                  name="username"
                  value={data.username}
                  onChange={this.onChange}
                  error={!!errors.username}
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="username"
                />
                {errors.username && <InlineMessage text={errors.username} />}
                <Form.Input
                  name="email"
                  value={data.email}
                  onChange={this.onChange}
                  error={!!errors.email}
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="user@example.com"
                />
                {errors.email && <InlineMessage text={errors.email} />}
                <Form.Input
                  name="password"
                  value={data.password}
                  onChange={this.onChange}
                  error={!!errors.password}
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                {errors.password && <InlineMessage text={errors.password} />}

                <Button color="teal" fluid size="large">
                  Register
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default graphql(registerMutation)(RegisterPage);
