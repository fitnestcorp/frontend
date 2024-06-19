'use client'
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Banner, GroupSwiper } from '@/components';
import { Group } from '@/interfaces';
import { useGetAllGroupsQuery } from '@/store';


export const Home = () => {
	const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [objects, setObjects] = useState<Group[]>([]);
    const [count, setCount] = useState(0);
	const { data, error, isLoading } = useGetAllGroupsQuery({ page, limit });

    useEffect(() => {
        if (data) {
            const [objectsList, totalCount] = data;
            setObjects(objectsList);
            setCount(totalCount);
        }
        if (error) {
            console.error('Error fetching objects:', error);
        }
    }, [data, error]);

	return (
		<Box>
			<Banner
				image={'/banners/Yoga.png'}
				title={''}
			/>
			{isLoading ? (
						<div>Loading...</div>
					) : (
						<GroupSwiper groups={objects} />
					)}
			
		</Box>
	);
};

export default Home;
