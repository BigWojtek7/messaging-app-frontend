import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
function Header() {
  return (
    <div className={styles.sidebar}>
      <h1>Menu:</h1>
      <ul>
        <li>
          <Link to="sign-up">Sign Up</Link>
        </li>
        <li>
          <Link to="login">Log-in</Link>
        </li>
        <li>
          <Link to="profile">Profile</Link>
        </li>
        <li>
          <Link to="messages">Messages</Link>
        </li>
        <li>
          <Link to="create-message">Create Message</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
