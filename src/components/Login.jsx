import { toast } from 'react-toastify'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import Input from './useForm/Input'
import Button from './useForm/Button'
import { useMutation } from '@apollo/client';
import { SIGNIN_USER } from '../graphQl/mutation'
import { useState } from 'react'


const Login = () => {

    const navigate = useNavigate();

    const [Login, { data, error }] = useMutation(SIGNIN_USER);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { email: "", password: "" }
    })

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
                // console.log("time");            

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
        </>
    )
}

export default Login;