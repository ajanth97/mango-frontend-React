import React from "react"
import { Router } from "@reach/router"
import LandingPage from "../components/dynamic-pages/LandingPage"
import PrivateRoute from "../components/PrivateRoute"
import MyAccount from "../components/dynamic-pages/MyAccount"

const App = () => (
    <Router basepath="/app">
        <PrivateRoute path="/myaccount" component={MyAccount}/>
        <LandingPage path="/"/>
    </Router>
)

export default App