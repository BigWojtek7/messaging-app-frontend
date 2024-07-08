import { useOutletContext } from 'react-router-dom';
import styles from './Messages.module.css';
import { useEffect, useState } from 'react';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [token, , user] = useOutletContext();
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
  }, [user, token]);
  console.log(messages);

  return (
    <div className={styles.messages}>
      {messages.map(ms => (
    <div key={ms._id}className={styles.message}>
      <div className={styles.stripe}></div>
      <div className={styles.cardContent}>
        <p className="title">{ms.title}</p>
        <p>
          {ms.content}
        </p>
      </div>
      <div className="card-icons">
      </div>
    </div>
  ))}
  </div>

  );
}

export default Messages;
