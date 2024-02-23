import React, { useState } from 'react';
import Card from './Card';
import { useQuery } from '@apollo/client';
import { GET_ALL_POST_PAGINATED } from '../../graphQl/query';
import Pagination from '../Pagination';
import ErrorMessage from '../ErrorMessage';
import ContentLoader from 'react-content-loader';

const CardLoader = () => (
    <ContentLoader
        speed={2}
        width={1450}
        height={420}
        viewBox="0 0 1450 420"
        backgroundColor="#f0f0f0"
        foregroundColor="#d9d9d9"
    >
        {[0, 1].map((index) => (
            <React.Fragment key={index}>
                <rect x="0" y={index * 35} rx="10" ry="10" width="350" height="170" />
                <rect x="360" y={index * 35} rx="10" ry="10" width="350" height="170" />
            </React.Fragment>
        ))}
    </ContentLoader>
);

const UserDashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { loading, error, data, refetch } = useQuery(GET_ALL_POST_PAGINATED, {
        variables: {
            input: {
                limit: 2,
                page: currentPage,
            },
        },
        fetchPolicy: 'network-only',
    });

    const handlePageChange = (selected) => {
        setCurrentPage(selected);
    };

    if (error) {
        console.error('Error in UserDashboard:', error);
        return <ErrorMessage message={error.message} />;
    }

    const { getPaginatedPosts } = data || {};
    const totalPages = getPaginatedPosts?.totalPages;
    const posts = getPaginatedPosts?.docs || [];

    return (
        <div className="user-dashboard-container">
            <div className="grid grid-cols-4 gap-2 mt-2 p-10">
                {loading ? (
                    <CardLoader />
                ) : posts ? (
                    posts.map((res) => (
                        <Card
                            dataLength={posts.length}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            refetch={refetch}
                            key={res._id}
                            id={res._id}
                            title={res.title}
                            description={res.description}
                            createdBy={res.createdBy}
                        />
                    ))
                ) : (
                    <div className="text-center my-5">
                        <h1>No posts found!</h1>
                    </div>
                )}
            </div>
            {posts && (
                <div className="fixed bottom-16 left-0 right-0 mx-auto my-auto">
                    <Pagination
                        pageCount={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        pageRange={2}
                    />
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
