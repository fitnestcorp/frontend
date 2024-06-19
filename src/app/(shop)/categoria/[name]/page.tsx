'use client'
import { Box } from '@mui/material';
import { Banner, Breadcrumb } from '@/components';
import { initialData } from '@/seed/seed';
import ProductGrid from '@/components/products/ProductGrid';
import { Product, Review, User } from '@/interfaces';
import { useGetAllProductsQuery } from '@/store';
import { useEffect, useState } from 'react';

interface Props {
	params: {
		name: string;
	};
}

const categories = initialData.categories;

export const CategoryPage = ({ params }: Props) => {
	const { name } = params;
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [products, setProducts] = useState<Product[]>([]);
    const [count, setCount] = useState(0);
    const category = categories.find((category) => category.name === name);

    const { data, error, isLoading } = useGetAllProductsQuery({ page, limit });

    useEffect(() => {
        if (data) {
            const [productsList, totalCount] = data;
            console.log("Fetched products list: ", productsList);
            setProducts(productsList);
            setCount(totalCount);
        }
        if (error) {
            console.error('Error fetching products:', error);
        }
    }, [data, error]);

	return (
		<Box>
			{category && (
				<>
					<Banner
						image={`/banners/${category.image}`}
						title={category.name}
					/>
					<Breadcrumb />
					{isLoading ? (
						<div>Loading...</div>
					) : (
						<ProductGrid products={products} />
					)}
				</>
			)}
		</Box>
	);
};

export default CategoryPage;
