import React, { useState } from 'react';
import Card from './Card';
import { useQuery } from '@apollo/client';
import { GET_ALL_POST_PAGINATED } from '../../graphQl/query';
import Pagination from './Pagination';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';

const UserDashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { loading, error, data, refetch } = useQuery(GET_ALL_POST_PAGINATED, {
        variables: {
            input: {
                limit: 2,
                page: currentPage,
            }
        },
        fetchPolicy: 'network-only',
    });

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    // if (loading) {
    //     return <Loader />;
    // }

    // if (error) {
    //     return <ErrorMessage message="Error loading posts. Please try again." />;
    // }

    const { getPaginatedPosts } = data || {};
    const totalPages = getPaginatedPosts?.totalPages || 0;
    const posts = getPaginatedPosts?.docs || [];

    return (
        <div className="user-dashboard-container">
            <div className="grid grid-cols-4 gap-2 mt-2 p-10">
                {posts.map((res) => (
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
            <div className='pagination-container fixed bottom-16 left-0 right-0 mx-auto my-auto'>
                <Pagination pageCount={totalPages} onPageChange={handlePageChange}/>
            </div>
        </div>
    );
};

export default UserDashboard;
