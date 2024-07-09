import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function Profile() {
  const [token, , user] = useOutletContext();

  const initialUsernameValue = user.username
  const [usernameInput, setUsernameInput] = useState();

  useEffect(()=>{
    setUsernameInput(initialUsernameValue)
  },[initialUsernameValue])

  const handleEditUsername = (e) => {
    e.preventDefault();
    console.log(e.target.username.value);
  };

  return (
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
      <form>
        <label htmlFor="old_password">Old Password</label>
        <input id="old_password" name="old_password" type="password" />
        <label htmlFor="password">New Password</label>
        <input id="password" name="password" type="password" />
        <label htmlFor="re_password">Re-Password</label>
        <input id="re_password" name="re_password" type="password" />
        <button>Update</button>
      </form>
    </div>
  );
}
export default Profile;
