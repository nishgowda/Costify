import React from 'react';
import {Flex, Box, Text} from '@chakra-ui/core'

const Footer = () => {
    return (
        <Flex mt={8} align="center" mb={3}>
            <Box mx='auto'>
                <Text fontSize="sm">&copy; 2020 Costify.ga</Text>
            </Box>
        </Flex>
    );
}


export default Footer;
