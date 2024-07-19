import { Outlet } from 'react-router-dom';
import styles from './App.module.css';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import { useEffect, useState } from 'react';
import getRequestWithNativeFetch from './utils/fetchApiGet';

function App() {
  const [user, setUser] = useState({ _id: undefined, username: undefined });

  const currentToken = localStorage.getItem('token');
  const [token, setToken] = useState(currentToken);

  useEffect(() => {
    if (token) {
      const fetchDataForUsers = async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/user`;
          const headers = {
            Authorization: token,
          };
          const userData = await getRequestWithNativeFetch(url, headers);
          setUser(userData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataForUsers();
    }
    return () => {
      setUser([]);
    };
  }, [token]);

  return (
    <div className={styles.app}>
      <nav className={styles.sidebar}>
        <Sidebar token={token} />
      </nav>
      <main className={styles.mainDiv}>
        <Header token={token} setToken={setToken} user={user} />
        <div className={styles.content}>
          <Outlet context={[token, setToken, user]} />
        </div>
      </main>
    </div>
  );
}

export default App;
