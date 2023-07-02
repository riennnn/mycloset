import React, { useEffect } from 'react'
import { useRouter } from  "next/router";
import Image from 'next/image';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../libs/firebase';
import Header from '../../../components/header'
import { DateDisplay } from '../../../components/dateDisplay';
import styles from '../../../styles/Create.module.css'
import { Box, Container, VStack, Input, Heading, Button, Spacer, Select, Textarea, Stack, Spinner } from '@chakra-ui/react';
import { ArrowBackIcon, ChevronDownIcon, RepeatIcon } from '@chakra-ui/icons';
import { UseFileUpload } from '../../../hooks/useFileUpload';
import useGetItemData from '../../../hooks/useGetItemData';


function EditRecycleItem() {
  const router = useRouter();
  const itemId = router.query.id;
  // console.log(router)
  const {
    loading,
    isUploaded,
    imageURL,
    image,
    setImage,
    handleFileUpload,
  } = UseFileUpload();
  const {
    productName,
    setProductName,
    shopName,
    setShopName,
    category,
    setCategory,
    amount,
    setAmount,
    season,
    setSeason,
    memo,
    setMemo,
    itemStatus,
    setItemStatus,
    salesStatus,
    setSalesStatus,
    createDate,
    updateDate,
    editItem,
    setEditItem,
  } = useGetItemData(itemId, image, setImage);

   //入力したimage保持（画面上）
  const handleChangeImage = (e) => {
    const file = e.target.value[0];
    const imageURL = URL.createObjectURL(file);
    setImage(imageURL);
  }

  //入力したproductName保持（画面上）
  const handleChangeProductName = (e) => {
    setProductName(e.target.value);
  }

   //入力したshopName保持（画面上）
  const handleChangeShopName = (e) => {
    setShopName(e.target.value);
  }

  //入力したcategory保持（画面上）
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  }
  
   //入力したamount保持（画面上）
  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  }

  //入力したseason保持（画面上）
  const handleChangeSeason = (e) => {
    setSeason(e.target.value);
  }

   //入力したmemo保持（画面上）
  const handleChangeMemo = (e) => {
    setMemo(e.target.value);
  }

   //入力したitemStatus保持（画面上）
  const handleChangeItemStatus = (e) => {
    setItemStatus(e.target.value);
  }

   //入力したsalesStatus保持（画面上）
  const handleChangeSalesStatus = (e) => {
    setSalesStatus(e.target.value);
  }

  useEffect(() => {
    const changeEditItem = () => {
      setEditItem((prevEditItem) => {
        return {
          ...prevEditItem,
        image: imageURL || prevEditItem.image,
        productName: productName,
        shopName: shopName,
        category: category,
        amount: amount,
        season: season,
        memo: memo,
        itemStatus: itemStatus,
        salesStatus: salesStatus,
        imageURL: imageURL,
        }
      });
    };
    changeEditItem();
  }, [image, productName,shopName,category,amount,season,memo,itemStatus, salesStatus, imageURL]);

  //updateボタンを押したときの動作
  const handleEditItem = async (e) => {
    e.preventDefault();

    if (
      (editItem.image.trim() === "" || editItem.image === imageURL) &&
      editItem.productName.trim() === "" &&
      editItem.shopName.trim() === "" &&
      editItem.category.trim() === "" &&
      editItem.amount.trim() === "" &&
      editItem.season.trim() === "" &&
      editItem.memo.trim() === "" &&
      editItem.itemStatus.trim() === "" &&
      editItem.salesStatus.trim() === "" 
    ) {
      return alert("変更内容がありません");
    }

    if (
      editItem.productName.trim() === "" ||
      editItem.shopName.trim() === "" ||
      editItem.category.trim() === "" ||
      editItem.amount.trim() === "" ||
      editItem.season.trim() === "" ||
      editItem.memo.trim() === "" ||
      editItem.itemStatus.trim() === "" ||
      editItem.salesStatus.trim() === ""
    ) {
      return alert("全てのフィールドを入力してください");
    }

    const image = editItem.image && editItem.image.trim() === "" ? image : editItem.image;

    try {
      const docRef = doc(db, 'items', itemId);
      await updateDoc(docRef, {
        image: editItem.image,
        productName: editItem.productName,
        shopName: editItem.shopName,
        category: editItem.category,
        amount: editItem.amount,
        season: editItem.season,
        memo: editItem.memo,
        itemStatus: editItem.itemStatus,
        salesStatus: editItem.salesStatus,
        updateDate: new Date(),
      });
      console.log("success");
    } catch (error) {
      console.log("error");
    }
    // topページに戻る
    if (editItem.itemStatus === "have") {
      router.push('/closet');
    } else if (editItem.itemStatus === "buy") {
      router.push('/buy');
    } else {
      router.push('/recycle');
    }
  }

  


  return (
    <div style={{background:"url(/images/detailWall.jpg)"}}>
      <Header />

      <Box maxW="1080px" margin="0 auto" className='main'>
        <Container w="100%" maxW="1080px">

          <Box display="flex" mt="3">
            <Heading
              as="h1"
            >
              Item to Recycle ...
            </Heading>
            <Spacer />
            <Button 
              rightIcon={<ArrowBackIcon />} 
              colorScheme='blue' 
              variant='outline'
              mr="10px"
              onClick={() => router.push('/recycle')}
            >
              Back
            </Button>

            <Button 
              rightIcon={<RepeatIcon />} 
              colorScheme='blue' 
              variant='outline'
              onClick={handleEditItem}
            >
              Update
            </Button>
          </Box>
          
          <br />
          <div className={styles.outerBox}>
            <Box display="flex">
              <Box 
                alignItems="center" 
                justifyContent="center" 
                display="flex"
                width="50%"
              >
                {loading ? (
                    <div className={styles.imageUplodeBox}>
                      <Box>
                        <Stack>
                          <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                          />
                        </Stack>
                        <h2>loading now</h2>
                      </Box>
                    </div>
                  ) : (
                    <div className={styles.imageUplodeBox}>
                      {isUploaded && (
                        <>
                          <Input
                            className={styles.imageUploadInput}
                            type="file"
                            accept=".png, .jpeg, .jpg"
                            onChange={handleFileUpload}
                          />
                          {imageURL && <img src={imageURL} alt="Uploaded" />}
                        </>
                      )}
                      {!isUploaded && (
                        <>
                          <Image
                            src={image}
                            alt="Item Image"
                            width={300}
                            height={300}
                          />
                          <Input 
                            className={styles.imageUploadInput} 
                            value={image}
                            onChange={handleChangeImage}
                          />
                          <Input 
                            className={styles.imageUploadInput} 
                            type='file'
                            accept='.png, .jpeg, .jpg'
                            onChange={handleFileUpload}
                          />
                        </>                
                      )}
                    </div>
                  )}
              </Box>
              <Box
                width="50%"
              >
                <VStack spacing={3} mt="3" width="600px">
                  <div>Product Name</div>
                  <Input 
                    value={productName} 
                    onChange={handleChangeProductName} 
                    className={styles.editChapter}
                  />
                  <div>Shop Brand</div>
                  <Input 
                    value={shopName} 
                    onChange={handleChangeShopName} 
                    className={styles.editChapter}
                  />
                  <div>Category</div>
                  <Select 
                    value={category} 
                    onChange={handleChangeCategory}  
                    icon={<ChevronDownIcon />} 
                    width="400px"  
                    border="2px dashed #2d6395"
                  >
                    <option value="tops">Tops</option>
                    <option value="bottoms">Bottoms</option>
                    <option value="shoes">Shoes</option>
                    <option value="others">Others</option>
                  </Select>
                  <div>Purchase Amount ¥ </div>
                  <Input 
                    value={amount} 
                    onChange={handleChangeAmount} 
                    className={styles.editChapter}
                  />
                  <div>Wearing season</div> 
                  <Select 
                    value={season} 
                    onChange={handleChangeSeason} 
                    icon={<ChevronDownIcon />} 
                    width="400px"  
                    border="2px dashed #2d6395"
                  >
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                    <option value="autumn">Autumn</option>
                    <option value="winter">Winter</option>
                  </Select>  
                  <div>Memo</div>
                  <Textarea 
                    value={memo} 
                    onChange={handleChangeMemo} 
                    className={styles.editChapter}
                  />
                  <div>Item Status</div>
                  <Select 
                    value={itemStatus} 
                    onChange={handleChangeItemStatus} 
                    icon={<ChevronDownIcon />} 
                    width="400px"  
                    border="2px dashed #2d6395"
                  >
                    <option value="have">Have</option>
                    <option value="buy">Buy</option>
                    <option value="recycle">Recycle</option>
                  </Select>
                  <div>Sales Status</div>
                  <Select 
                    value={salesStatus} 
                    onChange={handleChangeSalesStatus} 
                    icon={<ChevronDownIcon />} 
                    width="400px"  
                    border="2px dashed #2d6395"
                  >
                    <option value="notStarted">Not started</option>
                    <option value="uploading">Uploading to the app</option>
                    <option value="sold">Sold</option>
                    <option value="wasted">Wasted</option>
                  </Select>
                </VStack>
              </Box>
            </Box>
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

export default EditRecycleItem
