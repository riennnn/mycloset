import { useEffect, useState } from 'react'
import Header from '../components/header'
import styles from '../styles/Mypage.module.css'
import { Box, Container, VStack, Input, Heading, Button, Spacer, Text } from '@chakra-ui/react';
import { ArrowBackIcon, RepeatIcon } from '@chakra-ui/icons';
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../libs/firebase";
import Link from 'next/link';
import { useRouter } from 'next/router';

function Mypage() {
  const router = useRouter();

  const [user, setUser] = useState("");
  const [updatedData, setUpdatedData] = useState({
    username: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUpdatedData({
          username: currentUser.displayName || '',
        });
      }
    });
  }, []);

  const handleFormChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: updatedData.username,
    })
    .then(() => {
      alert("ユーザーネームが更新されました");
      window.location.reload();
    })
    .catch((error) => {
      alert('エラーが発生しました');
    });
  };

  return (
    <>
      { !user ? (
        <Link href='/' />
      ) : (
        <>
          <div style={{background:"url(/images/mypage.jpeg)", backgroundSize: "cover"}}>
            <Header username={updatedData.username} />

            <Box maxW="1080px" margin="0 auto" className='main'>
              <Container w="100%" maxW="1080px">

                <Box display="flex">
                  <Heading
                    as="h1"
                  >
                    My profile ...
                  </Heading>
                  <Spacer />
                  <Button 
                    rightIcon={<ArrowBackIcon />} 
                    colorScheme='brown' 
                    variant='outline'
                    mr="10px"
                    backgroundColor='gray.200'
                    onClick={() => router.push('/top')}
                  >
                    Top Page
                  </Button>
                  <Button 
                    rightIcon={<RepeatIcon />} 
                    colorScheme='brown' 
                    variant='outline'
                    backgroundColor='gray.200'
                    onClick={handleFormSubmit}
                  >
                    Update
                  </Button>
                </Box>
                
                <br />
                <div className={styles.outerBox}>
                  <VStack spacing={3} width="400px">
                    <p>※User Nameのみ更新できます</p>
                    <Text fontWeight="bold">User Name</Text>
                    <Input
                      type="text"
                      placeholder="UserName"
                      id="username"
                      bg="rgb(240,248,255, 0.6)"
                      borderRadius="40px"
                      value={updatedData.username}
                      onChange={handleFormChange}
                    />
                    <Text fontWeight="bold">Mail Address</Text>
                    <Input
                      type="email"
                      placeholder="Email"
                      id="email"
                      bg="rgb(240,248,255, 0.6)"
                      borderRadius="40px" 
                      value={user?.email}
                      readOnly
                    />
                    <Text fontWeight="bold">Password</Text>
                    <Input
                      type="password"
                      placeholder="Password"
                      id="password"
                      bg="rgb(240,248,255, 0.6)"
                      borderRadius="40px" 
                      value="******"
                      readOnly
                    />
                  </VStack>
                </div>
              </Container>
            </Box>
          </div>        
        </>
      )}
    </>
  );
};

export default Mypage