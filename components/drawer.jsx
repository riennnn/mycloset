import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  Link,
} from '@chakra-ui/react'
import MenuIcon from '@mui/icons-material/Menu';
import { useDisclosure } from '@chakra-ui/react'

function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <Button ref={btnRef} colorScheme='blackAlpha.800' onClick={onOpen}>
        <MenuIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign="center">Menu</DrawerHeader>

          <DrawerBody>
            <VStack spacing="6">
            <Link href='/mypage'><p>my page</p></Link>
            <Link href='/closet'><p>i have...</p></Link>
            <Link href='/buy'><p>i want to buy...</p></Link>
            <Link href='/recycle'><p>i want to recycle...</p></Link>
            <p>log out</p>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            {/* <Button colorScheme='blue'>Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DrawerMenu