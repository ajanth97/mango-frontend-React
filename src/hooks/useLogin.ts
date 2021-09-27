import { useEffect, useState } from "react";

export function useLogin(reqData){

const [respData, setRespData] = useState({data:null, status: 0, error: null, loading: true})

    useEffect(() => {
    fetch('https://secnds-server.herokuapp.com/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(reqData),
      })
      .then(response =>{ 
        setRespData({...respData, status: response.status})
        console.log(response.status)
        return response.json()
      })
      .then(data => {
        setRespData({...respData, data: data, loading:false})
        console.log('Success:', data)
    })
      .catch(error => {
        setRespData({...respData, error: error, loading: false})
        console.log('Error:',error)
      })
    
      return () => {}
},[])
    return respData
}