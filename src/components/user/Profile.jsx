import React from 'react';
import { useQuery } from '@apollo/client';
import { USER_PROFILE } from '../../graphQl/query';
import ProfilePhoto from './ProfilePhoto';
import ChangePassword from './ChangePassword';

const Profile = () => {

    const { landing, error, data } = useQuery(USER_PROFILE)

    return (
        <>
            <div className='flex flex-row space-x-12 p-4'>
                {data && data.getUser &&
                    <div className='flex flex-col items-start'>
                        <div className='p-8 justify-start items-start shadow-lg m-3 bg-slate-200'>
                            <div className="px-4 sm:px-0">
                                <h3 className="text-base font-semibold leading-7 text-gray-900">User Information</h3>
                                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details.</p>
                            </div>
                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    {/* Full Name */}
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">First name</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.getUser.firstName}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Last name</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.getUser.lastName}</dd>
                                    </div>
                                    {/* Application For */}
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.getUser.email}</dd>
                                    </div>
                                    {/* Email Address */}
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.getUser.gender}</dd>
                                    </div>
                                    {/* Salary Expectation */}
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Age</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.getUser.age}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Date Of Birth</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.getUser.dateofbirth}</dd>
                                    </div>
                                    {/* About */}
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">CreateAt</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.getUser.createdAt}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">UpdateAt</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.getUser.updatedAt}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                }
                <div className='flex flex-col p-8 mt-4'>
                    <ProfilePhoto />
                </div>
                <div className='flex flex-col p-8 mt-4'>
                    <ChangePassword />
                </div>
            </div>
        </>
    );
}

export default Profile;
