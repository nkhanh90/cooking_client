import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from 'app/App';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  concat,
  makeVar,
  gql,
} from '@apollo/client';
import reportWebVitals from './reportWebVitals';

/*
 Apollo Client config
 */
const httpLink = new HttpLink({ uri: 'http://localhost:789' });
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('graphql.token') || null,
    },
  });

  return forward(operation);
});

// export const GET_SELECTED_INGREDIENTS = gql`
//   query GetSelectedIngredients {
//     ingredientItems @client
//   }
// `;

export const ingredientsVar = makeVar([]);

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          ingredientItems: {
            read() {
              return ingredientsVar();
            },
          },
        },
      },
      User: {
        fields: {
          isLogin: {
            read(_, { variables }) {
              const localUser = localStorage.getItem('graphql.token_data');
              if (localUser) return true;
              return false;
            },
          },
        },
      },
    },
  }),
});
/*
 End of apollo config
*/

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
