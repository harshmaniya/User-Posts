import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function PublicAuthentication() {
    const [authToken, setAuthToken] = useState();
    // console.log("🚀 ~ PrivateRoute ~ authToken:", authToken);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem("token")
    //   console.log("🚀 ~ useEffect ~ token:", token);
      if (token) {
        // console.log("Token found, setting authToken:", token);
        setAuthToken(token);
      }
    }, []);
    return authToken
  }
  
  export default PublicAuthentication