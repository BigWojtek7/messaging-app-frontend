import { useOutletContext } from 'react-router-dom';
import styles from './Messages.module.css';
import { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [deleteRes, setDeleteRes] = useState({});
  const [token, , user] = useOutletContext();

  const handleDelete = (e) => {
    e.preventDefault();

    const messageId = e.currentTarget.value;

    const postApi = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${messageId}/delete`, {
        headers: { 'Content-Type': 'application/json', Authorization: token },
        method: 'delete',
      });

      const data = await res.json();

      if (data.success) {
        setDeleteRes(data);
      }
    };
    postApi();
  };
  useEffect(() => {
    if (user._id) {
      const postApi = async () => {
        try {
          const res = await fetch(
            `http://localhost:3000/${user._id}/messages`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const data = await res.json();

          setMessages(data);
        } catch (err) {
          console.log(err.name);
        }
      };
      postApi();
    }
    return () => {
      setMessages([]);
    };
  }, [user, token, deleteRes]);
  console.log(messages);

  console.log(deleteRes);
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
