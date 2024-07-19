import styles from './Homepage.module.css';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
import Icon from '@mdi/react';
import { mdiLogin, mdiAccount } from '@mdi/js';
import Loader from '../Loader/Loader';

function Homepage() {
  const [messagesCount, setMessagesCount] = useState([]);
  const [token, , user, isLoading, setIsLoading] = useOutletContext();

  useEffect(() => {
    if (token && user._id) {
      setIsLoading(true);
      const fetchDataForMessagesCount = async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/${
            user._id
          }/messages-num`;
          const headers = {
            Authorization: token,
          };
          const messageCountData = await getRequestWithNativeFetch(
            url,
            headers
          );
          setMessagesCount(messageCountData);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataForMessagesCount();
    }
    return () => {
      setMessagesCount([]);
    };
  }, [token, user._id, setIsLoading]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.home}>
          <h2>Welcome to messaging App</h2>
          {token ? (
            <h3>
              You have {messagesCount}{' '}
              {messagesCount <= 1 ? 'message' : 'messages'}
            </h3>
          ) : (
            <div>
              <Link className={styles.login} to="/login">
                <Icon path={mdiLogin} size={5} color="#84cc16"></Icon>
              </Link>
              <Link className={styles.signUp} to="/sign-up">
                <Icon path={mdiAccount} size={5} color="#f59e0b"></Icon>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default Homepage;
