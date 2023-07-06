import { useEffect, useState } from 'react';
import { Box, Heading, Link, Spacer, Text } from '@chakra-ui/react'
import DrawerMenu from './drawer'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../libs/firebase';

const Header = () => {
  const [username, setUsername] = useState('');
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const displayName = user.displayName;
        setUsername(displayName);
      } else {
        setUsername('');
      }
    });
    return () => unsubscribe();
  }, []);


  return (
    <div>
      <Box bg='blackAlpha.800' color="white" w='100%' p={2} display="flex" >
        <Heading 
          as='h1' 
          size={{base: '2xl', sm: '4xl'}}
          maxW='1080px' 
          m="0 auto"
          ml="20"
          fontWeight="light"
        >
          <Link href='/top'>
            My Closet
          </Link>
        </Heading>
        <Spacer />
        <Text mt={5}>
          {username}さん
        </Text>
        <Box mt={3}>
          <DrawerMenu />
        </Box>
      </Box>
    </div>
  )
}

export default Header
