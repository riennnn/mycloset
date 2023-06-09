import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useItem } from "../hooks/useItem" 
import useLoggedIn from '../hooks/useLoggedIn';
import Header from '../components/header'
import { DeleteButton } from '../components/DeleteButton';
import styles from '../styles/Closet.module.css'
import { Box,  Container,  Flex,  Heading, Select } from '@chakra-ui/react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ModeIcon from '@mui/icons-material/Mode';


function Closet() {
  const router = useRouter();
  const {items} = useItem();
  const isLoggedIn = useLoggedIn();
  const [seasonFilter, setSeasonFilter] = useState("all season");
  const [seasonFilteredItems, setSeasonFilteredItems] = useState([]);

  useEffect(() => {
    const filteringItems = () => {
      if (seasonFilter === "all season") {
        setSeasonFilteredItems (items);
      } else {
        const filteredItems = items.filter((item) => item.season === seasonFilter);
        setSeasonFilteredItems(filteredItems);
      }
    };
    filteringItems();
  },[items, seasonFilter]);
  
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
            i have ...
          </Heading>
          <Flex mt="32px">
            <Select 
              variant="flushed" 
              width="280px" 
              value={seasonFilter} 
              onChange={(e) => setSeasonFilter(e.target.value)}
            >
              <option value="all season">All season</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="autumn">Autumn</option>
              <option value="winter">Winter</option>
            </Select>
            <Box  mt="8px" ml="10px">
              <AddToPhotosIcon
                onClick={() => router.push('/createItem')}
                cursor="pointer"
              />
            </Box>
          </Flex>
        </Flex>

        <Flex height="300px">
          <Box width="50%">
            <p className={styles.category}>tops</p>
            <Box className={styles.imageGroup}>
              {seasonFilteredItems.map((item) => {
                if(item.category === "tops" && item.itemStatus === "have") {
                  return (
                    <Box key ={item.id} className={styles.imageContainer}>
                      <Link href={`/closet/${item.id}`} as={`/closet/${item.id}`}>
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
                            onClick={() => router.push(`/closet/${item.id}/edit`)}
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
              {seasonFilteredItems.map((item) => {
                if(item.category === "bottoms" && item.itemStatus === "have") {
                  return (
                    <Box key ={item.id} className={styles.imageContainer}>
                      <Link href={`/closet/${item.id}`} as={`/closet/${item.id}`}>
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
                            onClick={() => router.push(`/closet/${item.id}/edit`)}
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
              {seasonFilteredItems.map((item) => {
                if(item.category === "shoes" && item.itemStatus === "have") {
                  return (
                    <Box key ={item.id} className={styles.imageContainer}>
                      <Link href={`/closet/${item.id}`} as={`/closet/${item.id}`}>
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
                            onClick={() => router.push(`/closet/${item.id}/edit`)}
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
              {seasonFilteredItems.map((item) => {
                if(item.category === "others" && item.itemStatus === "have") {
                  return (
                    <Box key ={item.id}  className={styles.imageContainer}>
                      <Link href={`/closet/${item.id}`} as={`/closet/${item.id}`}>
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
                            onClick={() => router.push(`/closet/${item.id}/edit`)}
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

export default Closet;
