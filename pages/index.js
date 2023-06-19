import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, Link } from '@chakra-ui/react'

export default function Home() {
  return (
    <div style={{background:"url(/images/indexcloset.jpg)", backgroundSize: "cover", backgroundPosition: "50% 50%"}}>
      {/* 画像を一つにしたい */}
      <div className={styles.container}>
        <Head>
          <title>My closet</title>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            {/* Welcome to <a href="https://nextjs.org">My closet</a> */}
            Welcome to MyCloset
          </h1>  
          <Button
            mt="10px"
            variant="solid"
            borderRadius="full"
            backgroundColor="blackAlpha.300"
            width="32"
            onClick={() => router.push('/signin')}
          >
            Login
          </Button>
          <Button
            mt="10px"
            variant="solid"
            borderRadius="full"
            backgroundColor="blackAlpha.300"
            width="32"
            onClick={() => router.push('/signup')}
          >
            新規登録
          </Button>
          {/* <p style={{color:"white", marginTop:"10px"}}>ログインページは<Link href='/signin'>こちら</Link></p> */}
          {/* <p style={{color:"white", marginTop:"10px"}}>新規登録は<Link href='/signup'>こちら</Link></p> */}
        </main>
      </div>
    </div>
  )
}
