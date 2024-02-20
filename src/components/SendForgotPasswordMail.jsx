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

    const [SendForgotPasswordMail, { data1, loading ,error }] = useMutation(SEND_FORGOT_PASSWORD_MAIL);

    const {
        register,
        handleSubmit,
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
                if(result.data.sendForgotPasswordMail.status){
                    toast.success("mail sended")
                }else{
                    toast.error("email not registered!")
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
                                label={"Send Mail"}
                                type={"submit"}
                                className={"flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                            />
                        </div>
                    </form>
                    
                    {loading && <h1>Loading...</h1>}
                    {data1 && <h1>{ data1.sendForgotPasswordMail.status }</h1>}
                    {error && <h1>error</h1>}
                </div>
            </div>
        </>
    )
}

export default SendForgotPasswordMail;