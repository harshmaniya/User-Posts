import { useMutation } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import { USER_VERIFICATION, RESEND_VERIFICATION_TOKEN } from "../graphQl/mutation";
import { useEffect, useState } from "react";
import Input from "./useForm/Input";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form"
import Button from "./useForm/Button";

const Verification = () => {
    const navigate = useNavigate()
    const [UserVerification, { data }] = useMutation(USER_VERIFICATION);
    const [ResendVerificationEmail, { loading }] = useMutation(RESEND_VERIFICATION_TOKEN);
    const { token } = useParams()

    const [expiredDialog, setExpiredDialog] = useState(false)
    const [alreadyVerified, setAlreadyVerified] = useState(false)
    const [resend, setResend] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { email: "" }
    })

    const onSubmit = (data) => {    
        ResendVerificationEmail({
            variables: {
                email: data.email
            }
        })
            .then((res) => {            
                if (res.data.resendVerificationEmail) setExpiredDialog(false)
                setResend(true)
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }

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
                if (error.message == "jwt expired") {
                    setExpiredDialog(true)
                } else if (error.message == "USER_VERIFIED") {
                    setAlreadyVerified(true)
                }
                else {
                    navigate("/error")
                }
                console.log(error.message);
            })
    }, [])


    return (
        <>
            {data?.userVerification?.isVerified && <div className="bg-gray-100 h-screen flex items-center justify-center">
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
            </div>}

            {expiredDialog && <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-lg bg-opacity-75">
                <div className="bg-white p-8 rounded shadow-md">
                    <h2 className="text-red-500 text-2xl font-bold mb-4">VERIFICATION LINK IS EXPIRED!</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label={"Email"}
                            type={"email"}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                                    message: "Invalid email address",
                                },
                            })}
                            error={errors.email}
                        />
                        <Button
                            label={"Request for new link!"}
                            className={"mt-5 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"}
                            type={"submit"}
                        />
                        {loading && <svg class="animate-spin inline ml-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>}
                    </form>


                </div>
            </div>}

            {resend && <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-lg bg-opacity-75">
                <div className="bg-white p-8 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Request accepted!</h2>
                    <p className="text-gray-600 mb-1">
                        We have sent a verification email to your registered email address.
                    </p>
                    <p className="text-gray-600 mb-6">
                        Please verify your email to activate your account.
                    </p>
                </div>
            </div>}

            {alreadyVerified && <div className="bg-gray-100 h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green"
                        className="w-16 h-16 mx-auto text-green-500">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 13l4 4L19 7"></path>
                    </svg>
                    <h2 className="text-2xl font-bold text-green-500 mt-4">You are already verified!</h2>
                    <Link to='/login' className="text-blue-500 mt-4 block underline">Continue to Login Page</Link>
                </div>
            </div>}
        </>
    )
}

export default Verification;