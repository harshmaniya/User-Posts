import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import Input from './useForm/Input'
import Select from './useForm/Select'
import RadioButton from './useForm/RadioButton'
import Button from './useForm/Button'
import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_USER, UPDATE_USER } from '../graphQl/mutation'
import { GET_USER } from '../graphQl/query'
import { toast } from 'react-toastify'
import Checkbox from './useForm/Checkbox'

const Register = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [createUser, { data, error }] = useMutation(CREATE_USER);

    const [UpdateUserByAdmin, { updatedData, updateError }] = useMutation(UPDATE_USER);

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        setValue,
        formState: { errors, dirtyFields },
    } = useForm({
        defaultValues: { firstName: "", lastName: "", email: "", password: "", cpassword: "", gender: false, age: null, dateofbirth: null, hobbies: "" }
    })

    let formattedDateOfBirth;
    const [GetUserByAdmin, { loading, error: geterror, data: getdata, refetch }] = useLazyQuery(GET_USER);

    useEffect(() => {
        if (id) {
            GetUserByAdmin({
                variables: {
                    id
                }
            }).then((res) => {
                console.log("rs: ", res.data);               
                reset(res.data.getUserByAdmin)
                formattedDateOfBirth = res.data.getUserByAdmin.dateofbirth ? new Date(res.data.getUserByAdmin.dateofbirth).toISOString().split('T')[0] : '';
                console.log("formattedDateOfBirth-----------",formattedDateOfBirth);
                setValue("dateofbirth", formattedDateOfBirth)
            })
        }
    }, [])

    const genderOption = ["male", "female"]
    const isActiveOption = [true]   

    const onSubmit = (data) => {

        console.log("active-------------:", data.active);

        if (id) {
            const keys = Object.keys(dirtyFields);
            const filteredObject = Object.fromEntries(
                Object.entries(data).filter(([key]) => keys.includes(key))
            );
            console.log(filteredObject);

            if (filteredObject.active) {
                filteredObject.active = Boolean(filteredObject.active)
            }
            UpdateUserByAdmin({
                variables: {
                    input: {
                        ...filteredObject,
                        age: Number(data.age),
                        _id: id
                    },
                }
            })
                .then((result) => {
                    console.log(result.data);
                    navigate('/admin-dashboard');
                    toast.success("User Updated Successfully!");
                })
                .catch((error) => {
                    console.log(error.message);
                    toast.error(error.message);
                });
        } else {
            if (data.password !== data.cpassword) {
                toast.success("Success Register!");
                return;
            } else {
                delete data.cpassword;
            }

            createUser({
                variables: {
                    input: {
                        ...data,
                        age: Number(data.age)
                    },
                }
            })
                .then((result) => {
                    console.log(result.data);
                    navigate('/login');
                    toast.success("Success Register!");
                })
                .catch((error) => {
                    console.log(error.message);
                    toast.error(error.message);
                });
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-64">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-12">
                        <div className="pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <Input
                                        label={"First Name"}
                                        type={"text"}
                                        className={""}
                                        {...register("firstName", { required: true })}
                                        error={errors.firstName}
                                    />
                                </div>

                                <div className="sm:col-span-3">
                                    <Input
                                        label={"Last Name"}
                                        type={"text"}
                                        className={""}
                                        {...register("lastName", { required: true })}
                                        error={errors.lastName}
                                    />
                                </div>

                                <div className="sm:col-span-4">
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

                                {!id &&
                                    <div className="sm:col-span-4">
                                        <Input
                                            label={"Password"}
                                            type={"password"}
                                            className={""}
                                            {...register("password", {
                                                required: true,
                                                pattern: {
                                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                                                    message: "Password must be at least 8 characters long and include at least one letter and one number."
                                                }
                                            })}
                                            error={errors.password}
                                        />
                                    </div>
                                }

                                {!id &&
                                    <div className="sm:col-span-4">
                                        <Input
                                            label={"Confirm Password"}
                                            type={"password"}
                                            className={""}
                                            {...register("cpassword", {
                                                required: true,
                                                pattern: {
                                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                                                    message: "Password must be at least 8 characters long and include at least one letter and one number."
                                                },
                                                validate: value => value === getValues("password") || "Passwords do not match."
                                            })}
                                            error={errors.cpassword}
                                        />
                                    </div>
                                }


                                {/* {id && <div className="sm:col-span-4">
                                    <Select
                                        label={"isActive"}
                                        options={isActiveOption}                                    
                                        {...register("active", { required: true })}
                                        error={errors.active}
                                    />
                                </div>
                                } */}


                                {id && <div className="sm:col-span-4">
                                    <Checkbox
                                        label={"isActive"}
                                        option={isActiveOption}
                                        {...register("active")}
                                    />
                                </div>
                                }

                                <div className="sm:col-span-4">
                                    <RadioButton
                                        label={"Gender"}
                                        option={genderOption}
                                        name={"gender"}
                                        {...register("gender", { required: true })}
                                        error={errors.gender}
                                    />
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <Input
                                        label={"Age"}
                                        type={"number"}
                                        className={""}
                                        {...register("age", { required: true, min: 18 })}
                                        error={errors.age}
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <Input
                                        label={"Date Of Birth"}
                                        type={"date"}                                       
                                        className={""}
                                        {...register("dateofbirth", { required: true })}
                                        error={errors.dateofbirth}
                                    />
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <Input
                                        label={"Hobbies"}
                                        type={"text"}
                                        className={""}
                                        {...register("hobbies", { required: true })}
                                        error={errors.hobbies}
                                    />
                                </div>

                            </div>
                            {!id && <div className="mt-10">
                                <Button
                                    label={"Register"}
                                    type={"submit"}
                                    className={"flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                                />
                            </div>}

                            {id && <div className="mt-10">
                                <Button
                                    label={"Update"}
                                    type={"submit"}
                                    className={"flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                                />
                            </div>}
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Register;