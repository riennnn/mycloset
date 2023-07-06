import React from 'react'
import { Box, Heading } from '@chakra-ui/react'

const SignHeader = () => {

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
          My Closet
        </Heading>
      </Box>
    </div>
  )
}

export default SignHeader