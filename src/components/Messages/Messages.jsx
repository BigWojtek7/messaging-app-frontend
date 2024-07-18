import { useOutletContext } from 'react-router-dom';
import styles from './Messages.module.css';
import { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

import getRequestWithNativeFetch from '../../utils/fetchApiGet';
import requestWithNativeFetch from '../../utils/fetchApi';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [deleteRes, setDeleteRes] = useState({});
  const [token, , user] = useOutletContext();

  const handleDelete = (e) => {
    e.preventDefault();
    const messageId = e.currentTarget.value;

    const fetchDataForDelete = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/${messageId}/delete`;
        const headers = { Authorization: token };
        const deleteData = await requestWithNativeFetch(url, 'DELETE', headers);
        setDeleteRes(deleteData);

        if (deleteData.success) {
          setDeleteRes(deleteData);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataForDelete();
  };

  useEffect(() => {
    if (user._id) {
      const fetchDataForMessages = async () => {
        try {
          const url = `http://localhost:3000/${user._id}/messages`;
          const headers = {
            Authorization: token,
          };
          const messagesData = await getRequestWithNativeFetch(url, headers);
          setMessages(messagesData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataForMessages();
    }
    return () => {
      setMessages([]);
    };
  }, [user, token, deleteRes]);

  return (
    <div className={styles.messages}>
      {messages.map((ms) => (
        <div key={ms._id} className={styles.message}>
          <div className={styles.stripe}></div>
          <div className={styles.cardContent}>
            <p
              className={styles.author}
            >{`${ms.author.username} - ${ms.date_format}`}</p>
            <p className={styles.title}>{ms.title}</p>
            <p>{ms.content}</p>
            <div className={styles.delete}>
              <button onClick={handleDelete} value={ms.id}>
                <Icon path={mdiDelete} size={1} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Messages;
