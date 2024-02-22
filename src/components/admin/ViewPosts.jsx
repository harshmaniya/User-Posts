import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom'
import { GET_POSTS_PAGINATION } from '../../graphQl/query'
import Pagination from '../user/Pagination';
import { useState } from 'react';
import Button from '../useForm/Button'

const ViewPosts = () => {

    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState({ column: "title", order: 1 });
    const [search, setSearch] = useState('');
    // const [loading, setLoading] = useState('');
    const { id } = useParams();
    console.log(id);

    const { error, data, refetch } = useQuery(GET_POSTS_PAGINATION, {
        variables: {
            input: {
                _id: id,
                limit: 10,
                page: currentPage,
                sortBy: sort.column,
                order: sort.order,
                search
            }
        },
        fetchPolicy: 'network-only',
    });

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    // const handlePageChange = async ({ selected }) => {
    //     try {
    //         setLoading(true);
    //         setCurrentPage(selected + 1)
    //         await data?.getAllPostsByAdminPaginated?.docs.length > 0
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    const handleSort = (column) => {
        setSort(
            {
                column,
                order: sort.column === column ? sort.order === 1 ? -1 : 1 : 1
            }
        )
        setCurrentPage(1)
    };

    const totalPages = data?.getAllPostsByAdminPaginated?.totalPages;


    // {
    //     loading && <div className="flex items-center justify-center min-h-screen">
    //         <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12">
    //         </div>
    //     </div>
    // }

    return (
        <> <Button
            label={"back to home"}
            onClick={() => navigate("/admin-dashboard")}
            className={"m-8 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
        />
            {data && (
                <div className="overflow-x-auto pl-8 pr-8 pb-8 -mt-16">
                    <div className="flex justify-end mb-3">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 bg-gray-100 border border-gray-200">No.</th>

                                <th onClick={() => handleSort("title")} className="px-4 py-2 bg-gray-100 border border-gray-200">Title
                                    {sort.column === 'title' && sort.order === -1 && < svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                                    </svg>}
                                    {sort.column === 'title' && sort.order === 1 && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                                    </svg>}
                                </th>

                                <th onClick={() => handleSort("description")} className="px-4 py-2 bg-gray-100 border border-gray-200">Description
                                    {sort.column === 'description' && sort.order === -1 && < svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                                    </svg>}
                                    {sort.column === 'description' && sort.order === 1 && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                                    </svg>}
                                </th>
                                <th className="px-4 py-2 bg-gray-100 border border-gray-200">CreatedBy</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {data && data?.getAllPostsByAdminPaginated?.docs?.map((post, index) => (
                                <>
                                    <tr key={post._id} className='hover:bg-gray-200'>
                                        <td className="px-2 py-2 border border-gray-200">{(index + 1) + ((currentPage - 1) * 10)}</td>
                                        <td className="px-2 py-2 border border-gray-200">{post.title}</td>
                                        <td className="px-2 py-2 border border-gray-200">{post.description}</td>
                                        <td className="px-2 py-2 border border-gray-200">{post.createdBy.firstName} {post.createdBy.lastName}</td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                    <div className='fixed bottom-16 left-0 right-0 mx-auto my-auto'>
                        <Pagination pageCount={totalPages} onPageChange={handlePageChange} />
                    </div>
                </div>
            )}

            {!data && (
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <div className="text-center">
                        <p className="text-4xl text-gray-800">posts not found!</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default ViewPosts;