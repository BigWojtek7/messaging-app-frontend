import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [fetchData, setFetchData] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const postApi = async () => {
      const res = await fetch(
        'https://incandescent-creative-gaura.glitch.me/login',
        {
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value,
          }),
          method: 'post',
        }
      );
      const data = await res.json();
      setFetchData(data);
      const dataToken = data.token;
      localStorage.setItem('token', dataToken);

      if (data.success) {
        navigate('/');
      }
    };
    postApi();
  };

  return (
    <>
      <h1>Login:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        <button>Log In</button>
      </form>

      {fetchData && <p>{fetchData.msg}</p>}
    </>
  );
}

export default Login;
