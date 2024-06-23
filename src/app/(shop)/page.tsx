'use client';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import { Banner, GroupSwiper } from '@/components';
import { Group, Product } from '@/interfaces';
import { useGetAllGroupsQuery, useGetAllProductsQuery } from '@/store';
import ProductGrid from '@/components/products/ProductGrid';
import LogoLoader from '@/components/logo/LogoLoader';

export const Home = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [objects, setObjects] = useState<Group[]>([]);
	const [countGroup, setCountGroup] = useState(0);
	const { data, error, isLoading } = useGetAllGroupsQuery({ page, limit });

	const [products, setProducts] = useState<Product[]>([]);
	const [countProducts, setCountProducts] = useState(0);
	const [filePath, setFilePath] = useState<string>('');

	const {
		data: productsData,
		error: productsError,
		isLoading: productsLoading,
	} = useGetAllProductsQuery({ page, limit });

	useEffect(() => {
		console.log('Fetching products data...', {
			productsData,
			productsError,
			productsLoading,
		});

		if (
			productsData &&
			Array.isArray(productsData) &&
			productsData.length === 2
		) {
			const [objectsList, totalCount] = productsData;
			if (Array.isArray(objectsList)) {
				setProducts(objectsList);
				setCountProducts(totalCount);
				console.log('Fetched products:', objectsList);
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
		<Box>
			<Banner image={'/banners/Yoga.png'} title={''} />
			<GroupSwiper groups={objects} />
			<ProductGrid products={products} />
		</Box>
	);
};

export default Home;
