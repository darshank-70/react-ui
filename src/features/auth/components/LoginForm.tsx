import { useState, type FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  // username
  // password
  // form
  // validation
  // login
  // errors
  // loading
  // etc... we could do this but, as component increases,
  //  it becomes more complex and less reusable and testable and maintainable

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login({ username, password });
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
    // istead of all these handling here we can handle in Auth Provider for login
    // if (username === 'admin@devhub.com' && password === 'password123') {
    //   const user: User = {
    //     id: '1',
    //     name: '',
    //     username,
    //   };

    //   console.log('Authenticated user:', user);
    // } else {
    //   console.log('Invalid credentials');
    // }
  };
  // Every component underneath AuthProvider can access the authentication context.
  // CONTEXT API: 3 parts
  // 1. createContext() which creates a context OBject,
  // 2. Provider which provides the context,
  // 3. useContext() Consumer which consumes the context
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='username'>username</label>

        <input
          id='username'
          value={username}
          onChange={(event) => setusername(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor='password'>Password</label>

        <input
          id='password'
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <button type='submit'>Login</button>
    </form>
  );
}

export default LoginForm;
