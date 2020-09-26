import { Box, Flex, Button, Heading } from '@chakra-ui/core'
import LandingHeader from '../components/LandingHeader';
import NextLink from 'next/link';

const IndexPage = () => {
  return (
    <>
      <LandingHeader />
      <Flex mt={8} align="center">
        <Heading mx='auto'>
          Price Tracking made easy
                        </Heading>
      </Flex>
      <Box mt={8} mx='auto' maxW={"500px"} w={"100%"}>
        <Flex align="center">
          <NextLink href="/login">
            <Button mx='auto' size="lg" variantColor="orange" variant="outline">Login</Button>
          </NextLink>
          <NextLink href="/register">
            <Button mx='auto' size="lg" variantColor="orange" variant="outline" >Register</Button>
          </NextLink>
        </Flex>

      </Box>
    </>
  );
}
export default IndexPage;
