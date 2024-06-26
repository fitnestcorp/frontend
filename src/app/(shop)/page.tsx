'use client';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { Group, Product } from '@/interfaces';
import { useGetAllGroupsQuery, useGetAllProductsQuery } from '@/store';
import {
	Banner,
	GroupSwiper,
	LogoLoader,
	ProductGrid,
	SeeMore,
} from '@/components';

export const Home = () => {
	const [page1, setPage1] = useState(1);
	const [limit1, setLimit1] = useState(10);
	const [page2, setPage2] = useState(1);
	const [limit2, setLimit2] = useState(10);
	const [objects, setObjects] = useState<Group[]>([]);
	const [countGroup, setCountGroup] = useState(0);
	const { data, error, isLoading } = useGetAllGroupsQuery({
		page: page1,
		limit: limit1,
	});

	const [products, setProducts] = useState<Product[]>([]);
	const [countProducts, setCountProducts] = useState(0);
	const [filePath, setFilePath] = useState<string>('');

	const {
		data: productsData,
		error: productsError,
		isLoading: productsLoading,
	} = useGetAllProductsQuery({ page: page2, limit: limit2 });

	useEffect(() => {
		if (
			productsData &&
			Array.isArray(productsData) &&
			productsData.length === 2
		) {
			const [objectsList, totalCount] = productsData;
			if (Array.isArray(objectsList)) {
				setProducts(objectsList);
				setCountProducts(totalCount);
			}
		} else if (productsError) {
			console.error('Error fetching products:', productsError);
		}
	}, [productsData, productsError, productsLoading]);

	useEffect(() => {
		if (data && Array.isArray(data) && data.length === 2) {
			const [groups, totalCount] = data;
			if (Array.isArray(groups)) {
				setObjects(groups);
				setCountGroup(totalCount);
			}
		} else if (error) {
			console.error('Error fetching objects:', error);
		}
	}, [data, error]);

	if (isLoading || productsLoading) {
		return <LogoLoader />;
	}

	return (
		<>
			<Banner image={'/banners/Yoga.png'} title={''} />
			<Box sx={{ flex: 1, px: { xs: 2, sm: 3, md: 4, lg: 5 } }}>
				<GroupSwiper groups={objects} />
				<SeeMore />
				<ProductGrid products={products} />
			</Box>
		</>
	);
};

export default Home;
