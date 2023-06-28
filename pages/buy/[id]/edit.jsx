// showをそのままコピー
import React, { useEffect, useState } from 'react'
import Header from '../../components/header'
import styles from '../../styles/Create.module.css'
import { Box, Container, VStack, Input, Heading, Button, Spacer } from '@chakra-ui/react';
import { ArrowBackIcon, RepeatIcon } from '@chakra-ui/icons';
import { useRouter } from  "next/router";
import { db } from '../../libs/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import { DateDisplay } from '../../hooks/dateDisplay';


function BuyItem() {
  const router = useRouter();
  const itemId = router.query.id;
  // console.log(router)

  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const [shopName, setShopName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [season ,setSeason] = useState("");
  const [memo, setMemo] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "items", itemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setImage(data.image);
        setProductName(data.productName);
        setShopName(data.shopName);
        setCategory(data.category);
        setAmount(data.amount);
        setSeason(data.season);
        setMemo(data.memo);
        setCreateDate(data.createDate.toDate());
        setUpdateDate(data.updateDate.toDate());
      }
    };

    if (itemId) {
      fetchData();
    }
  }, [itemId]);
  
  return (
    <div style={{background:"url(/images/detailWall.jpg)"}}>
      <Header />

      <Box maxW="1080px" margin="0 auto" className='main'>
        <Container w="100%" maxW="1080px">

          <Box display="flex">
            <Heading
              as="h1"
              // mt="30px"
            >
              Item i want...
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
              rightIcon={<RepeatIcon />} 
              colorScheme='blue' 
              variant='outline'
              // mt="32px"
            >
              Update
            </Button>
          </Box>
          
          <br />
          <div className={styles.outerBox}>
            <div className={styles.imageUplodeBox}>
              <Image
                src={image}
                alt="Item Image"
                width={300}
                height={300}
              />
              <Input className={styles.imageUploadInput} />
            </div>

            <VStack spacing={3} mt="3" width="600px">
              <p>Product Name: {productName}</p>
              <p>Shop Brand: {shopName}</p>
              <p>Category: {category}</p>
              <p>Purchase Amount ¥  {amount}</p>
              <p>Wearing season: {season}</p>
              <p>Memo: {memo}</p>
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
