import { useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from "../libs/firebase";
import saveImageData from '../hooks/saveImageData';
import { useFileUpload } from '../hooks/useFileUpload';
import Header from '../components/header'
import styles from '../styles/Create.module.css'
import { Box, Container, VStack, Input, Select, Textarea, Heading, Button, Stack, Spinner, Flex } from '@chakra-ui/react';
import { AddIcon, ArrowBackIcon } from '@chakra-ui/icons';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import useLoggedIn from '../hooks/useLoggedIn';


function CreateItem() {
  const router = useRouter();
  const {
    loading,
    isUploaded,
    imageURL,
    image,
    setImage,
    handleFileUpload,
  } = useFileUpload();
  const isLoggedIn = useLoggedIn();

  const [productName, setProductName] = useState("");
  const [shopName, setShopName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [season ,setSeason] = useState("");
  const [memo, setMemo] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [salesStatus, setSalesStatus] = useState("");

  const resetState = () => {
    setImage("");
    setProductName("");
    setShopName("");
    setCategory("");
    setAmount("");
    setSeason("");
    setMemo("");
    setItemStatus("");
    setSalesStatus("");
  };

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
      await saveImageData(image.name, imageURL);
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
      resetState()
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

  const CATEGORY = [
    {value: "tops", title: "Tops"},
    {value: "bottoms", title: "Bottoms"},
    {value: "shoes", title: "Shoes"},
    {value: "others", title: "Others"},
  ]

  const SEASON = [
    {value: "spring", title: "Spring"},
    {value: "summer", title: "Summer"},
    {value: "autumn", title: "Autumn"},
    {value: "winter", title: "Winter"},
  ]

  const ITEMSTATUS = [
    {value: "have", title: "Have"},
    {value: "buy", title: "Buy"},
    {value: "recycle", title: "Recycle"},
  ]

  const SALESSTATUS = [
    {value: "notStarted", title: "Not started"},
    {value: "uploading", title: "Uploading to the app"},
    {value: "sold", title: "Sold"},
    {value: "wasted", title: "Wasted"},
  ]

  return (
    <div style={{ background: "url(/images/createWall.jpg)" }}>
      <Header />

      <Container 
        maxW="1080px" 
        margin="0 auto" 
        className="createMain"
      >
        <Container 
          w="100%" 
          maxW="1080px"
        >
          <Flex 
            justify="space-between"
            direction={["column", "row"]}
            align={["center", "flex-start"]}
            mt="15px"
          >
            <Heading 
              as="h1"
            >
              New Item
            </Heading>
            <Flex>
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
            </Flex>
          </Flex>

          <br />
          <div className={styles.outerBox} >
            <Flex direction={["column", "row"]}>
              <Box
                alignItems="center" 
                justifyContent="center" 
                display="flex"
                width={["100%", "40%"]}
                mb={["20px", "0"]}
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
                        <input
                          className={styles.imageUploadInput}
                          type="file"
                          accept=".png, .jpeg, .jpg"
                          onChange={handleFileUpload}
                        />
                        {imageURL && (
                          <Image
                            src={imageURL} 
                            alt="Uploaded"
                            width={300}
                            height={300}
                          />
                        )}
                      </>
                    )}
                    {!isUploaded && (
                      <>
                        <input 
                          className={styles.imageUploadInput} 
                          type='file'
                          accept='.png, .jpeg, .jpg'
                          onChange={handleFileUpload}
                        />
                        <div className={styles.imageLogoAndText}>
                          <CameraAltIcon sx={{ fontSize: 150 }} />
                          <h2>New item</h2>
                        </div>
                      </>                
                    )}
                  </div>
                )}
              </Box>
              <Box
                width={["100%", "60%"]}
                ml={["0", "30px"]}
              >
                <VStack spacing={3} mt="3" width={["100%","500px"]}>
                  <Input
                    placeholder="Product Name"
                    type='text'
                    id='productName'
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                  />
                  <Input 
                    placeholder="Shop Brand"
                    type='text'
                    id='shopName' 
                    value={shopName}
                    onChange={e => setShopName(e.target.value)}
                  />
                  <Select 
                    placeholder="Category"
                    id='category'
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    {CATEGORY.map(({value, title}) =><option key={value} value={value}>{title}</option>)
                    }
                  </Select>
                  <Input 
                    placeholder="Purchase Amount ¥" 
                    type='number'
                    id='amount'
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                  />
                  <Select 
                    placeholder="Wearing season"
                    id='season'
                    value={season}
                    onChange={e => setSeason(e.target.value)}
                  >
                    {SEASON.map(({value, title}) =><option key={value} value={value}>{title}</option>)
                    }
                  </Select>
                  <Textarea 
                    placeholder="memo"
                    type='text'
                    id='memo'
                    value={memo}
                    onChange={e => setMemo(e.target.value)}
                  />
                  <Select 
                    placeholder="Item Status"
                    id='itemStatus'
                    value={itemStatus}
                    onChange={e => setItemStatus(e.target.value)}
                  >
                    {ITEMSTATUS.map(({value, title}) =><option key={value} value={value}>{title}</option>)
                    }
                  </Select>
                  <Select 
                    placeholder="Sales Status"
                    id='salesStatus'
                    value={salesStatus}
                    onChange={e => setSalesStatus(e.target.value)}
                  >
                    {SALESSTATUS.map(({value, title}) =><option key={value} value={value}>{title}</option>)
                    }
                  </Select>
                </VStack>
              </Box>
            </Flex>
          </div> 
        </Container>
      </Container>
    </div>
  );
};

export default CreateItem