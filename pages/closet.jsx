import React from 'react'
import { useRouter } from 'next/router';
import Header from '../components/header'
import { Box, HStack, Heading, Select } from '@chakra-ui/react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { Container } from 'semantic-ui-react';
import styles from '../styles/Closet.module.css'
import Image from 'next/image'


function Closet() {
  const router = useRouter();

  return (
    //修正したいこと　他の一覧も同様//
    // 画像の大きさを統一
    // 画像がなくなると高さが変わる
    //スクロールをそれぞれに入れる

    <div style={{background:"url(/images/baseWall2.jpg)"}}>
      <Header />

      <Box maxW="1080px" margin="0 auto" className={styles.main}>
        <Container w="100%" maxW="1080px">

          <Box display="flex" float="right">
            <Select variant="flushed" width="280px" placeholder='All season'>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="Autumn">Autumn</option>
              <option value="Winter">Winter</option>
            </Select>
            <Box ml="20px" mr="60px" mt="8px" >
              <AddToPhotosIcon
                onClick={() => router.push('/create/closetItem')}
                cursor="pointer"
              />
            </Box>
          </Box>

          <Heading
            as="h1"
            mt="30px"
          >
            i have ...
          </Heading>
          <Box display="flex">
            <Box width="50%">
              <p className={styles.category}>tops</p>
              <HStack spacing="10px" display="flex" mt="3">
                <Image 
                  src="/items/sampleTops.jpg"
                  height={144}
                  width={144}
                  alt=""
                />
              </HStack>
            </Box>
            <Box width="50%" ml="10px">
              <p className={styles.category}>bottoms</p>
              <HStack spacing="10px" display="flex" mt="3">
                <Image 
                  src="/items/sampleBottoms.jpg"
                  height={144}
                  width={144}
                  alt=""
                />
              </HStack>
            </Box>
          </Box>
          <Box display="flex" mt="10px">
            <Box width="50%">
              <p className={styles.category}>shoes</p>
              <HStack spacing="10px" display="flex" mt="3">
                <Image 
                  src="/items/sampleShoes.jpg"
                  height={144}
                  width={144}
                  alt=""
                />
              </HStack>
            </Box>
            <Box width="50%" ml="10px">
              <p className={styles.category}>others</p>
              <HStack spacing="10px" display="flex" mt="3">
                <Image 
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
                />
              </HStack>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  )
}

export default Closet
