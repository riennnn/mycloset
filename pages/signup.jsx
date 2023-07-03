import React from 'react'
import { useState } from 'react'
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Text, Input, VStack } from "@chakra-ui/react";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../libs/firebase";
import SignHeader from '../components/signHeader';

const Signup = () => {
  const [formData,setFormData] = useState({
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
  
  const router = useRouter();

  const onSubmitFormData = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword( auth, email, password );
      updateProfile(auth.currentUser, {displayName: name,});
      router.push("/top");
    } catch (error) {
      switch (error.code) {
        case "auth/network-request-failed":
          setError("通信がエラーになったのか、またはタイムアウトになりました。通信環境がいい所で再度やり直してください。");
          break;
        case "auth/weak-password":
          setError("パスワードが短すぎます。6文字以上を入力してください。");
          break;
        case "auth/invalid-email":
          setError("メールアドレスが正しくありません");
          break;
        case "auth/email-already-in-use":
          setError("メールアドレスがすでに使用されています。ログインするか別のメールアドレスで作成してください");
          break;
        default:
          setError("アカウントの作成に失敗しました。通信環境がいい所で再度やり直してください。");
      }
    }
  };
  

  return (
    <>
      <div style={{background:"url(/images/sign.jpg)", backgroundSize: "cover"}}>
        <SignHeader />
        
        <Box height={"calc(80vh - 80px)"} display={"flex"} justifyContent={"center"} alignItems={"center"} className='main'>
          <Box height={"424px"} width={"747px"} mt={"100px"} >
            <Box bg={"rgb(240,248,255, 0.7)"} p={"60px"}  borderRadius={"40px"}>
              <Box p={"6px 32px"} bg={"#00608d"} display={"inline-block"} borderRadius={"40px"}>
                <Text width={"80px"} textAlign={"center"} fontStyle={"Gothic A1"} color={"white"} fontWeight="bold">
                  EMAIL
                </Text>
              </Box>

              <Box mt={"24px"} padding={"0px 50px"} >
                <Text fontWeight="bold" fontStyle={'Gothic A1'}>メールアドレス</Text>
                <Input
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={email}
                  required
                  onChange={(e)=>onChangeFormData(e)}
                  bg={"rgb(240,248,255, 0.6)"} borderRadius={"40px"} />
              </Box>

              <Box mt={"24px"} padding={"0px 50px"}>
                <Text fontWeight="bold" fontStyle={'Gothic A1'}>パスワード</Text>
                <Input
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                  required
                  onChange={(e)=>onChangeFormData(e)}
                  bg={"rgb(240,248,255, 0.6)"} borderRadius={"40px"}/>
              </Box>

              <VStack textAlign={"center"}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button onClick={(e)=>onSubmitFormData(e)} display={"inline-block"} mt={"24px"} color={"white"} bg={"#043c78"} borderRadius={"50px"} height={"60px"} width={"200px"}>
                  SIGN UP
                </Button>
                <Link href="/signin">登録済みのかたはこちらから</Link>
              </VStack>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default Signup;
