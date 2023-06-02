import { useState } from 'react'

function useToken() {
  
  const getToken = () => {
    const userToken = localStorage.getItem('access_token_cookie')
    return userToken
  }
  
  const [token, setToken] = useState(getToken())

  const saveToken = (userToken) => {
    localStorage.setItem('access_token_cookie', userToken)
    setToken(userToken)
  }


  const removeToken = () => {
    localStorage.removeItem("access_token_cookie")
    setToken(null)
  }

  return {
    setToken: saveToken, token, removeToken
  }

}

export default useToken
