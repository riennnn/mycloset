import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { updateProfile } from "firebase/auth";
import { auth } from "../libs/firebase";
import useAuth from '../hooks/useAuth';
import Header from '../components/header'
import styles from '../styles/Mypage.module.css'
import { Container, VStack, Input, Heading, Button,  Text, Flex } from '@chakra-ui/react';
import { ArrowBackIcon, RepeatIcon } from '@chakra-ui/icons';

function Mypage() {
  const router = useRouter();
  const {user, authLoading} = useAuth();
  const [updatedData, setUpdatedData] = useState({
    username: "",
  });

  useEffect(() => {
    if (user) {
      setUpdatedData((prevData) => ({
        ...prevData,
        username: user.displayName || "",
      }));
    }
  },[user]);

  const handleFormChange = (e) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
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

  useEffect(() => {
    if (!user && !authLoading) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  if (user) {
    return (
      <div style={{background:"url(/images/mypage.jpeg)", backgroundSize: "cover"}}>
        <Header username={updatedData.username} />
  
        <Container 
          maxW="1080px" 
          margin="0 auto" 
          className='main'
        >
          <Container 
            w="100%" 
            maxW="1080px"
          >
            <Flex
              justify="space-between"
              direction={["column", "row"]}
              align={["center", "flex-start"]}
            >
              <Heading
                as="h1"
              >
                My profile ...
              </Heading>
              <Flex>
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
              </Flex>
            </Flex>
              
            <br />
            <div className={styles.outerBox}>
              <VStack spacing={3} width={["100%", "400px"]}>
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
        </Container>
      </div>        
    );
  }
}

export default Mypage