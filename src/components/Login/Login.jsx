import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

function Login() {
  const [fetchData, setFetchData] = useState(null);
  const [token, setToken] = useOutletContext();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const postApi = async () => {
      const res = await fetch('http://localhost:3000/login', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
        method: 'post',
      });
      const data = await res.json();
      setFetchData(data);

      const dataToken = data.token;
      localStorage.setItem('token', dataToken);
      setToken(dataToken);

      if (data.success) {
        navigate('/');
      }
    };
    postApi();
  };
  console.log(fetchData);

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
