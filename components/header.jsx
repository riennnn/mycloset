import { Box, Heading, Link, Spacer } from '@chakra-ui/react'
import React from 'react'
import DrawerMenu from './drawer'

const Header = () => {

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
        <DrawerMenu />
      </Box>
    </div>
  )
}

export default Header
