'use client';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Category } from '@/interfaces';
import { downloadImage } from '../images/downloadImage';
import { useEffect, useState } from 'react';

interface Props {
	categories: Category[];
}

export const CategorySwiper = ({ categories }: Props) => {

	const [imagePaths, setImagePaths] = useState<string[]>([]);

	useEffect(() => {
		async function fetchImages() {
			try {
				const paths = await Promise.all(
					categories.map(async (category) => {
						const value = await downloadImage(category.image_url);
						return value ? URL.createObjectURL(value) : '/public/not_found.jpg'; 
					})
				);
				setImagePaths(paths);
			} catch (error) {
				console.error('Error fetching images:', error);
			}
		}
		fetchImages();
	}, [categories]);

	return (
		<Box sx={{ maxWidth: '100%', py: 2, mx: 5 }}>
			<Typography
				variant="h4"
				align="center"
				justifyContent="center"
				gutterBottom
				sx={{
					fontWeight: 800,
					my: 2,
					mx: 2,
					color: 'text.primary',
					display: 'flex',
				}}
			>
				CATEGORIAS
			</Typography>
			<Swiper
				spaceBetween={25}
				slidesPerView={'auto'}
				navigation
				autoplay={{ delay: 3000 }}
				modules={[Navigation, Pagination, Autoplay]}
				breakpoints={{
					640: { slidesPerView: 1 },
					768: { slidesPerView: 2 },
					1024: { slidesPerView: 5 },
				}}
				style={
					{
						'--swiper-navigation-color': '#fff',
						'--swiper-pagination-color': '#fff',
					} as React.CSSProperties
				}
			>
				{categories.map((category, index) => (
					<SwiperSlide key={index}>
						<Link href={`/categoria/${category.id}`}>
							<Card
								sx={{
									position: 'relative',
									borderRadius: '8px',
									overflow: 'hidden',
									'&:hover': {
										transform: 'scale(1.05)',
										transition: '0.3s',
									},
								}}
							>
								<CardMedia
									component="img"
									image={category.image_url}
									alt={category.name}
									sx={{
										height: '250px', // Altura fija
										width: '100%',  // Ancho fijo
										objectFit: 'cover' // Asegura que la imagen cubra todo el área
									}}
								/>
								<CardContent
									sx={{
										position: 'absolute',
										top: '50%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
									}}
								>
									<Typography
										gutterBottom
										variant="h4"
										component="div"
										sx={{
											color: 'white',
											fontWeight: 'bold',
											textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
											textAlign: 'center',
										}}
									>
										{category.name[0].toUpperCase() + category.name.slice(1)}
									</Typography>
								</CardContent>
							</Card>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</Box>
	);
};
