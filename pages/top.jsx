import React from 'react'
import styles from '../styles/Top.module.css'
import Header from '../components/header'
import { Link } from '@chakra-ui/react'


function Top() {
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
  )
}

export default Top