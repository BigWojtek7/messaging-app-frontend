import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

import Icon from '@mdi/react';
import {
  mdiViewDashboard,
  mdiLogin,
  mdiAccountPlus,
  mdiHome,
  mdiAccount,
  mdiMessage,
  mdiMessagePlus
} from "@mdi/js";


function Sidebar({ token }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.menu}><Icon path={mdiViewDashboard} size={2}/><h1>Menu:</h1></div>
      <ul>
        <li>
        <Icon path={mdiHome} size={1.4}/>
          <Link to="/">Home</Link>
        </li>
        {!token && (
          <>
            <li>
            <Icon path={mdiAccountPlus} size={1.4}/>
              <Link to="sign-up">Sign Up</Link>
            </li>
            <li>
            <Icon path={mdiLogin} size={1.4}/>
              <Link to="login">Log-in</Link>
            </li>
          </>
        )}
        <li>
        <Icon path={mdiAccount} size={1.4}/>
          <Link to="profile">Profile</Link>
        </li>
        <li>
        <Icon path={mdiMessage} size={1.4}/>
          <Link to="messages">Messages</Link>
        </li>
        <li>
        <Icon path={mdiMessagePlus} size={1.4}/>
          <Link to="create-message">Create Message</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
