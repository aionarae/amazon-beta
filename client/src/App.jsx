// src/App.jsx
import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { useState } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import './App.css';

const httpLink = createHttpLink({ uri: '/graphql' });
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return { headers: { ...headers, authorization: token ? `Bearer ${token}` : '' } };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [cart, setCart] = useState([]);
  return (
    <ApolloProvider client={client}>
      <Header cart={cart} setCart={setCart} />
      <main>
        <Outlet context={{ cart, setCart }}/>
      </main>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
