import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Authentication() {
    const [authToken, setAuthToken] = useState();
    // console.log("🚀 ~ PrivateRoute ~ authToken:", authToken);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem("token")
    //   console.log("🚀 ~ useEffect ~ token:", token);
      if (token) {
        // console.log("Token found, setting authToken:", token);
        setAuthToken(token);
      } else {
        navigate('/');
        // console.log("No token found.");
      }
    }, []);
    return authToken
  }
  
  export default Authentication