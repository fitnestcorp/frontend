'use client';
import { useEffect, useState } from 'react';
import { Box, Button, Link } from '@mui/material';
import { Group, Product } from '@/interfaces';
import { useGetAllGroupsQuery, useGetProductsSortedByRatingQuery } from '@/store';
import { Banner, GroupSwiper, LogoLoader, ProductGrid, SeeMore } from '@/components';
import "./page.css";

export const Home = () => {
	const [page1, setPage1] = useState(1);
	const [limit1, setLimit1] = useState(10);
	const [page2, setPage2] = useState(1);
	const [limit2, setLimit2] = useState(8);
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
	} = useGetProductsSortedByRatingQuery({ order:'DESC', page: page2, limit : limit2  });

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
			<div style={{position: 'relative'}}>
				<Banner image={'/banners/Yoga.png'} title={''} />
				<div className="banner-title" style={{
					position: 'absolute',
					top: '50%',
					left: '30%',
					transform: 'translate(-50%, -50%)',
					color: 'rgba(255, 255, 255, 0.9)',
					fontSize: '50px',
					textAlign: 'left',
					padding: '10px',
					lineHeight: '1.2'
					}}>
         		 Potencia tu <b>cuerpo</b>,
				 <br/>
				 Transforma tu <b>vida</b>
				 <br/>
				 <Link href={`/todos`} >
					<Button variant="contained" color="primary"  sx={{ textTransform: 'none' }} className="button-text">
						Conoce nuestros productos
					</Button>
				</Link>
				 
        		</div>
			</div>
			<Box sx={{ flex: 1, px: { xs: 2, sm: 3, md: 4, lg: 5 } }}>
				<GroupSwiper groups={objects} />
				<SeeMore />
				<ProductGrid products={products} />
			</Box>
		</>
	);
};

export default Home;
function getProductsSortedByRating(arg0: { order: string; page: number; limit: number; }): { data: any; error: any; isLoading: any; } {
	throw new Error('Function not implemented.');
}

