import styles from '../styles/Top.module.css'
import Header from '../components/header'
import useLoggedIn from '../hooks/useLoggedIn';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Top() {
  const router = useRouter();
  const isLoggedIn = useLoggedIn();

  const TITLE = [
    {value: "closet", title: "i have ..."},
    {value: "buy", title: "i want to buy ..."},
    {value: "recycle", title: "i want to recycle ..."},
    {value: "createItem", title: "add new item ..."}
  ]

  return (
    <div style={{background:"url(/images/top.jpg)", backgroundSize: "cover", backgroundPosition: "center"}}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {TITLE.map(({value, title}) => (
            <h2 className={styles.title} key={value}>
              <Link href={`/${value}`}>{title}</Link>
            </h2>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Top;