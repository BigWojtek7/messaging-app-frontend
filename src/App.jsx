import { Outlet } from 'react-router-dom';
import styles from './App.module.css';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className={styles.content}>
      <nav className={styles.sidebar}>
        <Sidebar />
      </nav>
      <main className={styles.mainDiv}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
