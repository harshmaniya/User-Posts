import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import Input from '../useForm/Input'
import Button from '../useForm/Button'
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from '../../graphQl/mutation'

const ChangePassword = () => {

    const navigate = useNavigate();

    const [ChangePassword, { data, error }] = useMutation(CHANGE_PASSWORD);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" }
    })

    const onSubmit = (data) => {

        console.log(data);
        ChangePassword({
            variables: {
                input: {
                    ...data
                },
            }
        })
            .then((result) => {
                console.log(result.data);
                toast.success("Password Change Successfully!");
            })
            .catch((error) => {
                console.log(error.message);
                toast.error(error.message);
            });
    }

    return (
        <>
            <div className="flex flex-col justify-center px-6 py-4 lg:px-8 border-2 -mt-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Change Password
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="mt-2">
                                <Input
                                    label={"Old Password"}
                                    type={"password"}
                                    className={""}
                                    {...register("oldPassword", { required: true })}
                                    error={errors.oldPassword}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-2">
                                <Input
                                    label={"New Password"}
                                    type={"password"}
                                    className={""}
                                    {...register("newPassword", { required: true })}
                                    error={errors.newPassword}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-2">
                                <Input
                                    label={"Confirm Password"}
                                    type={"password"}
                                    className={""}
                                    {...register("confirmPassword", { required: true })}
                                    error={errors.confirmPassword}
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                label={"Update"}
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

export default ChangePassword;