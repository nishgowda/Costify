import { useForm } from "react-hook-form";
import React from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
    Box,
    Heading, Link
} from "@chakra-ui/core";
import NextLink from 'next/link'
import Header from '../components/header'
import axios from '../utils/axios'

 const Login: React.FC = () => {
  const { handleSubmit, errors, register, formState } = useForm();

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
    axios.post('/login', data, {
        headers: {
          'Content-Type': 'application/json',
      },
      withCredentials: true,
    }).then(response => {
        console.log(response.data)
        if (response.data === "Authorized") {
          window.location.href = "/home"
        }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <>
    <Header></Header>
      <Box mt={8} mx='auto' maxW={"500px"} w={"100%"} mb={8}>
                        <Heading>Login</Heading>

    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name} mt={3}>
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
              <NextLink href="/register">
                  <Link>Dont have an account? Click here to Register</Link>
                </NextLink>
          </Box>
        
      <Button
        mt={2}
        variantColor="blue"
        isLoading={formState.isSubmitting}
        type="submit"
      >
        Login
      </Button>
          </form>
      </Box>
</>
  );
 }
export default Login;