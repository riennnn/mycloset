import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Text, Input, VStack, } from "@chakra-ui/react";
import { auth } from "../libs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import SignHeader from "../components/signHeader";

const SignIn = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "", 
    password: "", 
  });
  const { email, password } = formData;
  const [error, setError] = useState('');

  const onChangeFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }


  const onSubmitFormData = async (e) => {
    e.preventDefault();
    
    try {
      const userCredential = await signInWithEmailAndPassword( auth, email, password );

      if (userCredential.user) {
        router.push("/top")
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError('正しいメールアドレスの形式で入力してください。');
          break;
        case 'auth/user-not-found':
          setError('メールアドレスかパスワードに誤りがあります。');
          break;
        case 'auth/wrong-password':
          setError('メールアドレスかパスワードに誤りがあります。');
          break;
        default:
          setError('メールアドレスかパスワードに誤りがあります。');
          break;
      }
    }
  }
  
  return (
    <>
      <div style={{background:"url(/images/sign.jpg)", backgroundSize: "cover"}}>
        <SignHeader />

        <Box 
          display="flex"
          justifyContent="center" 
          alignItems="center"
          className='main'
          p={{ base: "20px", sm: "60px"}}
        >
          <Box
            maxW="747px"
            width="100%" 
            mt={{ base:"50px", sm:"100px"}}
            bg="rgb(240,248,255, 0.7)" 
            p={{ base:"30px", sm:"60px"}} 
            borderRadius="40px"
          >
            <Box 
              padding="0px 50px"
            >
              <Text 
                fontWeight="bold" 
              >
                メールアドレス
              </Text>
              <Input
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                required
                onChange={(e)=>onChangeFormData(e)}
                bg="rgb(240,248,255, 0.6)"
                borderRadius="40px"
              />
            </Box>

            <Box 
              mt="24px" 
              padding="0px 50px"
            >
              <Text 
                fontWeight="bold" 
              >
                パスワード
              </Text>
              <Input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                required
                onChange={(e)=>onChangeFormData(e)}
                bg="rgb(240,248,255, 0.6)"
                borderRadius="40px"
              />
            </Box>

            <VStack textAlign={"center"}>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <Button 
                onClick={(e)=>onSubmitFormData(e)} 
                display="inline-block" 
                mt="24px" 
                color="white" 
                bg="#00608d" 
                borderRadius="50px"
                height="60px" 
                width="200px"
              >
                LOGIN
              </Button>
              <Link href="/signup">登録していないかたはこちらから</Link>
            </VStack>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default SignIn;
