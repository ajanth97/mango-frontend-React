import React from "react"
import { useFormik } from "formik";
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input'
import {validate as validateEmail} from 'email-validator'
import {
    Card,
    StyledBody,
    StyledAction
  } from "baseui/card";
import { Button } from "baseui/button";
import { Layer } from "baseui/layer";
import {Link, navigate} from "gatsby"
import axios from "axios";

import { isName } from "../utils/isName";
import { isEmptyObject } from "../utils/isEmptyObject";

const validate = values => {
  
  const required = 'Required !'
  const invalidName = 'Please enter a valid name'
  const invalidEmail = 'Please enter a valid email'
  const passwordMismatch = 'Passwords do not match'
  const passwordShort = 'Password should be atleast 8 characters long'
  const errors = {}
  if(!values.firstName){
    errors.firstName = required
  }
  else if (!isName(values.firstName)){
    errors.firstName = invalidName 
  }

  if (!values.lastName){
    errors.lastName = required
  }
  else if(!isName(values.lastName)){
    errors.lastName = invalidName
  }

  if (!values.email){
    errors.email = required
  }
  else if (!validateEmail(values.email)){
    errors.email = invalidEmail
  }

  if (!values.password){
    errors.password = required
  }
  else if ((values.password).length < 8){
    errors.password = passwordShort
  }
  
  if (!values.confirmPassword){
    errors.confirmPassword = required
  }
  else if((values.confirmPassword !== values.password)){
    errors.password = passwordMismatch
    errors.confirmPassword = passwordMismatch
  }

  return errors
}

const endpoint = 'https://mango-backend.herokuapp.com/api/signup'



const Signup = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [postError, setPostError] = React.useState({})
  const submit = values => {
    setIsLoading(true)
    const body = values
    axios.post(endpoint, body)
      .then(({data}) => {
        localStorage.setItem('token', data.token)
        navigate('/app/', {state : {data}})      
      })
      .catch((error) => {
        const errorResp = error.response.data
        const errors = errorResp.errors
        setPostError(errors)
        setIsLoading(false)
      })
  }
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validate,
    onSubmit: submit
  });  

  const emailError = postError.email ? postError.email.msg : formik.touched.email ? formik.errors.email : null
  return(
        <Layer>
          <Card
          overrides={{Root: {style: {width: '600px', margin: 'auto', marginTop: '20px'}}, Title: { style : { textAlign : 'center'}}}}
          title="Sign up"
          >
          <form onSubmit={formik.handleSubmit}>
          <React.Fragment>
         <div style={{textAlign: 'center'}}>
         Let's create your mango account
         </div>
          <StyledBody>        
          <FormControl label="First Name" error={formik.touched.firstName ? formik.errors.firstName : null}>
          <Input name="firstName" placeholder="First Name" onChange={formik.handleChange} value={formik.values.firstName} error={formik.touched.firstName ? formik.errors.firstName : null} onBlur={formik.handleBlur}/>
          </FormControl>
          <FormControl label="Last Name" error={formik.touched.firstName ? formik.errors.lastName : null}>
          <Input name="lastName" placeholder="Last Name" onChange={formik.handleChange} value={formik.values.lastName} error={formik.touched.firstName ? formik.errors.lastName : null} onBlur={formik.handleBlur}/>
          </FormControl>
          <FormControl label="Email" error={emailError}>
          <Input name="email" placeholder="Email Address" onChange={formik.handleChange} value={formik.values.email} error={emailError} onBlur={formik.handleBlur}/>
          </FormControl>
          <FormControl label="Password" error={formik.touched.password ? formik.errors.password : null}>
          <Input name="password" placeholder="Password" type="password" onChange={formik.handleChange} value={formik.values.password} error={formik.touched.password ? formik.errors.password : null} onBlur={formik.handleBlur}/>
          </FormControl>
          <FormControl label="Confirm password" error={formik.touched.confirmPassword ? formik.errors.confirmPassword : null}>
          <Input name="confirmPassword" placeholder="Confirm password" type="password" onChange={formik.handleChange} value={formik.values.confirmPassword} error={formik.touched.confirmPassword ? formik.errors.confirmPassword : null} onBlur={formik.handleBlur}/>
          </FormControl>
          <br/>
          <div style={{textAlign: 'center'}}>
          Already have an account ? <Link to="/login">Log in</Link>  
          </div>
          </StyledBody>
          <StyledAction>
            <Button overrides={{BaseButton: {style: {width: '100%'}}}} disabled={!isEmptyObject(formik.errors)} isLoading={isLoading}>
              Sign up
            </Button>
          </StyledAction>
          </React.Fragment>
          </form>
        </Card>
      </Layer>
  )   
}

export default Signup