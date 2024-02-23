import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom'
import { GET_POSTS_PAGINATION } from '../../graphQl/query'
import Pagination from '../Pagination';
import React, { useState } from 'react';
import Button from '../useForm/Button'
import debounce from 'debounce';
import Loader from '../Loader';
import ContentLoader from 'react-content-loader';

const TableLoader = () => (
    <ContentLoader
        speed={2}
        width={1450}
        height={150}
        viewBox="0 0 1450 150"
        backgroundColor="#f0f0f0"
        foregroundColor="#d9d9d9"
    >

        <rect x="10" y="10" rx="5" ry="5" width="70" height="15" />
        <rect x="90" y="10" rx="4" ry="4" width="465" height="15" />
        <rect x="565" y="10" rx="3" ry="3" width="560" height="15" />
        <rect x="1140" y="10" rx="2" ry="2" width="280" height="15" />

        {[0, 1, 2].map((index) => (
            <React.Fragment key={index}>
                <rect x="10" y={45 + index * 35} rx="5" ry="5" width="70" height="15" />
                <rect x="90" y={45 + index * 35} rx="4" ry="4" width="465" height="15" />
                <rect x="565" y={45 + index * 35} rx="3" ry="3" width="560" height="15" />
                <rect x="1140" y={45 + index * 35} rx="2" ry="2" width="280" height="15" />
            </React.Fragment>
        ))}
    </ContentLoader>
);



const ViewPosts = () => {

    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState({ column: "title", order: 1 });
    const [search, setSearch] = useState('');
    const { id } = useParams();
    console.log(id);
    const limit = 1

    const { loading, data } = useQuery(GET_POSTS_PAGINATION, {
        variables: {
            input: {
                _id: id,
                limit,
                page: currentPage,
                sortBy: sort.column,
                order: sort.order,
                search
            }
        },
        fetchPolicy: 'network-only',
    });

    const handleDebounce = debounce((value) => {
        setSearch(value);
        setCurrentPage(1)
    }, 1000);

    const handleSearch = (e) => {
        e.preventDefault();
        const inputValue = e.target.value;
        handleDebounce(inputValue);
    };

    const handlePageChange = (selected) => {
        setCurrentPage(selected);
    };


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

    return (
        <> <Button
            label={"back to home"}
            onClick={() => navigate("/admin-dashboard")}
            className={"m-8 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
        />
            <div className="overflow-x-auto pl-8 pr-8 pb-8 -mt-16">
                <div className="flex justify-end mb-3">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        onChange={(e) => handleSearch(e)}
                    />
                </div>
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="w-24 px-4 py-2 bg-gray-100 border border-gray-200">No.</th>

                            <th
                                onClick={() => handleSort('title')}
                                className="w-1/3 px-4 py-2 bg-gray-100 border border-gray-200 cursor-pointer"
                            >
                                <span className="text-base">Title</span>
                                {sort.column === 'title' && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className={`inline-block w-6 h-6 ${sort.order === -1 ? 'rotate-180' : ''}`}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                                    </svg>
                                )}
                            </th>

                            <th
                                onClick={() => handleSort('description')}
                                className="1/3 px-4 py-2 bg-gray-100 border border-gray-200 cursor-pointer"
                            >
                                <span className="text-base">Description</span>
                                {sort.column === 'description' && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className={`inline-block w-6 h-6 ${sort.order === -1 ? 'rotate-180' : ''}`}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                                    </svg>
                                )}
                            </th>
                            <th className="w-1/5 px-4 py-2 bg-gray-100 border border-gray-200">CreatedBy</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {loading ?
                            <tr>
                                <td colSpan='5' class='py-4 px-2 text-center'><TableLoader /></td>
                            </tr>
                            : data ? data?.getAllPostsByAdminPaginated?.docs?.map((post, index) => (
                                <>
                                    <tr key={post._id} className='hover:bg-gray-200'>
                                        <td className="px-2 py-2 border border-gray-200">{(index + 1) + ((currentPage - 1) * limit)}</td>
                                        <td className="px-2 py-2 border border-gray-200">{post.title}</td>
                                        <td className="px-2 py-2 border border-gray-200">{post.description}</td>
                                        <td className="px-2 py-2 border border-gray-200">{post.createdBy.firstName} {post.createdBy.lastName}</td>
                                    </tr>
                                </>
                            )) :
                                <tr>
                                    <td colSpan='5' class='py-4 px-2 text-center'>No data found</td>
                                </tr>
                        }
                    </tbody>
                </table>
                {data && (
                    <div className='fixed bottom-16 left-0 right-0 mx-auto my-auto'>
                        <Pagination pageCount={totalPages} currentPage={currentPage} onPageChange={handlePageChange} pageRange={2} />
                    </div>
                )}
            </div>
        </>
    )
}

export default ViewPosts;