import styles from './Homepage.module.css';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
import Icon from '@mdi/react';
import { mdiLogin } from '@mdi/js';

function Homepage() {
  const [messagesCount, setMessagesCount] = useState([]);
  const [token, , user] = useOutletContext();

  useEffect(() => {
    if (user._id) {
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
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataForMessagesCount();
    }
    return () => {
      setMessagesCount([]);
    };
  }, [token, user._id]);

  return (
    <div className={styles.home}>
      <h2>Welcome to messaging App</h2>
      {token ? (
        <h3>
          You have {messagesCount} {messagesCount <= 1 ? 'message' : 'messages'}
        </h3>
      ) : (
        <Link className={styles.login} to="/login">
          <Icon path={mdiLogin} size={5}></Icon>
        </Link>
      )}
    </div>
  );
}
export default Homepage;
