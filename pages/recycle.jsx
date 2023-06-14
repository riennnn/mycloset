import React from 'react'
import { useRouter } from 'next/router';
import Header from '../components/header'
import { Box, HStack, Heading, Select} from '@chakra-ui/react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { Container } from 'semantic-ui-react';
import styles from '../styles/Closet.module.css'
import Image from 'next/image'



function Recycle() {
  const router = useRouter();

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
                onClick={() => router.push('/create/recycleItem')}
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
                <Image 
                  src="/buy/tops.jpg"
                  height={144}
                  width={144}
                  alt=""
                />
              </HStack>
            </Box>
            <Box width="50%" ml="10px">
              <p className={styles.category}>bottoms</p>
              <HStack spacing="10px" display="flex" mt="3">
                {/* <Image 
                  src="/items/sampleBottoms.jpg"
                  height={144}
                  width={144}
                  alt=""
                /> */}
              </HStack>
            </Box>
          </Box>
          <Box display="flex" mt="10px">
            <Box width="50%">
              <p className={styles.category}>shoes</p>
              <HStack spacing="10px" display="flex" mt="3">
                <Image 
                  src="/buy/boots.jpg"
                  height={144}
                  width={144}
                  alt=""
                />
              </HStack>
            </Box>
            <Box width="50%" ml="10px">
              <p className={styles.category}>others</p>
              <HStack spacing="10px" display="flex" mt="3">
                {/* <Image 
                  src="/items/sampleBag.jpg"
                  height={144}
                  width={144}
                  alt=""
                />
                <Image 
                  src="/items/sampleJewery.jpg"
                  height={144}
                  width={144}
                  alt=""
                /> */}
              </HStack>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  )
}

export default Recycle
