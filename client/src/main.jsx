import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AccountInfo from './pages/AccountInfo.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Cart from './components/Cart/index.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <NotFound />, //TODO create NotFound component`
    children: [
      {
        index: true,
        element: <LandingPage />
      }, {
        path: '/accountinfo',
        element: <AccountInfo />
      }, {
        path: '/cart',
        element: <Cart />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

