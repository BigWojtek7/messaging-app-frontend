import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [fetchData, setFetchData] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.username.value);

    const postApi = async () => {
      const res = await fetch('http://localhost:3000/register', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
          re_password: e.target.re_password.value,
        }),
        method: 'post',
      });
      console.log(res)
      const data = await res.json();
      setFetchData(data);
      console.log(data)
      if (data.success) {
        navigate('/');
      }
    };
    postApi();
  };
  console.log(fetchData);

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        <label htmlFor="re_password">Re-Password</label>
        <input id="re_password" name="re_password" type="password" />
        <button>Sign Up</button>
      </form>
      {fetchData &&
        fetchData.msg.map((err, index) => (
          <p key={index}>{err.msg}</p>
        ))}
    </>
  );
}

export default SignUp;
