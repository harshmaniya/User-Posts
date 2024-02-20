import { Routes, Route, useNavigate } from 'react-router-dom';
import Authentication from '../utilities/Authentication';
import Login from './Login';
import Register from './Register';
import Verification from './Verification';
import SendForgotPasswordMail from './SendForgotPasswordMail';
import ForgotPassword from './ForgotPassword';
import { useEffect, useState } from 'react';
import Error404 from './Error404';
import PublicAuthentication from '../utilities/PublicAuthentication';

function PublicRoutes() {
    const navigate = useNavigate();
    const roll = localStorage.getItem("roll");
    const [loading, setLoading] = useState(true)
    const [authToken, setAuthToken] = useState('')
    const token = PublicAuthentication()

    useEffect(() => {
        if (!token) {
            setLoading(false)
        }
        if (token) {
            setAuthToken(token)
        }
    }, [token])

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
        </div>
    }

    if (!authToken) {
        return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="sendforgotpasswordmail" element={<SendForgotPasswordMail />} />     
                <Route path='/*' element={<Error404 />} />    
            </Routes>
        );
    }

    try {
        navigate(roll === "admin" ? '/admin-dashboard' : '/userdashboard');
    } catch (error) {
        console.error("Error parsing roll from localStorage:", error);
    }

    return null;
}

export default PublicRoutes;
