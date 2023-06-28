import React, { useEffect, useState } from 'react'
import { useRouter } from  "next/router";
import Image from 'next/image';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../libs/firebase';
import Header from '../../../components/header'
import { DateDisplay } from '../../../hooks/dateDisplay';
import styles from '../../../styles/Create.module.css'
import { Box, Container, VStack, Input, Heading, Button, Spacer, Select, Textarea, Stack, Spinner } from '@chakra-ui/react';
import { ArrowBackIcon, ChevronDownIcon, RepeatIcon, TriangleDownIcon } from '@chakra-ui/icons';




function EditClosetItem() {
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
  const [itemStatus, setItemStatus] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [editItem, setEditItem] =  useState({
    image: '',
    productName: '',
    shopName: '',
    category: '',
    amount: '',
    season: '',
    memo: '',
    itemStatus: '',
  });
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const FileUpload = (e) => {
    // console.log(e.target.files[0].name);
    //filesの中の名前とれる filesの0番目のnameの中にfile名がある
    const file = e.target.files[0];
    // const imageRef = ref(storage, "画像のパス");で保存ができる
    //image/階層の中にfile名を入れて保存する
    const imageRef = ref(storage, "image/" + file.name );
    //↓画像アップロードできる
    const uploadImage = uploadBytesResumable(imageRef, file);

    uploadImage.on(
      // 状態が変更されたときに変えていく↓
      "state_changed",
      (snapshot) => {
        // ローディングをしている(true)
        setLoading(true);
      },
      // エラーだったら。。。
      (err) => {
        console.log(err);
      },
      // ローディング完成したら。。。
      async () => {
        // ローディングが終わるのでfalseに戻している
        setLoading(false);
        // アップロードが完了したかどうか確認する
        setIsUploaded(true);
        try {
          const url = await getDownloadURL(uploadImage.snapshot.ref);
          setImageURL(url);
          setImage(file);
        } catch(error) {
          console.log(error);
        }
      }
    );
  };


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
        setItemStatus(data.itemStatus);
        setCreateDate(data.createDate.toDate());
        setUpdateDate(data.updateDate.toDate());
      }
    };

    if (itemId) {
      fetchData();
    }
  }, [itemId]);

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

  useEffect(() => {
    const changeEditItem = () => {
      setEditItem({
        ...editItem,
        image: imageURL,
        productName: productName,
        shopName: shopName,
        category: category,
        amount: amount,
        season: season,
        memo: memo,
        itemStatus: itemStatus,
        imageURL: imageURL,
      });
    };
    changeEditItem();
  }, [image, productName,shopName,category,amount,season,memo,itemStatus, imageURL]);

  //updateボタンを押したときの動作
  const handleEditItem = async (e) => {
    e.preventDefault();

    if (editItem.image.trim() === "") {
      return alert("imageが空です");
    } else if (editItem.productName.trim() === "") {
      return alert("productNameが空です");
    } else if (editItem.shopName.trim() === "") {
      return alert("shopNameが空です");
    } else if (editItem.category.trim() === "") {
      return alert("categoryが空です");
    } else if (editItem.amount.trim() === "") {
      return alert("amountが空です");
    } else if (editItem.season.trim() === "") {
      return alert("seasonが空です");
    } else if (editItem.memo.trim() === "") {
      return alert("memoが空です");
    } else if (editItem.itemStatus.trim() === "") {
      return alert("itemStatusが空です");
    }

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
        updateDate: new Date(),
      });
      console.log("success");
    } catch (error) {
      console.log("error");
    }
    // topページに戻る
    if (itemStatus === "have") {
      router.push('/closet');
    } else if (itemStatus === "buy") {
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
              // mt="30px"
            >
              My Closet Item ...
            </Heading>
            <Spacer />
            <Button 
              rightIcon={<ArrowBackIcon />} 
              colorScheme='blue' 
              variant='outline'
              // mt="32px"
              mr="10px"
              onClick={() => router.push('/closet')}
            >
              Back
            </Button>

            <Button 
              rightIcon={<RepeatIcon />} 
              colorScheme='blue' 
              variant='outline'
              // mt="32px"
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
                            onChange={FileUpload}
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
                            //以下追加
                            type='file'
                            accept='.png, .jpeg, .jpg'
                            onChange={FileUpload}
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

export default EditClosetItem
