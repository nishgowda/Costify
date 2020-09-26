import { useForm } from "react-hook-form";
import React from "react";
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
  Select
} from "@chakra-ui/core";
import axios from '../../utils/axios'
import Header from '../../components/header'
import NextLink from 'next/link'
import { useRouter } from 'next/router'


const Job = ({ job }: any) => {
  const { handleSubmit, errors, register, formState } = useForm();
  const router = useRouter();
  const jid = router.query.jid
  const websites = ['amazon', 'godaddy', 'namecheap', 'steam', 'craigslist', 'wallmart']
  function validateWebsite(value: string) {
        let error;
        if (!value) {
        error = "Website is required";
        } 
        return error || true;
    }
    function validateProduct(value: string) {
        let error;
        if (!value) {
        error = "Product is required";
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
                ref={register({ validate: validateWebsite })}>
                {
                  websites.map((site, index) => 
                    <>
                      { site === job[0].website ?
                        <option defaultValue={job[0].website} key={index} selected>{job[0].website}</option>
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
                placeholder={job[0].price}
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
  );
}

Job.getInitialProps = async (ctx: any) => {
  const response = await axios({
    method: 'get',
    url: `/v1/jobs/${ctx.query.jid}`,
    headers: ctx.req ? {
      cookie: ctx.req.headers.cookie,
      'Content-Type': 'application/json',
    } : undefined,
    withCredentials: true,
  })
    if (response) {
        return {
            job: response.data
          }
    } else {
        return {
            jobs: []
        }
    }

}

export default Job