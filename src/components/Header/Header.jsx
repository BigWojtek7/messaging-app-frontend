import { useLocation } from 'react-router-dom';
import styles from './Header.module.css';

import Icon from '@mdi/react';
import {
  mdiLogout
} from "@mdi/js";

function Header({ token, setToken, user }) {
  const { pathname } = useLocation();
  console.log(pathname);

  const header =
    pathname !== '/'
      ? `${pathname[1].toUpperCase()}${pathname.replace('/', '').slice(1)}`
      : 'Messaging App';

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    alert('You are signed out');
  };

  return (
    <div className={styles.header}>
      <div className="leftSide"><h1>{header}</h1></div>

      {token && (
          <div className={styles.rightSide}>
            <span>Hello <strong>{user.username}</strong>! </span>
            <a href="#" onClick={handleLogout}>
              <Icon path={mdiLogout} size={2} />
            </a>
          </div>
        )}

      
    </div>
  );
}

export default Header;
