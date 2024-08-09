import { useState } from 'react';
import Auth  from '../utils/auth'; // If needed for post-signup actions
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';

const SignUpForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createUser] = useMutation(CREATE_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check form validity and password match
    if (userFormData.password !== userFormData.confirmPassword) {
      setShowAlert(true);
      return;
    }

    setLoading(true);

    try {
      const { data } = await createUser({
        variables: { ...userFormData }
      });

      const { token } = data.createUser;
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    } finally {
      setLoading(false);
      setUserFormData({ username: '', email: '', password: '', confirmPassword: ''});
    }
  };

  return (
    <div className="signup-form-container">
      {showAlert && (
        <div className="alert alert-danger">
          Something went wrong with your sign-up credentials!
        </div>
      )}
      <form noValidate onSubmit={handleFormSubmit} className="signup-form">
      <div className="form-group">
          <label htmlFor='username'>Username</label>
          <input
            type='username'
            placeholder='Your Username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
            className="form-control"
          />
          <div className="feedback">Username is required!</div>
        </div>

        <div className="form-group">
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
            className="form-control"
          />
          <div className="feedback">Email is required!</div>
        </div>

        <div className="form-group">
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
            className="form-control"
          />
          <div className="feedback">Password is required!</div>
        </div>

        <div className="form-group">
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm your password'
            name='confirmPassword'
            onChange={handleInputChange}
            value={userFormData.confirmPassword}
            required
            className="form-control"
          />
          <div className="feedback">Please confirm your password!</div>
        </div>

        <button
          disabled={!(userFormData.email && userFormData.password && userFormData.confirmPassword) || loading}
          type='submit'
          className="submit-button"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
