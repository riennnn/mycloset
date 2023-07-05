import Image from 'next/image'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useItem } from "../hooks/useItem" 
import Header from '../components/header'
import { DeleteButton } from '../components/DeleteButton';
import styles from '../styles/Closet.module.css'
import { Box, Heading} from '@chakra-ui/react'
import { Container } from 'semantic-ui-react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ModeIcon from '@mui/icons-material/Mode';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';


function Buy() {
  const router = useRouter();
  const {items} = useItem();
  const {user, authLoading} = useAuth();

  useEffect(() => {
    if (!user && !authLoading) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  if (user) {
    return (
      <div style={{background:"url(/images/baseWall2.jpg)"}}>
        <Header />
  
        <Box maxW="1080px" margin="0 auto" className={styles.main}>
          <Container w="100%" maxW="1080px">
  
            <Box display="flex" float="right">
              <Box ml="20px" mr="60px" mt="8px" >
                <ShoppingCartIcon
                  onClick={() => router.push('/createItem')}
                  cursor="pointer"
                />
              </Box>
            </Box>
  
            <Heading
              as="h1"
              mt="30px"
            >
              i want to buy ...
            </Heading>
            <Box display="flex" height="300px">
              <Box width="50%">
                <p className={styles.category}>tops</p>
                <Box className={styles.imageGroup}>
                  {items.map((item) => {
                    if(item.category === "tops" && item.itemStatus === "buy") {
                      return (
                        <Box key ={item.id} className={styles.imageContainer}>
                          <Link href={`/buy/${item.id}`} as={`/buy/${item.id}`}>
                            <div className={styles.imageWrapper}>
                              <Image
                                src={item.image}
                                height={200}
                                width={150}
                                alt=""
                                className={styles.image}
                              />
                            </div>
                          </Link>
                          <Box className={styles.iconGroup}>
                            <Box>
                              <ModeIcon 
                                onClick={() => router.push(`/buy/${item.id}/edit`)}
                                cursor="pointer"
                              />
                            </Box>
                            <Box ml="5">
                              <DeleteButton id={item.id} />
                            </Box>
                          </Box>
                        </Box>
                      );
                    }
                    return null;
                  })}
                </Box>
              </Box>
              <Box width="50%" ml="10px">
                <p className={styles.category}>bottoms</p>
                <Box className={styles.imageGroup}>
                  {items.map((item) => {
                    if(item.category === "bottoms" && item.itemStatus === "buy") {
                      return (
                        <Box key ={item.id} className={styles.imageContainer}>
                          <Link href={`/buy/${item.id}`} as={`/buy/${item.id}`}>
                            <div className={styles.imageWrapper}>
                              <Image
                                src={item.image}
                                height={200}
                                width={150}
                                alt=""
                                className={styles.image}
                              />
                            </div>
                          </Link>
                          <Box className={styles.iconGroup}>
                            <Box>
                              <ModeIcon 
                                onClick={() => router.push(`/buy/${item.id}/edit`)}
                                cursor="pointer"
                              />
                            </Box>
                            <Box ml="5">
                              <DeleteButton id={item.id} /> 
                            </Box>
                          </Box>
                        </Box>
                      );
                    }
                    return null;
                  })}
                </Box>
              </Box>
            </Box>
            <Box display="flex" height="300px" mt="10px">
              <Box width="50%">
                <p className={styles.category}>shoes</p>
                <Box className={styles.imageGroup}>
                  {items.map((item) => {
                    if(item.category === "shoes" && item.itemStatus === "buy") {
                      return (
                        <Box key ={item.id} className={styles.imageContainer}>
                          <Link href={`/buy/${item.id}`} as={`/buy/${item.id}`}>
                            <div className={styles.imageWrapper}>
                              <Image
                                src={item.image}
                                height={200}
                                width={150}
                                alt=""
                                className={styles.image}
                              />
                            </div>
                          </Link>
                          <Box className={styles.iconGroup}>
                            <Box>
                              <ModeIcon 
                                onClick={() => router.push(`/buy/${item.id}/edit`)}
                                cursor="pointer"
                              />
                            </Box>
                            <Box ml="5">
                              <DeleteButton id={item.id} />
                            </Box>
                          </Box>
                        </Box>
                      );
                    }
                    return null;
                  })}
                </Box>
              </Box>
              <Box width="50%" ml="10px">
                <p className={styles.category}>others</p>
                <Box className={styles.imageGroup}>
                  {items.map((item) => {
                    if(item.category === "others" && item.itemStatus === "buy") {
                      return (
                        <Box key ={item.id} className={styles.imageContainer}>
                          <Link href={`/buy/${item.id}`} as={`/buy/${item.id}`}>
                            <div className={styles.imageWrapper}>
                              <Image
                                src={item.image}
                                height={200}
                                width={150}
                                alt=""
                                className={styles.image}
                              />
                            </div>
                          </Link>
                          <Box className={styles.iconGroup}>
                            <Box>
                              <ModeIcon 
                                onClick={() => router.push(`/buy/${item.id}/edit`)}
                                cursor="pointer"
                              />
                            </Box>
                            <Box ml="5">
                              <DeleteButton id={item.id} />
                            </Box>
                          </Box>
                        </Box>
                      );
                    }
                    return null;
                  })}
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </div>
    );
  }
};

export default Buy;
