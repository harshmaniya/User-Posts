import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USERS, GET_USERS_PAGINATION } from '../../graphQl/query'
import { DELETE_USER } from '../../graphQl/mutation'
import { useEffect, useState } from 'react';
import Pagination from '../user/Pagination';
import debounce from 'debounce';

const DeleteUserModal = ({ id, onClose, onDelete }) => {
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Delete account</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">Are you sure you want to delete user account?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button" onClick={() => onDelete(id)} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Delete</button>
                            <button type="button" onClick={() => onClose()} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GetUsers = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState({ column: 'createdAt', order: 'asc' });
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteID] = useState("");

    const handleOpenModal = (id) => {
        setDeleteID(id);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const [DeleteUserByAdmin] = useMutation(DELETE_USER);
    const handleDeleteModal = () => {
        DeleteUserByAdmin({
            variables: {
                id: deleteId
            }
        })
            .then((result) => {
                console.log(result.data);
                setIsModalOpen(false);
                refetch()
                toast.success("Successfully Deleted!", {
                    position: toast.POSITION.TOP_CENTER,
                });
            })
            .catch((error) => {
                console.log(error.message);
                toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
    };

    const { loading, error, data, refetch } = useQuery(GET_USERS_PAGINATION, {
        variables: {
            input: {
                limit: 2,
                page: currentPage,
                sortBy: sortBy.column,
                order: sortBy.order,
                search
            }
        }, fetchPolicy: 'network-only'
    });

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    const totalPages = data?.getUsersByAdminPaginated?.totalPages;



    const handleDebounce = debounce((value) => {
        setSearch(value);
    }, 1000);

    const handleSearch = (e) => {
        const inputValue = e.target.value;
        handleDebounce(inputValue);
    };


    useEffect(() => {
        refetch();
    }, [currentPage, sortBy]);

    const handleSort = (column) => {
        setSortBy({
            column,
            order: sortBy.column === column ? sortBy.order === 'asc' ? 'desc' : 'asc' : 'asc',
        });
        setCurrentPage(1)
        // handlePageChange(1)
    };

    // console.log(data?.getUsersByAdmin);
    // if (!data) {
    //     return (
    //         <>
    //             <h1 className='text-4xl flex justify-center'>Users not available!</h1>
    //         </>
    //     )
    // }

    return (
        <>
            {/* {loading && <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12">
                </div>
            </div>} */}

            <div className="overflow-x-auto">
                <div className="relative flex justify-end mb-3">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        onChange={(e) => handleSearch(e)}
                    />
                    {/* <button
                        className="absolute right-0 top-0 mt-2 mr-2 text-gray-600 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button> */}
                </div>

                <table className="table-auto min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 bg-gray-100 border border-gray-200">No.</th>

                            <th onClick={() => handleSort('firstName')} className="px-4 py-2 bg-gray-100 border border-gray-200">First Name
                                {sortBy.column === 'firstName' && sortBy.order === 'desc' && < svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                                </svg>}
                                {sortBy.column === 'firstName' && sortBy.order === 'asc' && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                                </svg>}
                            </th>
                            <th onClick={() => handleSort('lastName')} className="px-4 py-2 bg-gray-100 border border-gray-200 ">Last Name
                                {sortBy.column === 'lastName' && sortBy.order === 'desc' && < svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                                </svg>}
                                {sortBy.column === 'lastName' && sortBy.order === 'asc' && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                                </svg>}
                            </th>
                            <th onClick={() => handleSort('email')} className="px-4 py-2 bg-gray-100 border border-gray-200 ">Email {sortBy.column === 'email' && sortBy.order === 'desc' && < svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                            </svg>}
                                {sortBy.column === 'email' && sortBy.order === 'asc' && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                                </svg>}
                            </th>
                            <th onClick={() => handleSort('gender')} className="px-4 py-2 bg-gray-100 border border-gray-200 ">Gender {sortBy.column === 'gender' && sortBy.order === 'desc' && < svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                            </svg>}
                                {sortBy.column === 'gender' && sortBy.order === 'asc' && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                                </svg>}
                            </th>
                            <th onClick={() => handleSort('active')} className="px-4 py-2 bg-gray-100 border border-gray-200 ">isActive {sortBy.column === 'active' && sortBy.order === 'desc' && < svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                            </svg>}
                                {sortBy.column === 'active' && sortBy.order === 'asc' && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                                </svg>}
                            </th>
                            <th onClick={() => handleSort('createdAt')} className="px-4 py-2 bg-gray-100 border border-gray-200 ">CreatedAt{sortBy.column === 'createdAt' && sortBy.order === 'desc' && < svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                            </svg>}
                                {sortBy.column === 'createdAt' && sortBy.order === 'asc' && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                                </svg>}
                            </th>
                            <th className="px-4 py-2 bg-gray-100 border border-gray-200">Posts</th>
                            <th className="px-4 py-2 bg-gray-100 border border-gray-200">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {data && data?.getUsersByAdminPaginated?.docs?.map((user, index) => (
                            <>
                                <tr key={user._id}>
                                    <td className="px-4 py-2 border border-gray-200">{(index + 1) + ((currentPage - 1) * 2)}</td>
                                    <td className="px-4 py-2 border border-gray-200">{user.firstName}</td>
                                    <td className="px-4 py-2 border border-gray-200">{user.lastName}</td>
                                    <td className="px-4 py-2 border border-gray-200">{user.email}</td>
                                    <td className="px-4 py-2 border border-gray-200">{user.gender}</td>
                                    <td className="px-4 py-2 border border-gray-200">{user.active ? "Active" : "Deactive"}</td>

                                    <td className="px-4 py-2 border border-gray-200">{user.createdAt}</td>
                                    <td className="px-4 py-2 border border-gray-200"><Link to={`view-post/${user._id}`} className='text-sky-500'>view Posts</Link></td>
                                    <td className="px-4 py-2 border border-gray-200 flex justify-center space-x-3">
                                        <Link to={`update-user/${user._id}`} className="flex w-12 justify-center rounded-md border-solid border-2 border-sky-500 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                            </svg>
                                        </Link>
                                        <button onClick={() => handleOpenModal(user._id)} className="flex w-12 justify-center rounded-md border-solid border-2 border-sky-500 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
                <div className='fixed bottom-16 left-0 right-0 mx-auto my-auto'>
                    <Pagination pageCount={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>
            {isModalOpen && <DeleteUserModal onClose={handleCloseModal} onDelete={handleDeleteModal} />
            }
        </>
    )
}

export default GetUsers;