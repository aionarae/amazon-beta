

const Auth = {
  login: (username, password) => {
    // Replace this with real authentication logic
    if (username === 'user' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  },
  
  logout: () => {
    localStorage.removeItem('isAuthenticated');
  },
  
  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
};

export default Auth;
