'use client';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import {
	Banner,
	Breadcrumb,
	CategorySwiper,
	Filters,
	LogoLoader,
	ProductGrid,
} from '@/components';
import { Category, Product } from '@/interfaces';
import { useGetGroupByNameQuery, useGetProductsByGroupQuery } from '@/store';

interface Props {
	params: {
		grupo: string;
	};
}

export const GroupPage = ({ params }: Props) => {
	let group = params.grupo[0].toUpperCase() + params.grupo.slice(1);
	group = group.replace(/-/g, ' ');

	const [objects, setObjects] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [count, setCount] = useState(0);
	const [image, setImage] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [dataLoaded, setDataLoaded] = useState(false);
	const [selectedFilter, setSelectedFilter] = useState('');

	const {
		data: productsData,
		error: productsError,
		isLoading: productsLoading,
	} = useGetProductsByGroupQuery({ page: 1, limit: 10, group: group });
	const {
		data: groupsData,
		error: groupsError,
		isLoading: groupLoading,
	} = useGetGroupByNameQuery(group);

	useEffect(() => {
		if (productsData) {
			const products: Product[] = productsData[0];
			const totalCount: number = productsData[1];
			if (Array.isArray(products)) {
				setObjects(products);
				setCount(totalCount);
			} else {
				console.error('products is not an array:', products);
			}
		} else if (productsError) {
			console.error('Error fetching products:', productsError);
		}
	}, [productsData, productsError]);

	useEffect(() => {
		const fetchImage = async () => {
			if (groupsData && groupsData.image_url) {
				setCategories(groupsData.categories);
				setName(groupsData.name);
				setImage(groupsData.image_url);
			}
			if (groupsError) {
				console.error('Error fetching groups:', groupsError);
			}
		};

		fetchImage();
	}, [groupsData, groupsError]);

	if (productsLoading || groupLoading) {
		return <LogoLoader />;
	}

	if (!groupsData || groupsError) {
		console.log('groupsData:', groupsData);
		console.log('groupsError:', groupsError);

		return <Typography>El grupo &quot;{group}&quot; no existe.</Typography>;
	}

	const handleSelectFilter = (filter: string) => {
		setSelectedFilter(filter);
	};

	return (
		<>
			<Banner image={image} title={name} />
			<Box sx={{ flex: 1, px: { xs: 2, sm: 3, md: 4, lg: 5 } }}>
				<Breadcrumb />
				<CategorySwiper categories={categories} />
				<Filters onSelectFilter={handleSelectFilter} />
				<ProductGrid products={objects} />
			</Box>
		</>
	);
};

export default GroupPage;
