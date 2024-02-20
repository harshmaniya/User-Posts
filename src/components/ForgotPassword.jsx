import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useParams, useNavigate } from "react-router-dom"
import Input from './useForm/Input'
import Button from './useForm/Button'
import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD } from '../graphQl/mutation'
import { TOKEN_VERIFICATION } from '../graphQl/mutation'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
    
    const navigate = useNavigate()
    const { token } = useParams()
    const [ForgotPassword, { data, loading, error }] = useMutation(FORGOT_PASSWORD);
    const [TokenVerification] = useMutation(TOKEN_VERIFICATION);

    useEffect(() => {
        TokenVerification({
            variables: {
                token
            }
        })
            .then((result) => {
                console.log(result.data.tokenVerification)
                if (!result.data.tokenVerification) navigate('/error')
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { password: "", cpassword: "" }
    })
    const onSubmit = (data) => {
        console.log(data);
        ForgotPassword({
            variables: {
                input: {
                    password: data.password,
                    token
                }
            }
        })
            .then((result) => {
                console.log(result.data);
                toast.success("password updated successfully!")
                navigate("/")
            })
            .catch((error) => {
                console.log(error.message);
                toast.error(error.message)             
            });
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Forgot Password
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="mt-2">
                                <Input
                                    label={"New Password"}
                                    type={"password"}
                                    className={""}
                                    {...register("password", { required: true })}
                                    error={errors.password}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                <Input
                                    label={"Confirm Password"}
                                    type={"password"}
                                    className={""}
                                    {...register("cpassword", { required: true })}
                                    error={errors.cpassword}
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                label={"Forgot"}
                                type={"submit"}
                                className={"flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;