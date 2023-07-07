import styles from '../styles/Top.module.css'
import Header from '../components/header'
import useLoggedIn from '../hooks/useLoggedIn';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Top() {
  const router = useRouter();
  const isLoggedIn = useLoggedIn();

  return (
    <div style={{background:"url(/images/top.jpg)", backgroundSize: "cover", backgroundPosition: "center"}}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h2 className={styles.title}><Link href='/closet'>i have ...</Link></h2>
          <h2 className={styles.title}><Link href='buy'>i want to buy ...</Link></h2>
          <h2 className={styles.title}><Link href='recycle'>i want to recycle ...</Link></h2>
          <h2 className={styles.title}><Link href='createItem'>add new item ...</Link></h2>
        </div>
      </main>
    </div>
  );
};

export default Top;