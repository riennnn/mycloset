import React from 'react'
import { useRouter } from 'next/router';
import Header from '../components/header'
import { Box, HStack, Heading} from '@chakra-ui/react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Container } from 'semantic-ui-react';
import styles from '../styles/Closet.module.css'
import Image from 'next/image'


function Buy() {
  const router = useRouter();

  return (
    <div style={{background:"url(/images/baseWall2.jpg)"}}>
      <Header />

      <Box maxW="1080px" margin="0 auto" className={styles.main}>
        <Container w="100%" maxW="1080px">

          <Box display="flex" float="right">
            {/* <Select variant="flushed" width="280px" placeholder='All season'>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="Autumn">Autumn</option>
              <option value="Winter">Winter</option>
            </Select> */}
            <Box ml="20px" mr="60px" mt="8px" >
              <ShoppingCartIcon
                onClick={() => router.push('/create/buyItem')}
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

export default Buy
