import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';

function CreateMessage() {
  const [token, , user] = useOutletContext();
  const [allUsers, setAllUsers] = useState([]);

  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const postApi = async () => {
      const res = await fetch('http://localhost:3000/create-message', {
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({
          title: e.target.title.value,
          content: e.target.content.value,
          receiver: e.target.receiver.value,
        }),
        method: 'post',
      });
      const data = await res.json();
      if (data.success) {
        setIsSent(true);
      }
    };
    postApi();
  };


  useEffect(() => {
    if (token) {
      const fetchDataForUsernames = async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/all-users`;
          const headers = {
            Authorization: token,
          };
          const usernamesData = await getRequestWithNativeFetch(url, headers);
          setAllUsers(usernamesData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataForUsernames();
    }
    return () => {
      setAllUsers([]);
    };
  }, [token]);


  return (
    <>
      {!isSent ? (
        <form onSubmit={handleSubmit}>
          <p>
            From: <strong>{user.username}</strong>
          </p>
          <label htmlFor="receiver">Receiver:</label>
          <select name="receiver" id="receiver">
            {allUsers
              .filter((rec) => rec.username !== user.username)
              .map((receiver) => (
                <option key={receiver._id} value={receiver._id}>
                  {receiver.username}
                </option>
              ))}
          </select>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" />
          <label htmlFor="content"></label>
          <textarea name="content" id="content" rows="10" cols="30"></textarea>
          <button>Send</button>
        </form>
      ) : (
        <div className="messageSent">
          <p>Your message has been sent</p>
          <button onClick={() => setIsSent(false)}>New message</button>
        </div>
      )}
    </>
  );
}

export default CreateMessage;
