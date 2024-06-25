'use client';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { Banner, GroupSwiper } from '@/components';
import { Group, Product } from '@/interfaces';
import { useGetAllGroupsQuery, useGetAllProductsQuery } from '@/store';
import ProductGrid from '@/components/products/ProductGrid';
import LogoLoader from '@/components/logo/LogoLoader';
import FilterListIcon from '@mui/icons-material/FilterList';
import Filters from '@/components/products/Filters';

export const AllProducts = () => {

	const [page2, setPage2] = useState(1);
	const [limit2, setLimit2] = useState(10);
	const [products, setProducts] = useState<Product[]>([]);
	const [countProducts, setCountProducts] = useState(0);
	const [filePath, setFilePath] = useState<string>('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedFilter, setSelectedFilter] = useState('');

	const {
		data: productsData,
		error: productsError,
		isLoading: productsLoading,
	} = useGetAllProductsQuery({ page: page2, limit : limit2  });

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


	if ( productsLoading) {
		return <LogoLoader />;
	}

    

    const handleSelectFilter = (filter: string) => {
        setSelectedFilter(filter);
        console.log('Selected Filter:', filter);
    };

	return (
		<Box>
			<Typography
				variant="h3"
				sx={{
					
					fontWeight: 'bold',
					my: 2,
				}}
			>
				{"TODOS NUESTROS PRODUCTOS"}
			</Typography>
            <Filters onSelectFilter={handleSelectFilter} />
			<ProductGrid products={products} />
		</Box>
	);
};

export default AllProducts;
