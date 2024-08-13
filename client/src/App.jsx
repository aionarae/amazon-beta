import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { useState, useEffect } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import { FilterProvider } from './components/context/FilterContext';
import AccountInfo from './pages/AccountInfo';
import './App.css';
import './index.css';

const httpLink = createHttpLink({ uri: '/graphql' });
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  console.log('Token:', token); // Debugging log
  return { headers: { ...headers, authorization: token ? `Bearer ${token}` : '' } };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('id_token');
    if (token) {
      // Decode the token to get the user ID (assuming JWT)
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserId(decodedToken.userId);
      console.log('User ID:', decodedToken.userId); // Debugging log
    } else {
      console.error('Error: User ID is not provided');
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <FilterProvider> 
        <Header cart={cart} setCart={setCart} userId={userId} />
        <main>
          <Outlet context={{ cart, setCart, userId }} />
        </main>
        <Footer />
      </FilterProvider>
    </ApolloProvider>
  );
}

export default App;

