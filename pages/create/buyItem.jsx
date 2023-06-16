// createitem にしてstateで管理する（buy,recycle, closet)がわかりやすい？

import React, { useState } from 'react'
import Header from '../../components/header'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import styles from '../../styles/Create.module.css'
import { Box, Container, VStack, Input, Select, Textarea, Heading, Button, Spacer, Stack, Spinner } from '@chakra-ui/react';
import { AddIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { storage } from "../../libs/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Resizer from 'react-image-file-resizer';

function BuyItem() {
  // ローディングをしていない状態からスタート
  const [loading, setLoading] = useState(false);
  // uploadが完了したかどうかを監視するstate
  const [isUploaded, setIsUploaded] = useState(false);
  //アップロードされた画像のURLを保持するstate
  const [imageURL, setImageURL] = useState(null);

  //画像をfirebaseStorageへuploadし、uploadしたデータを取得する関数
  //resizeFile関数にて画像データを整形している  
  const FileUpload = async (e) => {
    const file = e.target.files[0];
    console.log("file", file)
    //画像データを整形する
    const resizeFile = (file) =>
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          200,
          200,
          'JPEG',
          80,
          0,
          (uri) => {
            const resizedFile = {
              uri,
              // 元のファイル名を追加
              name: file.name
            };
            resolve(resizedFile);
          },
          'base64',
        );
      });
    try {
      // console.log("file", file)
      const resizedFile = await resizeFile(file);
      // console.log("resizedFile", resizedFile) name取得前はリサイズされた画像データが格納されていた
      //image/階層の中にfile名を入れて保存する
      const storageRef = ref(storage, "image/" + resizedFile.name);
      console.log("resizedFile", resizedFile)
      //画像アップロードする
      const uploadImage = uploadBytesResumable(storageRef, resizedFile);
      uploadImage.on(
        "state_changed",
        (snapshot) => {
          setLoading(true);
        },
        (err) => {
          console.log(err);
        },
        // ローディング完了時
        () => {
          // ローディング状態が終わるのでfalseに戻している
          setLoading(false);
          // アップロードが完了したかどうか確認する
          setIsUploaded(true);
          //アップロードされたファイルへ参照し、URLを取得する
          getDownloadURL(uploadImage.snapshot.ref).then((url) => {
            // url取得に成功した場合はsetImageURLに格納
            setImageURL(url);
          }).catch((error) => {
            console.log(error);
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
    
    

  // 〜〜〜リサイズのコードがない場合は問題なし〜〜〜

  // const FileUpload = (e) => {
  //   // console.log(e.target.files[0].name);
  //   //filesの中の名前とれる filesの0番目のnameの中にfile名がある
  //   const file = e.target.files[0];
  //   // const storageRef = ref(storage, "画像のパス");で保存ができる
  //   //image/階層の中にfile名を入れて保存する
  //   const storageRef = ref(storage, "image/" + file.name );
  //   //↓画像アップロードできる
  //   const uploadImage = uploadBytesResumable(storageRef, file);
  //   uploadImage.on(
  //     // 状態が変更されたときに変えていく↓
  //     "state_changed",
  //     (snapshot) => {
  //       // ローディングをしている(true)
  //       setLoading(true);
  //     },
  //     // エラーだったら。。。
  //     (err) => {
  //       console.log(err);
  //     },
  //     // ローディング完成したら。。。
  //     () => {
  //       // ローディングが終わるのでfalseに戻している
  //       setLoading(false);
  //       // アップロードが完了したかどうか確認する
  //       setIsUploaded(true);
  //       getDownloadURL(uploadImage.snapshot.ref).then((url) => {
  //         setImageURL(url);
  //       }).catch((error) => {
  //         console.log(error);
  //       });
  //     }
  //   );
  // };

  return (
    <>
      { loading ? (
          <>
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
                  <Box>
                    <Stack>
                      <Spinner 
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                      />
                    </Stack>
                    <h2>up loading now</h2> 
                  </Box>
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
        </>

      ) : ( 
        <>
        {isUploaded ? (
          <>
          {/* loading?に対しての時はfalseならアップロード完了
              isUploaded?に対しての時はtrueならアップロード完了  */}
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
                    {/* <div style={{height: "200px", width:"200px"}}> */}
                      {/* ここいらないかも */}
                      <Input 
                        className={styles.imageUploadInput} 
                        //以下追加
                        type='file'
                        accept='.png, .jpeg, .jpg'
                        onChange={FileUpload}
                      />
                      {imageURL && <img src={imageURL} alt="Uploaded" />}
                    {/* </div> */}
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
          </>
        ) : (
          <>
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
                      </div>
                      <Input 
                        className={styles.imageUploadInput} 
                        //以下追加
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
          </>
        )}
      </>
      )}
    </>
  )
}

export default BuyItem