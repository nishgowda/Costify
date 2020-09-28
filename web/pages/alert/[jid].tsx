import { useForm } from "react-hook-form";
import React, {useState} from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
    Heading,
  Link,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Select,
  useDisclosure
} from "@chakra-ui/core";
import axios from '../../utils/axios'
import Header from '../../components/header'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Alert } from "../../types/job";
import { NextPage } from "next";

interface Job {
  job: Alert[]
}

const Show: NextPage<Job> = ({ job }) => {
  const { onClose } = useDisclosure();
  const { handleSubmit, errors, register, formState } = useForm();
  const router = useRouter();
  const jid = router.query.jid
  const websites = ['amazon', 'godaddy', 'namecheap', 'steam', 'craigslist', 'wallmart']
  const [website, setWebsite] = useState('');
  
    function validateWebsite(value: string) {
        let error;
        if (!value) {
        error = "Website is required";
        }
        return error || true;
    }
    function validateProduct(value: string) {
      let error;
      const itemsToCheck = ['https://amazon.com/', 'https://store.steampowered.com/app/', '.craigslist.org']
        if (!value) {
        error = "Product is required";
        }
        if (website === 'amazon' || website === 'steam' || 'craigslist') {
          const items = itemsToCheck.some(item => value.includes(item));
          if (!items) {
            error = 'A proper url for this website is required';
          }
        }
        return error || true;
    }
  
    function validatePrice(value: number) {
        let error;
        if (!value) {
        error = "Price is required";
        } 
        return error || true;
    }
  const handleWebsite = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setWebsite(website)
  }

  function onSubmit(values: any) {

        var data = JSON.stringify(values);
        axios.put(`/v1/jobs/${jid}`, data, {
            headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        }).then(_ => {
            window.location.href = "/home"
        }).catch(err => {
        console.log(err);
        })
  }

    return (
      <>

        <Header></Header>
        {job.length !== 0 ? 
          <>
            <Box mt={8} mx='auto' maxW={"500px"} w={"100%"} mb={8}>
                <NextLink href="/home">
                    <Link>Back</Link>
                </NextLink>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Heading>Edit this Alert</Heading>
      <FormControl isInvalid={errors.website} mt={3}>
        <FormLabel htmlFor="website">Website</FormLabel>
        <Select
              name="website"
                autoComplete="website"
                onChange={handleWebsite}
                ref={register({ validate: validateWebsite })}>
                {
                  websites.map((site, index) => 
                    <>
                      { site === job[0].website ?
                        <option defaultValue={job[0].website} selected>{job[0].website}</option>
                        :
                        <option  value={site} key={index}>{site}</option>
                      }
                      </>
                )}
            </Select>
        <FormErrorMessage>
          {errors.website && errors.website.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.url} mt={3}>
        <FormLabel htmlFor="product">Product</FormLabel>
        <Input
            name="product"
            placeholder={job[0].product || ''}
            type="text"
          ref={register({ validate: validateProduct })}
        />
        <FormErrorMessage>
          {errors.url && errors.url.message}
        </FormErrorMessage>
              </FormControl>
        <FormControl isInvalid={errors.price} mt={3}>
        <FormLabel htmlFor="price">Price</FormLabel>
        <NumberInput>
                <NumberInputField 
                name="price"
                placeholder={''+job[0].price}
                type="text"
              ref={register({ validate: validatePrice })}
                />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>
          {errors.price && errors.price.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        mt={4}
        variantColor="blue"
        isLoading={formState.isSubmitting}
        type="submit"
      >
                Submit
      </Button>
          </form>
      </Box>
          </>
          : 
          <>
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
            </>
    }
        </>
  );
}

Show.getInitialProps = async (ctx: any) => {
  try {
    const response = await axios({
      method: 'get',
      url: `/v1/jobs/${ctx.query.jid}`,
      headers: {
        'Content-Type': 'application/json',
        cookie: ctx.req ? ctx.req.headers.cookie : undefined,
      },
      withCredentials: true,
    })
    return {
      job: response.data
    }
  } catch (error) {
    return {
      job: []
    }
  };
    
};

export default Show