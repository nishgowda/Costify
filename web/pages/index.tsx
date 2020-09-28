import { Box, Flex, Button, Image, Text, Divider,Grid } from '@chakra-ui/core'
import LandingHeader from '../components/LandingHeader';
import NextLink from 'next/link';
import { NextPage } from 'next'
import FadeIn from 'react-fade-in';
import Footer from '../components/footer'

const IndexPage: NextPage = () => {
  return (
    <>
      <LandingHeader />
      <FadeIn>
        <Flex mt={8} align="center">
            <Box mt={3} mx='auto'>
          <Text  fontSize="6xl" fontWeight="bold">
                Price Tracking made easy.
         </Text> 
          </Box>
          </Flex>
          <Flex mt={8} align="center">
            <Box mt={3} mx='auto'>
         <Text fontSize="3xl">
             Costify lets you know when your favorite items 
              are on sale.
         </Text>
          </Box>
      </Flex>
      <Box mt={8} mx='auto' maxW={"500px"} w={"100%"} mb={20}>
        <Flex align="center">
          <NextLink href="/login">
            <Button mx='auto' size="lg" variantColor="orange" variant="solid">Login</Button>
          </NextLink>
          <NextLink href="/register">
            <Button mx='auto' size="lg" variantColor="orange" variant="outline" >Sign Up</Button>
            </NextLink>

        </Flex>
            
        </Box>


        <Divider />
        <Flex align="center" mt={8}>
          <Box mx='auto'>
          <Text fontSize="3xl">
              Supported Websites
         </Text>
          </Box>
        </Flex>
        <Flex align="center">
        <Box mx='auto' alignItems="center">
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            <Box>
            <Image src="/amazon-logo.png" size="250px" objectFit="contain"></Image>
              </Box>
              <Box >
              <Image src="/steam-logo.png" size="250px" objectFit="contain"></Image>
              </Box>
              <Box>
              <Image src="/go-daddy-logo.png" size="250px" objectFit="contain"></Image>
              </Box>
              <Box>
              <Image src="/namecheap-logo.png" size="250px" objectFit="contain"></Image>
              </Box>
              <Box>
              <Image src="/cragslist-logo.png" size="250px" objectFit="contain"></Image>
              </Box>
            </Grid>
          </Box>
        </Flex>
        <Divider />
         <Footer/>
        </FadeIn>
    </>
  );
}
export default IndexPage;
