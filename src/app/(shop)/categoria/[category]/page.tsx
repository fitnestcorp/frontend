'use client';
import { Box, Typography } from '@mui/material';
import { Banner, Breadcrumb, CategorySwiper } from '@/components';
import ProductGrid from '@/components/products/ProductGrid';
import { Category, Product } from '@/interfaces';
import { useEffect, useState } from 'react';
import { downloadImage } from '@/components/images/downloadImage';
import { useGetProductsByCategoryQuery } from '@/store/services/productApi';
import { useGetCategoryByNameQuery } from '@/store/services/categoryApi';
import LogoLoader from '@/components/logo/LogoLoader';

interface Props {
	params: {
		category: string;
		group: string;
	};
}

export const CategoryPage = ({ params }: Props) => {
	const { group, category } = params;
	const [objects, setObjects] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [count, setCount] = useState(0);
	const [filePath, setFilePath] = useState<string>('');
	const [name, setName] = useState<string>('');

	const [dataLoaded, setDataLoaded] = useState(false);

	const {
		data: productsData,
		error: productsError,
		isLoading: productsLoading,
	} = useGetProductsByCategoryQuery({
		page: 1,
		limit: 10,
		category: category,
	});
	const {
		data: categoryData,
		error: categoryError,
		isLoading: categoryLoading,
	} = useGetCategoryByNameQuery(category);

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
			if (categoryData && categoryData.image_url) {
				setName(categoryData.name);
				const value = await downloadImage(categoryData.image_url);
				if (value) {
					setFilePath(URL.createObjectURL(value));
				}
			}
			if (categoryError) {
				console.error('Error fetching groups:', categoryError);
			}
		};

		fetchImage();
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

	return (
		<Box>
			<Banner image={filePath} title={name} />
			<Breadcrumb name={categoryData.name} />
			<ProductGrid products={objects} />
		</Box>
	);
};

export default CategoryPage;
