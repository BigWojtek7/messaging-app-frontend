import { Outlet } from 'react-router-dom';
import styles from './App.module.css';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';

function App() {
  return (
    <div className={styles.app}>
      <nav className={styles.sidebar}>
        <Sidebar />
      </nav>
      <main className={styles.mainDiv}>
        <Header />
        <div className={styles.content}><Outlet /></div>
      </main>
    </div>
  );
}

export default App;
