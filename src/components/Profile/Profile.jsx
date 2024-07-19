import { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import styles from './Profile.module.css';
import Loader from '../Loader/Loader';

import requestWithNativeFetch from '../../utils/fetchApi';

import Icon from '@mdi/react';
import { mdiLogin } from '@mdi/js';

function Profile() {
  const [token, setToken, user, isLoading, setIsLoading] = useOutletContext();

  const [usernameInput, setUsernameInput] = useState();

  const [usernameFetch, setUsernameFetch] = useState(null);
  const [passwordFetch, setPasswordFetch] = useState(null);

  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const initialUsernameValue = user.username;
    setUsernameInput(initialUsernameValue);
  }, [user.username]);

  const handleEditUsername = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchDataForChangeUsername = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/${user._id}/username`;
        const headers = {
          'Content-Type': 'application/json',
          Authorization: token,
        };
        const data = {
          username: e.target.username.value,
        };
        const usernameChangeData = await requestWithNativeFetch(
          url,
          'PATCH',
          headers,
          data
        );
        setUsernameFetch(usernameChangeData);
        setIsLoading(false);

        if (usernameChangeData.success) {
          setIsUpdated(true);
          localStorage.removeItem('token');
          setToken(null);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataForChangeUsername();
  };

  const handleEditPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchDataForChangePassword = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/${user._id}/password`;
        const headers = {
          'Content-Type': 'application/json',
          Authorization: token,
        };
        const data = {
          old_password: e.target.old_password.value,
          new_password: e.target.password.value,
          re_new_password: e.target.re_password.value,
        };
        const passwordChangeData = await requestWithNativeFetch(
          url,
          'PATCH',
          headers,
          data
        );
        setPasswordFetch(passwordChangeData);
        setIsLoading(false);

        if (passwordChangeData.success) {
          setIsUpdated(true);
          localStorage.removeItem('token');
          setToken(null);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataForChangePassword();
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !isUpdated ? (
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
            {usernameFetch &&
              usernameFetch.msg.map((err, index) => (
                <p key={index}>{err.msg}</p>
              ))}
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
            {passwordFetch &&
              passwordFetch.msg.map((err, index) => (
                <p key={index}>{err.msg}</p>
              ))}
          </form>
        </div>
      ) : (
        <div className={styles.profileEdited}>
          <p>{usernameFetch?.msg || passwordFetch?.msg}</p>
          <Link className={styles.login} to="/login">
            <Icon path={mdiLogin} size={5} color="#84cc16"></Icon>
          </Link>
        </div>
      )}
    </>
  );
}
export default Profile;
