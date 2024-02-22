import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import Input from '../useForm/Input'
import Button from '../useForm/Button'
import Loader from '../Loader'

import { GET_POST } from '../../graphQl/query'
import { UPDATE_POST } from '../../graphQl/mutation'
import { useMutation, useQuery } from '@apollo/client';

const UpdatePost = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id)

    const [UpdatePost] = useMutation(UPDATE_POST);

    const { loading, error, data } = useQuery(GET_POST, {
        variables: {
            id: id
        }
    });

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (data) {
            setValue('title', data.getPost.title);
            setValue('description', data.getPost.description);
        }
    }, [data, setValue]);

    console.log(data);

    const onSubmit = (data) => {


        console.log(data);
        UpdatePost({
            variables: {
                input: {
                    _id: id,
                    title: data.title,
                    description: data.description
                },
            }
        })
            .then((result) => {
                console.log(result.data);
                navigate('/userdashboard');
                toast.success("Successful update post!");
            })
            .catch((error) => {
                console.log(error.message);
                toast.error(error.message);
            });
    }
    return (
        <>
            <Button
                label={"back to home"}
                onClick={() => navigate("/userdashboard")}
                className={"flex w-fit m-5 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
            />
            <div className="bg-slate-100 flex max-w-md mx-auto flex-col items-center justify-center shadow-md px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Update Post
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

export default UpdatePost;