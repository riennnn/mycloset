import Image from 'next/image'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useItem } from "../hooks/useItem" 
import useLoggedIn from '../hooks/useLoggedIn';
import Header from '../components/header'
import { DeleteButton } from '../components/DeleteButton';
import styles from '../styles/Closet.module.css'
import { Box, Container, Flex, Heading} from '@chakra-ui/react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ModeIcon from '@mui/icons-material/Mode';


function Buy() {
  const router = useRouter();
  const {items} = useItem();
  const isLoggedIn = useLoggedIn();

  return (
    <div style={{background:"url(/images/baseWall2.jpg)"}}>
      <Header />

      <Container 
        maxW="1080px" 
        margin="0 auto" 
        className={styles.main}
      >
        <Flex 
          justify="space-between"
          direction={["column", "row"]}
          align={["center", "flex-start"]}
        >
          <Heading
            as="h1"
            mt="30px"
          >
            i want to buy ...
          </Heading>
          <Box mt="40px" mr="16px">
            <ShoppingCartIcon
              onClick={() => router.push('/createItem')}
              cursor="pointer"
            />
          </Box>
        </Flex>

        <Flex height="300px">
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
        </Flex>
        <Flex height="300px" mt="10px">
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
        </Flex>
      </Container>
    </div>
  );
};

export default Buy;
