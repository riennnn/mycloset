import React from 'react'
import Image from 'next/image';
import { useRouter } from  "next/router";
import Header from '../../components/header'
import styles from '../../styles/Create.module.css'
import useGetItem from '../../hooks/useGetItem';
import { DateDisplay } from '../../components/dateDisplay';
import { Box, Container, VStack, Heading, Button, Spacer } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';


function BuyItem() {
  const router = useRouter();
  const itemId = router.query.id;
  const {image, productName,shopName, category, amount, season, memo, salesStatus, createDate, updateDate} = useGetItem(itemId);
  // console.log(router)

  return (
    <div style={{background:"url(/images/detailWall.jpg)"}}>
      <Header />

      <Box maxW="1080px" margin="0 auto" className='main'>
        <Container w="100%" maxW="1080px">

          <Box display="flex">
            <Heading
              as="h1"
            >
              Item i want...
            </Heading>
            <Spacer />
            <Button 
              rightIcon={<ArrowBackIcon />} 
              colorScheme='blue' 
              variant='outline'
              mr="10px"
              onClick={() => router.push('/buy')}
            >
              Back
            </Button>
            
          </Box>
          
          <br />
          <div className={styles.outerBox}>
            <div className={styles.imageUplodeBox}>
              <Image
                src={image ?? ""}
                alt="Item Image"
                width={300}
                height={300}
              />
            </div>

            <VStack spacing={3} mt="3" width="600px">
              <p>Product Name: {productName}</p>
              <p>Shop Brand: {shopName}</p>
              <p>Category: {category}</p>
              <p>Purchase Amount ¥  {amount}</p>
              <p>Wearing season: {season}</p>
              <p>Memo: {memo}</p>
              <p>Sales Status: {salesStatus}</p>
            </VStack>
          </div>
          <Box display="flex" float="right" mt="10px">
            <Box>
              <p>Create Date:</p>
              <DateDisplay date={createDate}/>
            </Box>
            <Box ml="20px">
              <p>Update Date:</p>
              <DateDisplay date={updateDate}/>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  )
}

export default BuyItem
