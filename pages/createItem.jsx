import { useState } from 'react'
import { useRouter } from 'next/router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from "../libs/firebase";
import { UseSaveImageData } from '../hooks/useSaveImageData';
import { UseFileUpload } from '../hooks/useFileUpload';
import Header from '../components/header'
import styles from '../styles/Create.module.css'
import { Box, Container, VStack, Input, Select, Textarea, Heading, Button, Spacer, Stack, Spinner } from '@chakra-ui/react';
import { AddIcon, ArrowBackIcon } from '@chakra-ui/icons';
import CameraAltIcon from '@mui/icons-material/CameraAlt';


function CreateItem() {
  const {
    loading,
    isUploaded,
    imageURL,
    image,
    setImage,
    handleFileUpload,
  } = UseFileUpload();

  const router = useRouter();

  const [productName, setProductName] = useState("");
  const [shopName, setShopName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [season ,setSeason] = useState("");
  const [memo, setMemo] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [salesStatus, setSalesStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !image.name) {
        alert("imageが入力されていません");
        return false;
      }
      const fields = [
        { value: productName.trim(), label: "productNameが入力されていません" },
        { value: shopName.trim(), label: "shopNameが入力されていません" },
        { value: category.trim(), label: "categoryが選択されていません" },
        { value: amount.trim(), label: "amountが入力されていません" },
        { value: season.trim(), label: "seasonが選択されていません" },
        { value: memo.trim(), label: "memoが入力されていません" },
        { value: itemStatus.trim(), label: "itemStatusが選択されていません" },
        { value: salesStatus.trim(), label: "salesStatusが選択されていません" },
      ];
      for (const field of fields) {
        if (field.value === "") {
          alert(field.label);
          return false;
        }
      }

    try {
      await UseSaveImageData(image.name, imageURL);
      await addDoc(collection(db, "items"), {
        image:imageURL,
        productName: productName,
        shopName: shopName,
        category: category,
        amount: amount,
        season: season,
        memo: memo,
        itemStatus: itemStatus,
        salesStatus: salesStatus,
        createDate: serverTimestamp(),
        updateDate: serverTimestamp(),
      });
      setImage("");
      setProductName(""),
      setShopName("");
      setCategory("");
      setAmount("");
      setSeason("");
      setMemo("");
      setItemStatus("");
      setSalesStatus("");
      if (itemStatus === "have") {
        router.push('/closet');
      } else if (itemStatus === "buy") {
        router.push('/buy');
      } else {
        router.push('/recycle');
      }
    } catch (error){
      console.error("Error:", error); 
      }
  };

  return (
    <div style={{ background: "url(/images/createWall.jpg)" }}>
      <Header />

      <Box maxW="1080px" margin="0 auto" className="createMain">
        <Container w="100%" maxW="1080px">

          <Box display="flex" mt="5">
            <Heading 
              as="h1"
            >
              New Item
            </Heading>
            <Spacer />
            <Button
              rightIcon={<ArrowBackIcon />}
              colorScheme="blue"
              variant="outline"
              mr="10px"
              onClick={() => router.push('/top')}
            >
              Back
            </Button>

            <Button
              rightIcon={<AddIcon />}
              colorScheme="blue"
              variant="outline"
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Box>

          <br />
          <div className={styles.outerBox} >
            <Box display="flex" >
              <Box
                alignItems="center" 
                justifyContent="center" 
                display="flex"
                width="40%"
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
                          style={{margin: "0 auto"}}
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
                        <Input 
                          className={styles.imageUploadInput} 
                          type='file'
                          accept='.png, .jpeg, .jpg'
                          onChange={handleFileUpload}
                        />
                        <h2>New item</h2>
                        <div className={styles.imageLogoAndText}>
                          <CameraAltIcon sx={{ fontSize: 150 }} />
                        </div>
                      </>                
                    )}
                  </div>
                )}
              </Box>
              <Box
                width="60%"
                ml="30px"
              >
                <VStack spacing={3} mt="3" width="500px">
                  <Input
                    placeholder="Product Name"
                    type='text'
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                  />
                  <Input 
                    placeholder="Shop Brand"
                    type='text' 
                    value={shopName}
                    onChange={e => setShopName(e.target.value)}
                  />
                  <Select 
                    placeholder="Category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    <option value="tops">Tops</option>
                    <option value="bottoms">Bottoms</option>
                    <option value="shoes">Shoes</option>
                    <option value="others">Others</option>
                  </Select>
                  <Input 
                    placeholder="Purchase Amount ¥" 
                    type='text'
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                  />
                  <Select 
                    placeholder="Wearing season"
                    value={season}
                    onChange={e => setSeason(e.target.value)}
                  >
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                    <option value="autumn">Autumn</option>
                    <option value="winter">Winter</option>
                  </Select>
                  <Textarea 
                    placeholder="memo"
                    type='text'
                    value={memo}
                    onChange={e => setMemo(e.target.value)}
                  />
                  <Select 
                    placeholder="Item Status"
                    value={itemStatus}
                    onChange={e => setItemStatus(e.target.value)}
                  >
                    <option value="have">Have</option>
                    <option value="buy">Buy</option>
                    <option value="recycle">Recycle</option>
                  </Select>
                  <Select 
                    placeholder="Sales Status"
                    value={salesStatus}
                    onChange={e => setSalesStatus(e.target.value)}
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
        </Container>
      </Box>
    </div>
  );
};

export default CreateItem