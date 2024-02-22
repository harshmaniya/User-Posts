import { toast } from 'react-toastify'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import Input from './useForm/Input'
import Button from './useForm/Button'
import { useMutation } from '@apollo/client';
import { SIGNIN_USER, RESEND_VERIFICATION_TOKEN } from '../graphQl/mutation'
import { useState } from 'react'


const Login = () => {

    const navigate = useNavigate();

    const [verifyDialog, setVerifyDialog] = useState(false)
    const [email, setEmail] = useState('')

    const [Login] = useMutation(SIGNIN_USER);
    const [ResendVerificationEmail, { loading }] = useMutation(RESEND_VERIFICATION_TOKEN);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { email: "", password: "" }
    })

    const handleResend = () => {
        ResendVerificationEmail({
            variables: {
                email
            }
        })
            .then((res) => {
                console.log("resend-----------------", res.data.resendVerificationEmail);
                if (res.data.resendVerificationEmail) toast.success("successfully mail sended")
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }


    const onSubmit = (data) => {

        console.log(data);
        Login({
            variables: {
                input: {
                    ...data
                },
            }
        })
            .then((result) => {
                console.log(result.data);
                localStorage.setItem('token', result.data.login.accessToken)
                localStorage.setItem('roll', result.data.login.roll)              

                if (result.data.login.roll === "user") {
                    navigate('/userdashboard')
                } else if (result.data.login.roll === "admin") {
                    navigate('/admin-dashboard')
                }
                toast.success("login successful!");
            })
            .catch((error) => {
                console.log(error.message);
                toast.error(error.message);
                if (error.message === "NOT_VERIFIED") {
                    setEmail(data.email)
                    setVerifyDialog(true)
                }
            });
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="mt-2">
                                <Input
                                    label={"Email"}
                                    type={"email"}
                                    className={""}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    error={errors.email}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-2">
                                <Input
                                    label={"Password"}
                                    type={"password"}
                                    className={""}
                                    {...register("password", { required: true })}
                                    error={errors.password}
                                />
                            </div>
                            <div className="text-sm text-right">
                                <Link
                                    to="sendforgotpasswordmail"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <div>
                            <Button
                                label={"Sign in"}
                                type={"submit"}
                                className={"flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                            />
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?
                        <Link to="register"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Register Now
                        </Link>
                    </p>
                </div>
            </div>

            {verifyDialog && <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-lg bg-opacity-75">
                <div className="bg-white p-8 rounded shadow-md">
                    <h2 className="text-red-500 text-2xl font-bold mb-4">YOU ARE NOT_VERIFIED</h2>
                    <p className="text-gray-600 mb-1">
                        Please check your email for the message we sent when you registered.
                    </p>
                    <p className="text-gray-600 mb-6">
                        In case you haven't received it or if your email has expired, please request a resend.
                    </p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                        onClick={() => setVerifyDialog(false)}
                    >
                        Okay, got it!
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 mx-5 rounded hover:bg-green-600 focus:outline-none"
                        onClick={() => handleResend()}
                    >
                        Resend
                    </button>
                    {loading && <svg class="animate-spin inline h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>}
                </div>
            </div>}
        </>
    )
}

export default Login;