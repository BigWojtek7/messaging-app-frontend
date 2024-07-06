import { useLocation } from 'react-router-dom';
import styles from './Header.module.css';
function Header() {
  const { pathname } = useLocation();
  const header = `${pathname[1].toUpperCase()}${pathname
    .replace('/', '')
    .slice(1)}`;
  return (
    <div className={styles.header}>
      <h1>{header}</h1>
    </div>
  );
}

export default Header;
