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
  Link
} from "@chakra-ui/core";
import axios from '../utils/axios'
import NextLink from 'next/link'
import Header from  '../components/header'
  
 const Register: React.FC = () => {
  const { handleSubmit, errors, register, formState } = useForm();

  function validateName(value: string) {
    let error;
    if (!value) {
      error = "Name is required";
    } 
    return error || true;
  }
  function validateEmail(value: string) {
    let error;
    if (!value) {
      error = "Email is required";
    } 
    return error || true;
  }
  function validatePassword(value: string) {
    let error;
    if (!value) {
      error = "Password is required";
    } 
    return error || true;
  }

  function onSubmit(values: any) {
    var data = JSON.stringify(values);
    axios.post('/register', data, {
        headers: {
          'Content-Type': 'application/json',
      },
      withCredentials: true,
    }).then(response => {
      if (response.data === "Authorized") {
          window.location.href = "/home"
        }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <>
    <Header/>
    <Box mt={8} mx='auto' maxW={"500px"} w={"100%"} mb={8}>
                              <Heading>Register</Heading>
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name} mt={3}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          name="name"
            placeholder="name"
            autoComplete="name"
          ref={register({ validate: validateName })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.email} mt={3}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          name="email"
            placeholder="email"
            type="email"
            autoComplete="email"
          ref={register({ validate: validateEmail })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password} mt={3}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          name="password"
            placeholder="password"
            type="password"
          ref={register({ validate: validatePassword })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
        </FormControl>
        <Box alignContent="center" mb={3} mt={3}>
              <NextLink href="/login">
                  <Link>Already have an account? Click here to Log in</Link>
                </NextLink>
          </Box>
      <Button
        mt={4}
        variantColor="blue"
        isLoading={formState.isSubmitting}
        type="submit"
      >
          Register
      </Button>
        
      
      </form>
      </Box>
    </>
  );
 }
 export default Register