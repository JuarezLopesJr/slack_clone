import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import registerServiceWorker from './registerServiceWorker';

import Routes from './routes';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:8080/graphql' }),
  cache: new InMemoryCache()
});

// Pass your GraphQL endpoint to uri

const App = (
  <div className="ui container">
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </div>
);

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
