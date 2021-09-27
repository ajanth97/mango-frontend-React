import React from "react"
import {useUser} from "../../hooks/useUser"
import {StyledSpinnerNext} from 'baseui/spinner';


const MyAccount = () => {
    const {user, isLoading, isError} = useUser()

    return(
        <React.Fragment>
        {
        isLoading ? (
            <StyledSpinnerNext/>
        ) 
        : 
        isError ? (
            <div>
                Failed to fetch Account data
            </div>        
        )    
        :
        (
           <div>
               {JSON.stringify(user)}
           </div> 
        )
        }    
        </React.Fragment>    
    )
    
}

export default MyAccount