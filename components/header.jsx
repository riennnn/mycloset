import { Box, Heading, Link, Spacer } from '@chakra-ui/react'
import React from 'react'
import DrawerMenu from './drawer'

import { useEffect, useState } from 'react';
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
          size='2xl' 
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
        <Box mt={2}>
          <p>{username}さん</p>
        </Box>
        <DrawerMenu />
      </Box>
    </div>
  )
}

export default Header
