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

    const [CreatePost, { data, error }] = useMutation(CREATE_POST);

    const {
        register,
        watch,
        setValue,
        reset,
        setFocus,
        clearErrors,
        touchedFields,
        getValues,
        setError,
        handleSubmit,
        formState: { isLoading, isValid, isDirty, isSubmitted, isSubmitSuccessful, errors },
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
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
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