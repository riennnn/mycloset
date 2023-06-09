import Image from 'next/image';
import { useRouter } from  "next/router";
import useLoggedIn from '../../hooks/useLoggedIn';
import useGetItem from '../../hooks/useGetItem';
import Header from '../../components/header'
import { DateDisplay } from '../../components/dateDisplay';
import styles from '../../styles/Create.module.css'
import { Box, Container, VStack, Heading, Button, Flex } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';


function BuyItem() {
  const router = useRouter();
  const itemId = router.query.id;
  const {image, productName,shopName, category, amount, season, memo, salesStatus, createDate, updateDate} = useGetItem(itemId);
  const isLoggedIn = useLoggedIn();


  return (
    <div style={{background:"url(/images/detailWall.jpg)"}}>
      <Header />

      <Container 
        maxW="1080px" 
        margin="0 auto" 
        className='main'
      >
        <Container w="100%" maxW="1080px">
          <Flex
            justify="space-between"
            direction={["column", "row"]}
            align={["center", "flex-start"]}
          >
            <Heading
              as="h1"
            >
              Item i want...
            </Heading>
            <Button 
              rightIcon={<ArrowBackIcon />} 
              colorScheme='blue' 
              variant='outline'
              mr="10px"
              onClick={() => router.push('/buy')}
            >
              Back
            </Button>
          </Flex>
          
          <br />
          <Box className={styles.outerBox}>
            {image && (
              <div className={styles.imageUplodeBox}>
                <Image
                  src={image ?? ""}
                  alt="Item Image"
                  width={300}
                  height={300}
                />
              </div>
            )}

            <VStack spacing={3} mt="3" width={["100%","600px"]}>
              <p>Product Name: {productName}</p>
              <p>Shop Brand: {shopName}</p>
              <p>Category: {category}</p>
              <p>Purchase Amount ¥  {amount}</p>
              <p>Wearing season: {season}</p>
              <p>Memo: {memo}</p>
              <p>Sales Status: {salesStatus}</p>
            </VStack>
          </Box>
          <Flex 
            mt="10px"
            justify={["center", "flex-end"]}
          >
            <Box>
              <p>Create Date:</p>
              <DateDisplay date={createDate}/>
            </Box>
            <Box ml="20px">
              <p>Update Date:</p>
              <DateDisplay date={updateDate}/>
            </Box>
          </Flex>
        </Container>
      </Container>
    </div>
  );
};

export default BuyItem;
