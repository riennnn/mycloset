import React from 'react'
import Header from '../../components/header'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import styles from '../../styles/Create.module.css'
import { Box, Container, VStack, Input, Select, Textarea, Heading, Button, Spacer } from '@chakra-ui/react';
import { AddIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { storage } from "../../libs/firebase";
import { ref, uploadBytes } from 'firebase/storage';

function BuyItem() {
  const FileUpload = (e) => {
    // console.log(e.target.files[0].name);
    //ここまではOK 名前とれる
    const file = e.target.files[0];
    const storageRef = ref(storage, "image/" + file.name );
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  };

  return (
    <div style={{background:"url(/images/createWall.jpg)"}}>
      <Header />

      <Box maxW="1080px" margin="0 auto" className='main'>
        <Container w="100%" maxW="1080px">

          <Box display="flex">
            <Heading
              as="h1"
              // mt="30px"
            >
              i want to buy ...
            </Heading>
            <Spacer />
            <Button 
              rightIcon={<ArrowBackIcon />} 
              colorScheme='blue' 
              variant='outline'
              // mt="32px"
              mr="10px"
            >
              Back
            </Button>
            <Button 
              rightIcon={<AddIcon />} 
              colorScheme='blue' 
              variant='outline'
              // mt="32px"
            >
              Add new
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
              <Input 
                className={styles.imageUploadInput} 
                type='file'
                accept='.png, .jpeg, .jpg'
                onChange={FileUpload}
              />
            </div>
            <VStack spacing={3} mt="3" width="600px">
              <Input 
                placeholder='Product Name'
              />
              <Input 
                placeholder='Shop Brand'
              />
              <Select placeholder='Category'>
                <option value='tops'>Tops</option>
                <option value='bottoms'>Bottoms</option>
                <option value='shoes'>Shoes</option>
                <option value='others'>Others</option>
              </Select>
              <Input 
                placeholder='Purchase Amount ¥'
              />
              <Select placeholder='Wearing season'>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
              </Select>
              <Textarea 
                placeholder='memo'
              />
            </VStack>
          </div>
        </Container>
      </Box>
    </div>
  )
}

export default BuyItem