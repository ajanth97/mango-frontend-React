import React from "react"
import {Input} from 'baseui/input'
import {
    Card,
    StyledBody,
    StyledAction
  } from "baseui/card";
import { Button } from "baseui/button";
import { Layer } from "baseui/layer";
import {Link} from "gatsby"



const Signup = () => {
    return(
        <Layer>
        <Card
        overrides={{Root: {style: {width: '600px', textAlign: 'center', margin: 'auto', marginTop: '20px'}}}}
        title="Sign up"
      >
        <StyledBody>
          Please sign in to your secnds account
        <Input placeholder="First Name"/>
        <br/>
        <Input placeholder="Last Name"/>
        <br/>
        <Input placeholder="Email Address"/>
        <br/>
        <Input placeholder="Password" type="password"/>
        <br/>
        <Input placeholder="Confirm password" type="password"/>
        <br/>
        Already have an account ? <Link to="/login">Log in</Link>  
        </StyledBody>
        <StyledAction>
          <Button overrides={{BaseButton: {style: {width: '100%'}}}}>
            Sign up
          </Button>
        </StyledAction>
      </Card>
      </Layer>
  )   
}

export default Signup