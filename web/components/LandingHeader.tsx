import React from 'react';
import { Flex, Link, Box, Image } from '@chakra-ui/core';
import NextLink from 'next/link';

const LandingHeader = () => {
    return (
        <Flex zIndex={1} position="sticky" top={0} p={4}>
            <Flex flex={1} m="auto" align="center" maxW={1200}>
                <NextLink href="/" >
                    <Link>
                        <Image src='/Costify-Logo.png' alt="logo" size="20%" objectFit="contain"></Image>
                    </Link>
                </NextLink>
                <Box ml={"auto"}>
                    <NextLink href="/">
                        <Link mr={3}>Home</Link>
                    </NextLink>
                    <NextLink href="/faq">
                        <Link>Faq</Link>
                    </NextLink>
                </Box>
            </Flex>
        </Flex>
    );
}

export default LandingHeader;