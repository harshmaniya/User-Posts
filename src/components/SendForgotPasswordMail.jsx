import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import Input from './useForm/Input'
import Button from './useForm/Button'
import { useMutation } from '@apollo/client';
import { SEND_FORGOT_PASSWORD_MAIL } from '../graphQl/mutation'
import { toast } from 'react-toastify'

const SendForgotPasswordMail = () => {

    const navigate = useNavigate();

    const [SendForgotPasswordMail, { data1, loading, error }] = useMutation(SEND_FORGOT_PASSWORD_MAIL);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: { email: "" }
    })
    const onSubmit = (data) => {
        console.log(data);
        SendForgotPasswordMail({
            variables: {
                email: data.email
            }
        })
            .then((result) => {
                console.log(result.data.sendForgotPasswordMail.status);
                if (result.data.sendForgotPasswordMail.status) {
                    toast.success("Password reset link sent to your email!")
                    reset()
                } else {
                    toast.error("email not registered!")
                    reset()
                }
            })
            .catch((error) => {
                console.log(error.message);
            });

    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Send Forgot Password Mail
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
                                    {...register("email", { required: true })}
                                    error={errors.email}
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                label={'Request forgot password link!'}
                                type={"submit"}
                                className={"rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                            />
                            {loading && <svg class="animate-spin inline ml-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>}
                        </div>
                    </form>


                    {data1 && <h1>{data1.sendForgotPasswordMail.status}</h1>}
                    {error && <h1>error</h1>}
                </div>
            </div>
        </>
    )
}

export default SendForgotPasswordMail;