import { useForm } from "react-hook-form";
import React, { useContext, useState } from "react";
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
import axios from '../utils/axios'
import { UserContext } from '../utils/me'
import Header from '../components/header'
import NextLink from 'next/link'
import { NextPage } from 'next'
const Create : NextPage = () => {
  const { handleSubmit, errors, register, formState } = useForm();
    const user = useContext(UserContext)
    const [isUrl, setUrl] = useState(false)
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
      if (value === 'amazon' || value === 'steam' || value === 'wallmart') {
        setUrl(true)
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
        values['uid'] = user.uid;
        console.log(values);
        var data = JSON.stringify(values);
        axios.post('/v1/jobs', data, {
            headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        }).then(_ => {
            //console.log(response.data)
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
              <Heading>Create an Alert</Heading>
      <FormControl isInvalid={errors.website} mt={3}>
              <FormLabel htmlFor="website">Website</FormLabel>
              <Select
              name="website"
              autoComplete="website"
              ref={register({ validate: validateWebsite })}>
                <option value="amazon">Amazon</option>
                <option value="godaddy">Godaddy</option>
                <option value="steam">Steam</option>
                <option value="craigslist">Craigslist</option>
                <option value="Wallmart">Wallmart</option>
            </Select>
        <FormErrorMessage>
          {errors.website && errors.website.message}
        </FormErrorMessage>
      </FormControl>
            <FormControl isInvalid={errors.url} mt={3}>
              {isUrl === false ?
                <>
        <FormLabel htmlFor="product">Product</FormLabel>
        <Input
            name="product"
            placeholder="product"
            type="text"
          ref={register({ validate: validateProduct })}
        />
        <FormErrorMessage>
          {errors.url && errors.url.message}
                  </FormErrorMessage>
                  </>
                : <>
         <FormLabel htmlFor="product">Product Url</FormLabel>
              <Input
                  name="product"
                  placeholder="Url"
                  type="text"
                ref={register({ validate: validateProduct })}
              />
              <FormErrorMessage>
                {errors.url && errors.url.message}
                        </FormErrorMessage>
                  
                  
                  </>}
                   
              </FormControl>
        <FormControl isInvalid={errors.price} mt={3}>
              <FormLabel htmlFor="price">Price</FormLabel>
              <NumberInput>
                <NumberInputField
                name="price"
                placeholder="Price"
                type="text"
              ref={register({ validate: validatePrice })}
                />
          <NumberInputStepper>
            <NumberIncrementStepper/>
            <NumberDecrementStepper/>
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
export default Create;