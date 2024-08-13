import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { useState } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import Header from './components/Header/index'; // Ensure Header is imported
import Footer from './components/Footer/index';
import { FilterProvider } from './components/Context/FilterContext'; // Import the context provider
import './App.css';
import './index.css';

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
      <FilterProvider> 
        <Header cart={cart} setCart={setCart} />
        <main>
          <Outlet context={{ cart, setCart }} />
        </main>
        <Footer />
      </FilterProvider>
    </ApolloProvider>
  );
}

export default App;

