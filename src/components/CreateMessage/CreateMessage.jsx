import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setIsSent(true);
      }
    };
    postApi();
  };


  useEffect(() => {
    if (token) {
      const postApi = async () => {
        try {
          const res = await fetch(`http://localhost:3000/all-users`, {
            headers: {
              Authorization: token,
            },
          });
          const data = await res.json();

          setAllUsers(data);

        } catch (err) {
          console.log(err.name);
        }
      };
      postApi();
    }
    return () => {
      setAllUsers([]);
    };
  }, [token]);

  console.log(allUsers);
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
