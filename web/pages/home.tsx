import Header from "../components/header"
import React, { useState } from "react"
import axios from '../utils/axios'
import {
  Box,
  Flex,
  Link,
  Heading,
  Stack,
  Text,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  IconButton,
} from '@chakra-ui/core';
import {Alert} from '../types/job'
import NextLink from 'next/link'
import { NextPage } from "next";

interface Jobs {
  jobs: Alert[]
}

const Home: NextPage<Jobs> = ({ jobs }) => {
   
  const { onClose } = useDisclosure();
  const [page, setPage] = useState(1)
  const itemsPerPage = 10;
  let noPages
  if (jobs) {
    noPages = Math.ceil(jobs.length / itemsPerPage);
  } else {
    noPages = 1;
  }

  const handlePage = (event: React.MouseEvent<any, MouseEvent>) => {
    event.preventDefault();
    setPage(page + 1);
  }
  return (
    <>
      <Header></Header>
      <Box mt={8} mx='auto' maxW={"900px"} w={"100%"}>
        <Flex align="center">
           <NextLink href="/create">
            <Button mx='auto' leftIcon="add" variantColor="blue">Create an Alert</Button>
            </NextLink>
        </Flex>
        {jobs !== undefined ?
          <Stack spacing={8}>
            {jobs.slice(0, page * itemsPerPage).map((item: Alert) => (
              <Box mt={3} key={item.jid} p={5} shadow="md" borderWidth="1px">
                <Flex align="center">
                <Heading fontSize="xl" mt={3} mr='auto'>
                  <NextLink href="/alert/[jid]" as={"/alert/" + item.jid}>
                                <Link>
                          {item.product.length > 40 ?  item.product.substring(0, 40) + '...' : item.product}
                    </Link>
                  </NextLink>
                  </Heading>
                  { item.status === 'active'? 
                    <Button variantColor="blue">{item.status}</Button>
                    : item.status === 'processing' ?
                    <Button variantColor="yellow">{item.status}</Button>
                    :
                    <Button variantColor="green">{item.status}</Button>
                   }
                  </Flex>
                <Stat mt={2}>
                  <StatLabel>Price to track:</StatLabel>
                  <StatNumber>${item.price}</StatNumber>
                  <StatHelpText>Created at: {item.created_at}</StatHelpText>
                </Stat>
                <Flex align="center">
                  <Text mt={3} mr='auto'>{item.website}</Text>
                  <NextLink href='/delete/[jid]' as={'/delete/' + item.jid}>
                    <IconButton aria-label="delete" variantColor="red" icon="delete" as={Link}></IconButton>
                    </NextLink>
                  </Flex>
              </Box>
            ))}
        
            <Box mx="auto">
              {jobs.length > itemsPerPage && (page !== noPages) && noPages !== 0 ?
                <Button onClick={handlePage}>Load More</Button>
                : <> </>}
            </Box>
          </Stack>
          : <> 
            <Modal closeOnOverlayClick={false} isOpen={true} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Unauthorized!</ModalHeader>
                <ModalBody pb={6}>
                  <Text>Please Log in to continue</Text>
                </ModalBody>
      
                  <ModalFooter>
                    <NextLink href="/login">
                  <Button mr={3} as={Link}>
                        Login
                  </Button>
                    </NextLink>
                    <NextLink href="/register">
                  <Button mr={3} as={Link}>
                        Register
                  </Button>
                  </NextLink>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>}
        </Box>
      </>
  )
}
Home.getInitialProps = async (ctx: any) => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/v1/me/jobs',
      headers: {
        'Content-Type': 'application/json',
         cookie: ctx.req ? ctx.req.headers.cookie : undefined,
      },
      withCredentials: true,
    })
    return {
      jobs: response.data
    }
  } catch (error) {
    return {
      jobs: undefined
    }

  }

        
};

export default Home;