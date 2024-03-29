import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import Input from './useForm/Input'
import RadioButton from './useForm/RadioButton'
import Button from './useForm/Button'
import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_USER, UPDATE_USER, UPDATE_PROFILE } from '../graphQl/mutation'
import { GET_USER, GER_USER_INFO } from '../graphQl/query'
import { toast } from 'react-toastify'
import Checkbox from './useForm/Checkbox'

const Register = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [isUser, setIsUser] = useState(false)
    const [verifyDialog, setVerifyDialog] = useState(false)

    const [createUser] = useMutation(CREATE_USER);
    const [UpdateUserByAdmin] = useMutation(UPDATE_USER);
    const [UpdateUser] = useMutation(UPDATE_PROFILE);


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
    const [GetUser] = useLazyQuery(GER_USER_INFO);

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
                console.log("formattedDateOfBirth-----------", formattedDateOfBirth);
                setValue("dateofbirth", formattedDateOfBirth)
            })
        } else if (localStorage.getItem('roll') === 'user') {
            setIsUser(true)
            GetUser()
                .then((res) => {
                    console.log("rs: ", res.data);
                    reset(res.data.getUser)
                    formattedDateOfBirth = res.data.getUser.dateofbirth ? new Date(res.data.getUser.dateofbirth).toISOString().split('T')[0] : '';
                    console.log("formattedDateOfBirth-----------", formattedDateOfBirth);
                    setValue("dateofbirth", formattedDateOfBirth)
                })
        }
    }, [])

    const genderOption = ["male", "female"]
    const isActiveOption = [true]

    const onSubmit = (data) => {
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
        } else if (localStorage.getItem('roll') === 'user') {
            const keys = Object.keys(dirtyFields);
            const filteredObject = Object.fromEntries(
                Object.entries(data).filter(([key]) => keys.includes(key))
            );
            console.log(filteredObject);

            if (filteredObject.age) {
                filteredObject.age = Number(filteredObject.age)
            }
            UpdateUser({
                variables: {
                    input: {
                        ...filteredObject
                    },
                }
            })
                .then((result) => {
                    console.log(result.data);
                    navigate(-1);
                    toast.success("Profile Updated Successfully!");
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
                    setVerifyDialog(true)
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

                                {!isUser && <div className="sm:col-span-4">
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
                                </div>}

                                {!isUser && !id &&
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

                                {!isUser && !id &&
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
                                    />
                                    {errors.age && errors.age.type === "min" ? (
                                        <span className="text-red-500">Age must be 18 or older</span>
                                    ) : <span className="text-red-500">Age is required</span>}
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
                            <div className="mt-10">
                                <Button
                                    label={isUser || id ? `Update` : `Register`}
                                    type={"submit"}
                                    className={"flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>


            {verifyDialog && <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-lg bg-opacity-75">
                <div className="bg-white p-8 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
                    <p className="text-gray-600 mb-1">
                        We have sent a verification email to your registered email address.
                    </p>
                    <p className="text-gray-600 mb-6">
                        Please verify your email to activate your account.
                    </p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                        onClick={() => navigate('/')}
                    >
                        Okay, got it!
                    </button>
                </div>
            </div>}
        </>
    )
}
export default Register;