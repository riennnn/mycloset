import Head from 'next/head'
import { useRouter } from "next/router";
import styles from '../styles/Home.module.css'
import { Button } from '@chakra-ui/react'
import SignHeader from '../components/signHeader';

export default function Home() {
  const router = useRouter();

  return (
    <div style={{background:"url(/images/indexcloset.jpg)", backgroundSize: "cover", backgroundPosition: "50% 50%"}}>
      <SignHeader />
      <div className={styles.container}>
        <Head>
          <title>My closet</title>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
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
        </main>
      </div>
    </div>
  )
}
