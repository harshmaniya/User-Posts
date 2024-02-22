import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import Input from '../useForm/Input'
import Button from '../useForm/Button'
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../../graphQl/mutation'

const CreatePost = () => {

    const navigate = useNavigate();

    const [CreatePost] = useMutation(CREATE_POST);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { title: "", description: "" }
    })

    const onSubmit = (data) => {

        console.log(data);
        CreatePost({
            variables: {
                input: {
                    ...data
                },
            }
        })
            .then((result) => {
                console.log(result.data);
                navigate("/userdashboard");
                toast.success("Post created Successfully!");
            })
            .catch((error) => {
                console.log(error.message);
                toast.error(error.message);
            });
    }

    return (
        <>
            <div>
                <Button
                    label={"back to home"}
                    onClick={()=> navigate("/userdashboard")}
                    className={"flex w-fit m-5 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                />
            </div>
            <div className="bg-slate-100 flex max-w-md mx-auto flex-col items-center justify-center shadow-md px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create Post
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="mt-2">
                                <Input
                                    label={"Title"}
                                    type={"text"}
                                    className={""}
                                    {...register("title", { required: true })}
                                    error={errors.title}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-2">
                                <Input
                                    label={"Description"}
                                    type={"text"}
                                    className={""}
                                    {...register("description", { required: true })}
                                    error={errors.description}
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                label={"Create"}
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

export default CreatePost;