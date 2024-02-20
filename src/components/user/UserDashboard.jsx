import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Card from './Card';
import { useQuery } from '@apollo/client';
import { GET_ALL_POST_PAGINATED } from '../../graphQl/query';
import Pagination from './Pagination';

const UserDashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, data, refetch } = useQuery(GET_ALL_POST_PAGINATED, {
        variables: {
            input: {
                limit: 8,
                page: currentPage,
            }
        },
        fetchPolicy: 'network-only',
    });

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    const totalPages = data?.getPaginatedPosts?.totalPages;

    return (
        <>
            <div className='h-screen'>
                <Navbar />
                <div className="grid grid-cols-4 gap-2 mt-2 p-10">
                    {data?.getPaginatedPosts?.docs.map((res) => (
                        <Card
                            refetch={refetch}
                            key={res._id}
                            id={res._id}
                            title={res.title}
                            description={res.description}
                            createdBy={res.createdBy}
                        />
                    ))}
                </div>
                <div className='fixed bottom-16 left-0 right-0 mx-auto my-auto'>
                    <Pagination pageCount={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>

        </>
    );
};

export default UserDashboard;