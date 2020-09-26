import { Box, Link, Flex, Button, Heading, Image} from '@chakra-ui/core'
import axios from '../utils/axios'
import React, { useContext } from 'react'
import NextLink from 'next/link'
import { UserContext } from '../utils/me'

const Header = () => {
    const user = useContext(UserContext)

    const handleLogout = (event: React.MouseEvent<any, MouseEvent>) => {
        event.preventDefault();
        axios.get('/logout', {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }).then(response => {
            console.log(response.data);
            window.location.href="/login"
        })
    }
    
    return (
        <Flex zIndex={1} position="relative" bg="orange.200" top={0} p={4}>
      <Flex flex={1} m="auto" align="center" maxW={1200}>
        <NextLink href="/" >
          <Link>
                        <Image src='/Costify-Logo.png' alt="logo" size="15%" objectFit="contain"></Image>
                    </Link>
            </NextLink>
            
                <Box ml={"auto"}>
                {user.auth === true ?
                    <>
                        <Flex>
                            <Heading mr={3}  size='md'>{user.name}</Heading>
                            <Button variant="link"  onClick={handleLogout}>Logout</Button>
                    </Flex>
                    </> : 
                    <>
                    <NextLink href="/login">
                            <Link  mr={3} color="white">Login</Link>
                        </NextLink>
                        <NextLink href="/register">
                            <Link>Register</Link>
                                </NextLink>
                                </>
                        }
            </Box>
      </Flex>
    </Flex>
               
    )
}

export default Header