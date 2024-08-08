import { useState } from 'react';
import Auth from '../utils/auth'; // This will now work with default export
import { Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations'; 

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [validated] = useState();
  const [loading, setLoading] = useState(false);
  const [login] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      
    }

    setLoading(true);

    try {
      const { data } = await login({
        variables: { ...userFormData }
      });

      const { token } = data.login;
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    } finally {
      setLoading(false);
      setUserFormData({ username: '', email: '', password: ''});
    }
  }

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {showAlert && <div className="alert alert-danger">Something went wrong with your login credentials!</div>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <div className="invalid-feedback">Username is required!</div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <div className="invalid-feedback">Email is required!</div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <div className="invalid-feedback">Password is required!</div>
        </div>
        <button
          type="submit"
          disabled={!(userFormData.email && userFormData.password) || loading}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </Form>
    </>
  );
};

export default LoginForm;

