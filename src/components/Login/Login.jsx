import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import requestWithNativeFetch from '../../utils/fetchApi';

function Login() {
  const [fetchData, setFetchData] = useState(null);
  const [token, setToken] = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchDataForLogin = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/login`;
        const headers = { 'Content-Type': 'application/json' };
        const data = {
          username: e.target.username.value,
          password: e.target.password.value,
        };
        const messagesData = await requestWithNativeFetch(
          url,
          'POST',
          headers,
          data
        );
        setFetchData(messagesData);

        if (messagesData.success) {
          const dataToken = messagesData.token;
          localStorage.setItem('token', dataToken);
          setToken(dataToken);
          navigate('/');
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataForLogin();
  };

  return (
    <>
      {!token ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
          <button>Log In</button>
          {fetchData && <p>{fetchData.msg}</p>}
        </form>
      ) : (
        <p>You are logged in</p>
      )}
    </>
  );
}

export default Login;
