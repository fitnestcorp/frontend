'use client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';

import { Group } from '@/interfaces';
import { Banner, GroupSwiper } from '@/components';
import {
	clearUser,
	setUser,
	useGetAllGroupsQuery,
	useVerifyTokenQuery,
} from '@/store';

export const Home = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [objects, setObjects] = useState<Group[]>([]);
	const [count, setCount] = useState(0);
	const { data, error, isLoading } = useGetAllGroupsQuery({ page, limit });

	// const token = localStorage.getItem('token');
	// const { data: verifyData, error: verifyError } = useVerifyTokenQuery(token);

	// const dispatch = useDispatch();
	// const router = useRouter();

	// useEffect(() => {
	// 	if (verifyData && verifyData.isValid) {
	// 		dispatch(setUser(verifyData.user));
	// 	} else if (verifyError) {
	// 		localStorage.removeItem('token');
	// 		dispatch(clearUser());
	// 		router.push('/iniciar-sesion');
	// 	}
	// }, [verifyData, verifyError, dispatch, router]);

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
		return <div>Cargando...</div>;
	}

	return (
		<Box>
			<Banner image={'/banners/Yoga.png'} title={''} />
			<GroupSwiper groups={objects} />
		</Box>
	);
};

export default Home;
