import { useMutation } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import { USER_VERIFICATION } from "../graphQl/mutation";
import { useEffect } from "react";

const Verification = () => {
    const navigate = useNavigate()
    const [UserVerification] = useMutation(USER_VERIFICATION);
    const { token } = useParams()

    useEffect(() => {
        UserVerification({
            variables: {
                input: {
                    token
                },
            },
        })
            .then((result) => {
                console.log(result.data);
                if (!result.data.userVerification.isVerified) navigate("/error")
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, [])


    return (
        <>
            <div className="bg-gray-100 h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green"
                        className="w-16 h-16 mx-auto text-green-500">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 13l4 4L19 7"></path>
                    </svg>
                    <h2 className="text-2xl font-bold text-green-500 mt-4">Verification Successful!</h2>
                    <p className="text-gray-600 mt-2">Thank you for verifying your account.</p>
                    <Link to='/login' className="text-blue-500 mt-4 block underline">Continue to Login Page</Link>
                </div>
            </div>
        </>
    )
}

export default Verification;