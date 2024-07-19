import { useOutletContext } from 'react-router-dom';
import styles from './Messages.module.css';
import { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import Loader from '../Loader/Loader';

import getRequestWithNativeFetch from '../../utils/fetchApiGet';
import requestWithNativeFetch from '../../utils/fetchApi';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [deleteRes, setDeleteRes] = useState({});
  const [token, , user, isLoading, setIsLoading] = useOutletContext();

  const handleDelete = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const messageId = e.currentTarget.value;
    const fetchDataForDelete = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/${messageId}/delete`;
        const headers = { Authorization: token };
        const deleteData = await requestWithNativeFetch(url, 'DELETE', headers);
        setDeleteRes(deleteData);
        setIsLoading(false);
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
      setIsLoading(true);
      const fetchDataForMessages = async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/${
            user._id
          }/messages`;
          const headers = {
            Authorization: token,
          };
          const messagesData = await getRequestWithNativeFetch(url, headers);
          setMessages(messagesData);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataForMessages();
    }
    return () => {
      setMessages([]);
    };
  }, [user, token, deleteRes, setIsLoading]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.messages}>
          {messages.length === 0 ? (
            <p>You have no messages</p>
          ) : (
            messages.map((ms) => (
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
            ))
          )}
        </div>
      )}
    </>
  );
}

export default Messages;
