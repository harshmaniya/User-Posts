import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../useForm/Button';
import { useMutation, useLazyQuery } from '@apollo/client';
import { UPLOAD_PROFILE } from '../../graphQl/mutation';
import { GET_PROFILE } from '../../graphQl/query';
import { toast } from 'react-toastify';

function ProfilePhoto() {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [filePreview, setFilePreview] = useState('');

    const getBase64 = (file) => {
        return new Promise((resolve) => {
            let baseURL = "";
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log("Called", reader);
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            getBase64(file)
                .then((result) => {
                    setFilePreview(result);
                    setValue("file", result);
                    console.log("base64 : ", result);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const [uploadProfilePhoto] = useMutation(UPLOAD_PROFILE);

    const [getProfile, { loading: profileLoading, error: profileError, data: profileData }] = useLazyQuery(GET_PROFILE);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    useEffect(() => {
        if (profileData?.getProfilePhoto?.url) {
            console.log(profileData.getProfilePhoto.url);
            let tempUrl = "http://localhost:8000/uploads/"+profileData.getProfilePhoto.url
            setFilePreview(tempUrl);
        }
    }, [profileData]);

    const onSubmit = (data) => {
        const file = data.file;
        if (file) {
            uploadProfilePhoto({
                variables: {
                    input: {
                        url: file,
                    },
                },
            })
                .then((response) => {
                    console.log(response);
                    toast.success("Profile pitcher updated")
                })
                .catch((err) => {
                    console.error(err.message);
                    toast.error(err.message)
                });
        } else {
            console.error("No file selected");
        }
    };

    return (
        <div className="max-w-80">
            <h2 className="text-2xl font-bold mb-4">File Upload</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {!filePreview && (
                    <input
                        type="file"
                        {...register('file', { required: 'File is required' })}
                        onChange={handleFile}
                        className="mb-2"
                    />
                )}

                {filePreview && (
                    <div className="mb-3">
                        <img
                            src={filePreview}
                            alt="File Preview"
                            className="w-auto"
                        />
                        <Button
                            className="bg-red-500 text-white px-2 py-1"
                            label="X"
                            onClick={() => {
                                setValue('file', null);
                                setFilePreview('');
                            }}
                        />
                    </div>
                )}
                {errors.file && <p className="text-red-500">{errors.file.message}</p>}
                <Button type="submit" className="bg-blue-500 text-white px-4 py-2" label="Upload File" />               
            </form>
        </div>
    );
}

export default ProfilePhoto;