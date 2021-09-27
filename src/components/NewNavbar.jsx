import * as React from 'react';
import {useStyletron} from 'baseui';
import {StyledLink} from 'baseui/link';
import {Button} from 'baseui/button';
import {Layer} from 'baseui/layer';
import {ChevronDown, Delete, Overflow, Upload} from 'baseui/icon';
import {AppNavBar, setItemActive} from 'baseui/app-nav-bar';
import { navigate } from 'gatsby';
import Plus from 'baseui/icon/plus'
import {useUser} from "../hooks/useUser"
import Spinner from 'baseui/icon/spinner'

export const NewNavbar = () => {
  const {user, isLoading, isError} = useUser()
  const [css] = useStyletron();
  const [mainItemsLoggedIn, setMainItemsLoggedIn] = React.useState([
    {icon: Overflow, label: 'Home'},
  ]);
  const [mainItems, setMainItems] = React.useState([
    {icon: Overflow, label: 'Home'},
    {icon: Overflow, label: 'Log in'},
  ])
  
  const [userItems, setUserItems] = React.useState([
    {icon: Overflow, label: 'My Account'},
    {icon: Overflow, label: 'Log out'},
  ]); 

  function handleMainItemSelect(item) {
    setMainItems(prev => setItemActive(prev, item));
    setMainItemsLoggedIn(prev => setItemActive(prev, item))
    if (item.label === 'Log in'){
        navigate('/login')
    }
    if (item.label === 'Home'){
        navigate('/app/')
    }
  }

  function handleUserItemSelect(item){
      if (item.label === 'Log out'){
          localStorage.removeItem('token')
          navigate('/app/')  
      }

      if (item.label === 'My Account'){
          navigate('/app/myaccount')
      }

  }

  return (
    <React.Fragment>
        <Layer>         
            {(isLoading || isError) ? (
                <AppNavBar
                title={
                <React.Fragment>
                    <img src="https://ik.imagekit.io/fxfinewfg0/logo_X2CX0Y4X_H.svg"
                    width="150"
                    height="50"
                    />
                </React.Fragment>}
                mainItems={mainItems}
                onMainItemSelect={handleMainItemSelect}
            />   
            ) : (
                <AppNavBar
              title={
              <React.Fragment>
                  <img src="https://ik.imagekit.io/fxfinewfg0/logo_X2CX0Y4X_H.svg"
                   width="150"
                   height="50"
                  />
              </React.Fragment>}
              mainItems={mainItemsLoggedIn}
              userItems={userItems}
              onMainItemSelect={handleMainItemSelect}
              onUserItemSelect={handleUserItemSelect}
              username={user.firstName}
              usernameSubtitle="5.0"
              userImgUrl=""
            />
            )           
            }
            
        </Layer>
    </React.Fragment>
  );
}