// src/utils/auth.js
export const login = (username, password) => {
    // Replace this with real authentication logic
    if (username === 'user' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };
  
  export const logout = () => {
    localStorage.removeItem('isAuthenticated');
  };
  
  export const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };