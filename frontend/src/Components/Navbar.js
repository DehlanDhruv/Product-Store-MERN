import { Button, Container, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {PlusSquareIcon , useColorMode } from '@chakra-ui/icons';
import {IoMoon} from 'react-icons/io5'
import {LuSun} from 'react-icons/lu'
import React from 'react';
import { MdOutlineHome } from "react-icons/md";


const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container maxW={"1140px"} px={2} >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "row",
          sm: "row",
        }}
      >
        <Link to={"/"}>
          <Button>
            <MdOutlineHome size={20}/>
          </Button>
        </Link>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/createPage"}>
            <Button marginRight={5} > 
                <PlusSquareIcon size={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <IoMoon size={20}/> : <LuSun size={20} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
