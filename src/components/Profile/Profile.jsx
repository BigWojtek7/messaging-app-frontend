import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function Profile() {
  const [token, , user] = useOutletContext();

  const initialUsernameValue = user.username;
  const [usernameInput, setUsernameInput] = useState();

  const [isUpdated, setIsUpdated] = useState(null);

  useEffect(() => {
    setUsernameInput(initialUsernameValue);
  }, [initialUsernameValue]);

  const handleEditUsername = (e) => {
    e.preventDefault();
    // console.log(e.target.username.value);
    const postApi = async () => {
      try {
        const res = await fetch(`http://localhost:3000/${user._id}/username`, {
          headers: { 'Content-Type': 'application/json', Authorization: token },
          body: JSON.stringify({
            username: e.target.username.value,
          }),
          method: 'PATCH',
        });
        console.log(res);
        const data = await res.json();
        console.log(data);
        if (data.success) {
          setIsUpdated(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    postApi();
  };

  const handleEditPassword = (e) => {
    e.preventDefault();
    // console.log(e.target.username.value);
    const postApi = async () => {
      try {
        const res = await fetch(`http://localhost:3000/${user._id}/password`, {
          headers: { 'Content-Type': 'application/json', Authorization: token },
          body: JSON.stringify({
            old_password: e.target.old_password.value,
            new_password: e.target.password.value,
            re_new_password: e.target.re_password.value,
          }),
          method: 'PATCH',
        });
        console.log(res);
        const data = await res.json();
        console.log(data);
        if (data.success) {
          setIsUpdated(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    postApi();
  };

  return (
    <>
      {!isUpdated ? (
        <div className="profile">
          <h2>Edit your username</h2>
          <form onSubmit={handleEditUsername}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              value={usernameInput || ''}
              onChange={(e) => setUsernameInput(e.target.value)}
              type="text"
            />
            <button>Update</button>
          </form>
          <h2>Edit your password</h2>
          <form onSubmit={handleEditPassword}>
            <label htmlFor="old_password">Old Password</label>
            <input id="old_password" name="old_password" type="password" />
            <label htmlFor="password">New Password</label>
            <input id="password" name="password" type="password" />
            <label htmlFor="re_password">Re-Password</label>
            <input id="re_password" name="re_password" type="password" />
            <button>Update</button>
          </form>
        </div>
      ) : (
        <p>{isUpdated.msg}</p>
      )}
    </>
  );
}
export default Profile;
