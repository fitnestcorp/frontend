'use client';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Banner, GroupSwiper } from '@/components';
import { Group } from '@/interfaces';
import { useGetAllGroupsQuery } from '@/store/services/groupApi';

export const Home = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [objects, setObjects] = useState<Group[]>([]);
	const [count, setCount] = useState(0);
	const { data, error, isLoading } = useGetAllGroupsQuery({ page, limit });

	useEffect(() => {
		

		if (data && Array.isArray(data) && data.length === 2) {
			const [groups, totalCount] = data;
			if (Array.isArray(groups)) {
				setObjects(groups);
				setCount(totalCount);
				
			}
		} else if (error) {
			console.error('Error fetching objects:', error);
		}
	}, [data, error]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Box>
			<Banner image={'/banners/Yoga.png'} title={''} />
			<GroupSwiper groups={objects} />
		</Box>
	);
};

export default Home;
