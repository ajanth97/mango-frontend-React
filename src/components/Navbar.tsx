import React from "react"
import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationList,
    StyledNavigationItem
  } from "baseui/header-navigation";
  import { StyledLink } from "baseui/link";
  import { Button } from "baseui/button";
  import { Layer } from "baseui/layer";
  import {StatefulSelect as Search, TYPE} from 'baseui/select';
  import {Link} from "gatsby"
  import {useUser} from "../hooks/useUser"

  const ITEMS = [
    {label: 'My Account'},
    {label: 'Log out'},
  ]

const Navbar = () => {
const {user, isLoading, isError} = useUser()
    return (
        <header>          
                <Layer>
                <HeaderNavigation>
                    <StyledNavigationList $align={ALIGN.left}>
                        <StyledNavigationItem>
                            <Link to="/">
                            <img src="https://ik.imagekit.io/fxfinewfg0/logo_X2CX0Y4X_H.svg"
                            width="150"
                            height="50"
                            />
                            </Link>
                        </StyledNavigationItem>
                    </StyledNavigationList>
                    <StyledNavigationList $align={ALIGN.center}>
                        <Search type={TYPE.search}/>
                    </StyledNavigationList>    
                    <StyledNavigationList $align={ALIGN.right}>
                        <StyledNavigationItem>
                        <StyledLink href="#basic-link1">
                            Tab Link One
                        </StyledLink>
                        </StyledNavigationItem>
                        <StyledNavigationItem>
                        <StyledLink href="#basic-link2">
                            Tab Link Two
                        </StyledLink>
                        </StyledNavigationItem>
                    </StyledNavigationList>
                    <StyledNavigationList $align={ALIGN.right}>                        
                        <StyledNavigationItem>
                        {isLoading ? 
                        (<Button isLoading></Button>) 
                        :
                        isError ? (
                        <Link to="/login">
                            <Button>Log in</Button>
                        </Link>
                        ) :(
                        <React.Fragment>
                            <Link to="/login">
                                <Button>Hi, {user.firstName}</Button>
                            </Link>
                        </React.Fragment>
                        )
                        }
                        
                        
                        </StyledNavigationItem>
                    </StyledNavigationList>
                    </HeaderNavigation>
             </Layer>
        </header>
    )
}

export default Navbar