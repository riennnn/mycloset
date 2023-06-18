// createitem にしてstateで管理する（buy,recycle, closet)がわかりやすい？
//オブジェクトにまとめるとうまくコードに出来なかったので、一旦それぞれのstateを定義して書いた

import React, { useState } from 'react'
import Header from '../../components/header'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import styles from '../../styles/Create.module.css'
import { Box, Container, VStack, Input, Select, Textarea, Heading, Button, Spacer, Stack, Spinner } from '@chakra-ui/react';
import { AddIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { db, storage } from "../../libs/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { saveImageData } from '../../hooks/saveImageData';

function CreateItem() {
  // ローディングをしていない状態からスタート
  const [loading, setLoading] = useState(false);
  // uploadが完了したかどうかを監視するstate
  const [isUploaded, setIsUploaded] = useState(false);
  //アップロードされた画像のURLを保持するstate
  const [imageURL, setImageURL] = useState(null);

  const router = useRouter();

  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const [shopName, setShopName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [season ,setSeason] = useState("");
  const [memo, setMemo] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [items, setItems] = useState([])

  // 〜〜〜リサイズのコードがない場合は問題なし〜〜〜
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageURL.trim() ==="") {
      alert("imageが入力されていません");
      return false;
    }
    if (productName.trim() ==="") {
      alert("productNameが入力されていません");
      return false;
    }
    if (shopName.trim() ==="") {
      alert("shopNameが入力されていません");
      return false;
    }
    if (category.trim() ==="") {
      alert("categoryが選択されていません");
      return false;
    }
    if (amount.trim() ==="") {
      alert("amountが入力されていません");
      return false;
    }
    if (season.trim() ==="") {
      alert("seasonが選択されていません");
      return false;
    }
    if (memo.trim() ==="") {
      alert("memoが入力されていません");
      return false;
    }
    if (itemStatus.trim() ==="") {
      alert("itemStatusが選択されていません");
      return false;
    }
    setItems({
      image:imageURL,
      productName: productName,
      shopName: shopName,
      category: category,
      amount: amount,
      season: season,
      memo: memo,
      itemStatus: itemStatus, 
    });
    try {
      await saveImageData(image.name, imageURL);
      console.log("imageのメタデータがセーブされた");
      await addDoc(collection(db, "items"), {
        image:imageURL,
        productName: productName,
        shopName: shopName,
        category: category,
        amount: amount,
        season: season,
        memo: memo,
        itemStatus: itemStatus,
        createDate: serverTimestamp(),
        updateDate: serverTimestamp(),
      });
      console.log("item のデータがセーブされた");
      setImage("");
      setProductName(""),
      setShopName("");
      setCategory("");
      setAmount("");
      setSeason("");
      setMemo("");
      setItemStatus("");
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

      <Box maxW="1080px" margin="0 auto" className="main">
        <Container w="100%" maxW="1080px">
          <Box display="flex">
            <Heading as="h1">New Item</Heading>
            <Spacer />
            <Button
              rightIcon={<ArrowBackIcon />}
              colorScheme="blue"
              variant="outline"
              // mt="32px"
              mr="10px"
              onClick={() => router.push('/buy')}
            >
              Back
            </Button>
          </Box>

          <br />
          <form onSubmit={handleSubmit}>
            <div className={styles.outerBox} >
              <Box display="flex" >
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
                        <Input 
                          className={styles.imageUploadInput} 
                          //以下追加
                          type='file'
                          accept='.png, .jpeg, .jpg'
                          onChange={FileUpload}
                        />
                        <h2>New item</h2>
                        <div className={styles.imageLogoAndText}>
                          <CameraAltIcon sx={{ fontSize: 40 }} />
                        </div>
                      </>                
                    )}
                  </div>
                )}
                <Button
                  rightIcon={<AddIcon />}
                  colorScheme="gray"
                  color="gray"
                  variant="outline"
                  mt="100px"
                  ml="120px"
                  float="right"
                  type='submit'
                >
                  Add
                </Button>
              </Box>

              <VStack spacing={3} mt="3" width="600px">
                <Input
                  placeholder="Product Name"
                  type='text'
                  // value={formValues.productName}
                  // onChange={e => setFields({productName:e.target.value})}
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                />
                <Input 
                  placeholder="Shop Brand"
                  type='text'
                  // value={formValues.shopName}
                  // onChange={e => setFields({shopName:e.target.value})} 
                  value={shopName}
                  onChange={e => setShopName(e.target.value)}
                />
                <Select 
                  placeholder="Category"
                  // value={formValues.category}
                  // onChange={e => setFields({category:e.target.value})}
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
                  // value={formValues.amount}
                  // onChange={e => setFields({amount:e.target.value})} 
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
                <Select 
                  placeholder="Wearing season"
                  // value={formValues.season}
                  // onChange={e => setFields({season:e.target.value})} 
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
                  // value={formValues.memo}
                  // onChange={e => setFields({memo:e.target.value})} 
                  value={memo}
                  onChange={e => setMemo(e.target.value)}
                />
                <Select 
                  placeholder="Item Status"
                  // value={formValues.itemStatus}
                  // onChange={e => setFields({itemStatus:e.target.value})} 
                  value={itemStatus}
                  onChange={e => setItemStatus(e.target.value)}
                >
                  <option value="have">Have</option>
                  <option value="buy">Buy</option>
                  <option value="recycle">Recycle</option>
                </Select>
              </VStack>
            </div>
          </form>
        </Container>
      </Box>
    </div>
  );
};

export default CreateItem