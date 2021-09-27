import React from "react"
import {Input} from 'baseui/input'

import {
    Card,
    StyledBody,
    StyledAction
  } from "baseui/card";
import { Button } from "baseui/button";
import { Layer } from "baseui/layer";
import {Link, navigate} from "gatsby"
import axios from "axios";
import {FormControl} from 'baseui/form-control';
import {validate as validateEmail} from 'email-validator'


const fetcher = (...args) => fetch(...args).then(res => res.json())

const Login = () => {
const [respData, setRespData] = React.useState({data:null, loading:false, errorData:null})
const [email, setEmail] = React.useState('')
const [password, setPassword] = React.useState('')
const [isValid, setIsValid] = React.useState(false)
const [isVisited, setIsVisited] = React.useState(false) 
const shouldShowEmailError = !isValid && isVisited
const isLoading = respData.loading
const postError = respData.errorData !== null

const payloadData = {emailAddress: email, password: password}

const endpoint = 'https://secnds-server.herokuapp.com/login'

const googleLogin = () => {
  window.location.assign("https://secnds-server.herokuapp.com/auth/google")
}

const onChangeEmail = ({target: {value}}) => {
  setIsValid(validateEmail(value))
  setEmail(value)
}

const onChangePassword = ({target: {value}}) => {
  setPassword(value)
}

const onSubmit = (e) => {
  e.preventDefault()
  postData()   
}

const postData = () => {
  setRespData((oldRespData) => ({...oldRespData, loading:true}))
  axios.post(endpoint,payloadData)
  .then(({data}) =>{
    setRespData((oldRespData) => ({...oldRespData, loading: false, errorData: null, data: data}))
    localStorage.setItem('token', data.token)
    navigate('/app/', {state : {data}})
  } 
  ).catch((error) => {
    setRespData((oldRespData) => ({...oldRespData, loading: false, data:null, errorData: error.response.data}))
  })
}

/*
const postData = () => {
  setRespData({...respData, loading: true})
  fetch('https://secnds-server.herokuapp.com/login',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payloadData),
  })
  .then(response =>{ 
    setRespData({...respData, status: response.status})
    return response.json()
  })
  .then(data => {
    setRespData({...respData, data: data, loading:false})
      navigate('/', respData)
    
  })
  .catch(error => {
    setRespData({...respData, error: error, loading: false})
  })
}
*/
  return(
        <Layer>
        <Card
        overrides={{Root: {style: {width: '600px', textAlign: 'center', margin: 'auto', marginTop: '40px'}}}}
        title="Log in"
      >
       <form onSubmit={onSubmit}>
        <FormControl label="Please log in to your secnds account" error={shouldShowEmailError ? 'Please enter a valid Email' : postError ? 'Invalid Email or Password': null}>
        <React.Fragment>
        <StyledBody>
        <Input placeholder="Email Address" value={email} onChange={onChangeEmail} onBlur={() => {setIsVisited(true)}} error={shouldShowEmailError || postError}/>
        <br/>
        <Input placeholder="Password" type="password" onChange={onChangePassword} error={postError}/>
        <br/>
        If you are new here <Link to="/signup">Sign up</Link>
        </StyledBody>
        <StyledAction>
          {isLoading ? 
          (<Button isLoading type="submit" overrides={{BaseButton: {style: {width: '100%'}}}}>
          Log in
        </Button>) : (
          <Button type="submit" disabled={shouldShowEmailError} overrides={{BaseButton: {style: {width: '100%'}}}}>
          Log in
        </Button>
        )
        }
        </StyledAction>
        </React.Fragment>
        </FormControl>
      </form>
      OR
      <br/>
      <br/>
      <Button onClick={googleLogin} overrides={{BaseButton: {style: {width: '100%'}}}}>Log in with Google</Button>
      <br/>  
      <br/>
      <Button overrides={{BaseButton: {style: {width: '100%'}}}}>Log in with Facebook</Button>
      </Card>
      </Layer>
  )   
}

export default Login