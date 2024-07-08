import styles from './Homepage.module.css';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import {
  mdiLogin,
} from "@mdi/js";

function Homepage() {
  const [messagesCount, setMessagesCount] = useState([]);
  const [token, , user] = useOutletContext();
  useEffect(() => {
    if (user._id) {
      const postApi = async () => {
        try {
          const res = await fetch(
            `http://localhost:3000/${user._id}/messages-num`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const data = await res.json();

          setMessagesCount(data);
        } catch (err) {
          console.log(err.name);
        }
      };
      postApi();
    }
    return () => {
      setMessagesCount([]);
    };
  }, [user, token]);
  console.log(messagesCount);
  return (
    <div className={styles.home}>
      <h2>Welcome to messaging App</h2>
      {token ? <h3>You have {messagesCount} {messagesCount <= 1 ? 'message': 'messages'}</h3> : <Link className={styles.login} to='/login'><Icon path={mdiLogin} size={5}></Icon></Link>}
      
      
    </div>
  );
}
export default Homepage;
