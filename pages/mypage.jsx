import React from 'react'
import Header from '../components/header'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import styles from '../styles/Create.module.css'
import { Box, Container, VStack, Input, Select, Textarea, Heading, Button, Spacer } from '@chakra-ui/react';
import { ArrowBackIcon, RepeatIcon } from '@chakra-ui/icons';

function Mypage() {
  return (
    <div style={{background:"url(/images/mypage.jpg)"}}>
      <Header />

      <Box maxW="1080px" margin="0 auto" className='main'>
        <Container w="100%" maxW="1080px">

          <Box display="flex">
            <Heading
              as="h1"
              // mt="30px"
            >
              My profile ...
            </Heading>
            <Spacer />
            <Button 
              rightIcon={<ArrowBackIcon />} 
              colorScheme='brown' 
              variant='outline'
              // mt="32px"
              mr="10px"
            >
              Back
            </Button>
            <Button 
              rightIcon={<RepeatIcon />} 
              colorScheme='brown' 
              variant='outline'
              // mt="32px"
            >
              Update
            </Button>
          </Box>
          
          <br />
          <div className={styles.outerBox}>
            <div className={styles.imageUplodeBox}>
              <h2>New item</h2>
              <div className={styles.imageLogoAndText}>
                <CameraAltIcon sx={{fontSize: 40}}/>
                <p>ここにドラッグ＆ドロップしてね</p>
              </div>
              <Input className={styles.imageUploadInput} />
            </div>
            <VStack spacing={3} mt="3" width="600px">
              <Input 
                placeholder='User Name'
              />
              <Input 
                placeholder='User ID'
              />
              {/* <Select placeholder='Category'>
                <option value='tops'>Tops</option>
                <option value='bottoms'>Bottoms</option>
                <option value='shoes'>Shoes</option>
                <option value='others'>Others</option>
              </Select> */}
              <Input 
                placeholder='e-mail'
              />
              {/* <Select placeholder='Wearing season'>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
              </Select> */}
              {/* <Textarea 
                placeholder='memo'
              /> */}
            </VStack>
          </div>
        </Container>
      </Box>
    </div>
  )
}

export default Mypage