import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import Header from './components/Header/index'; // Ensure Header is imported
import Footer from './components/Footer/index';
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
  return (
    <ApolloProvider client={client}>
      <Header /> 
      <main>
        <Outlet /> 
      </main>
      <Footer /> 
    </ApolloProvider>
  );
}

export default App;

