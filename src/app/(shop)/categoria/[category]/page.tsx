'use client';
import { Box, Pagination, Typography } from '@mui/material';
import {
	Banner,
	Breadcrumb,
	LogoLoader,
	ProductGrid,
	Filters,
} from '@/components';

import { Category, Product } from '@/interfaces';
import { useEffect, useState } from 'react';
import { useGetProductsByCategoryFilterQuery } from '@/store/services/productApi';
import { useGetCategoryByNameQuery } from '@/store/services/categoryApi';

interface Props {
	params: {
		category: string;
		group: string;
	};
}

export const CategoryPage = ({ params }: Props) => {
	let category = params.category[0].toUpperCase() + params.category.slice(1);
	category = category.replace(/-/g, ' ');

	const [objects, setObjects] = useState<Product[]>([]);
	const [count, setCount] = useState(0);
	const [image, setImage] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [categoryId, setCategoryId] = useState<string>('');
	const [selectedFilter, setSelectedFilter] = useState('Más vendidos');
	const [filterParams, setFilterParams] = useState({
		filter: 'rating',
		order: 'DESC' as 'ASC' | 'DESC',
		page: 1,
		limit: 12,
	});

	const {
		data: productsData,
		error: productsError,
		isLoading: productsLoading,
	} = useGetProductsByCategoryFilterQuery({
		categoryId: categoryId,
		...filterParams,
	});
	const {
		data: categoryData,
		error: categoryError,
		isLoading: categoryLoading,
	} = useGetCategoryByNameQuery(category);

	useEffect(() => {
		if (productsData) {
			const [products, totalCount] = productsData;
			if (Array.isArray(products)) {
				setObjects(products);
				setCount(totalCount);
			}
		} else if (productsError) {
			console.error('Error fetching products:', productsError);
		}
	}, [productsData, productsError]);

	useEffect(() => {
		if (categoryData && categoryData.image_url) {
			setName(categoryData.name);
			setImage(categoryData.image_url);
			setCategoryId(categoryData.id);
		}
		if (categoryError) {
			console.error('Error fetching category:', categoryError);
		}
	}, [categoryData, categoryError]);

	if (productsLoading || categoryLoading) {
		return <LogoLoader />;
	}

	if (!categoryData || categoryError) {
		return (
			<Typography>
				La categoría &quot;{category}&quot; no existe.
			</Typography>
		);
	}

	const handleSelectFilter = (filter: string) => {
		switch (filter) {
			case 'Menos costosos':
				setFilterParams({
					filter: 'price',
					order: 'ASC',
					page: 1,
					limit: 12,
				});
				break;
			case 'Más costosos':
				setFilterParams({
					filter: 'price',
					order: 'DESC',
					page: 1,
					limit: 12,
				});
				break;
			case 'Mejor votados':
				setFilterParams({
					filter: 'rating',
					order: 'DESC',
					page: 1,
					limit: 12,
				});
				break;
			case 'Peor votados':
				setFilterParams({
					filter: 'rating',
					order: 'ASC',
					page: 1,
					limit: 12,
				});
				break;
			case 'Más vendidos':
				setFilterParams({
					filter: 'sold_units',
					order: 'DESC',
					page: 1,
					limit: 12,
				});
				break;
			case 'Menos vendidos':
				setFilterParams({
					filter: 'sold_units',
					order: 'ASC',
					page: 1,
					limit: 12,
				});
				break;
			default:
				setFilterParams({
					filter: 'sold_units',
					order: 'DESC',
					page: 1,
					limit: 12,
				});
				break;
		}
		setSelectedFilter(filter);
	};

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setFilterParams((prevParams) => ({ ...prevParams, page: value }));
	};

	return (
		<>
			<Banner image={image} title={name} />
			<Box sx={{ flex: 1, px: { xs: 2, sm: 3, md: 4, lg: 5 } }}>
				<Breadcrumb />
				<Filters onSelectFilter={handleSelectFilter} />
				<ProductGrid products={objects} />
				<Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
					<Pagination
						count={Math.ceil(count / filterParams.limit)}
						page={filterParams.page}
						onChange={handlePageChange}
						color="primary"
					/>
				</Box>
			</Box>
		</>
	);
};

export default CategoryPage;
