import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import Header from '../components/header'
import { Box, HStack, Heading, Select} from '@chakra-ui/react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { Container } from 'semantic-ui-react';
import styles from '../styles/Closet.module.css'
import Image from 'next/image'
import ModeIcon from '@mui/icons-material/Mode';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useItem } from "../hooks/useItem" 


function Recycle() {
  const router = useRouter();

  const {items, setItems, readData} = useItem();

  useEffect(() => {
    readData();
  },[])

  return (
    <div style={{background:"url(/images/baseWall2.jpg)"}}>
      <Header />

      <Box maxW="1080px" margin="0 auto" className={styles.main}>
        <Container w="100%" maxW="1080px">

          <Box display="flex" float="right">
            <Select variant="flushed" width="280px" placeholder='item status'>
              <option value="notStarted">Not started</option>
              <option value="uploading">Uploading to the app</option>
              <option value="sold">Sold</option>
              <option value="wasted">Wasted</option>
            </Select>
            <Box ml="20px" mr="60px" mt="8px" >
              <AddToPhotosIcon
                onClick={() => router.push('/createItem')}
                cursor="pointer"
              />
            </Box>
          </Box>

          <Heading
            as="h1"
            mt="30px"
          >
            i want to Recycle ...
          </Heading>
          <Box display="flex">
            <Box width="50%">
              <p className={styles.category}>tops</p>
              <HStack spacing="10px" display="flex" mt="3">
                {items.map((item) => {
                  if(item.category === "tops" && item.itemStatus === "recycle") {
                    return (
                      <Box key ={item.id}>
                        <Image
                          src={item.image}
                          height={144}
                          width={144}
                          alt=""
                        />
                        <ModeIcon />
                        <DeleteOutlineIcon />
                      </Box>
                    );
                  }
                  return null;
                })}
              </HStack>
            </Box>
            <Box width="50%" ml="10px">
              <p className={styles.category}>bottoms</p>
              <HStack spacing="10px" display="flex" mt="3">
                {items.map((item) => {
                  if(item.category === "bottoms" && item.itemStatus === "recycle") {
                    return (
                      <Box key ={item.id}>
                        <Image
                          src={item.image}
                          height={144}
                          width={144}
                          alt=""
                        />
                        <ModeIcon />
                        <DeleteOutlineIcon />
                      </Box>
                    );
                  }
                  return null;
                })}
              </HStack>
            </Box>
          </Box>
          <Box display="flex" mt="10px">
            <Box width="50%">
              <p className={styles.category}>shoes</p>
              <HStack spacing="10px" display="flex" mt="3">
                {items.map((item) => {
                  if(item.category === "shoes" && item.itemStatus === "recycle") {
                    return (
                      <Box key ={item.id}>
                        <Image
                          src={item.image}
                          height={144}
                          width={144}
                          alt=""
                        />
                        <ModeIcon />
                        <DeleteOutlineIcon />
                      </Box>
                    );
                  }
                  return null;
                })}
              </HStack>
            </Box>
            <Box width="50%" ml="10px">
              <p className={styles.category}>others</p>
              <HStack spacing="10px" display="flex" mt="3">
                {items.map((item) => {
                  if(item.category === "others" && item.itemStatus === "recycle") {
                    return (
                      <Box key ={item.id}>
                        <Image
                          src={item.image}
                          height={144}
                          width={144}
                          alt=""
                        />
                        <ModeIcon />
                        <DeleteOutlineIcon />
                      </Box>
                    );
                  }
                  return null;
                })}
              </HStack>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  )
}

export default Recycle
