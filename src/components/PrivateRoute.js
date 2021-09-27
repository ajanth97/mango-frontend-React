import React from "react"
import { navigate } from "gatsby"
import { useUser } from "../hooks/useUser"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    const {user, isLoading, isError} = useUser()
    if (isError && location.pathname !== `/login`) {
    navigate("/login")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute