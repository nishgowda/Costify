import React from 'react'
import LandingHeader from '../components/LandingHeader';
import {
    Box,
    Flex,
    Heading,
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon,
    Link
}
from '@chakra-ui/core'

const Faq = () => {
  return ( 
    <>
        <LandingHeader />
            <Flex mt={8} align="center">
                        <Heading mx='auto'>
                    FAQ
                        </Heading>
            </Flex>
            
            <Box mt={8} mx='auto' maxW={'500px'} w={'100%'}>
                <Flex align="center">
                <Accordion>
                <AccordionItem>
                    <AccordionHeader>
                    <Box flex="1" textAlign="left">
                        What is Costify?
                    </Box>
                    <AccordionIcon />
                    </AccordionHeader>
                    <AccordionPanel pb={2}>
                                Costify is a service that allows you to track your favorite item's prices
                                and notify you when they're on sale.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader>
                    <Box flex="1" textAlign="left">
                        How?
                    </Box>
                    <AccordionIcon />
                    </AccordionHeader>
                    <AccordionPanel pb={2}>
                                Using free third party API's and some web scraping, Costify grabs the data of your product
                                  periodically and checks the price against your desired price.
                    </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                    <AccordionHeader>
                    <Box flex="1" textAlign="left">
                        Questions?
                    </Box>
                    <AccordionIcon />
                    </AccordionHeader>
                    <AccordionPanel pb={2}>
                                If you have any questions, feel free to email us at 
                                <Link href="mailto:support@tweetcode.ml"> support@tweetcode.ml </Link>
                    </AccordionPanel>
                </AccordionItem>
                </Accordion>
                </Flex>
            </Box>
      </>
  )
}

export default Faq;
