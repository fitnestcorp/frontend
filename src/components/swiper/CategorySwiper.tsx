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

interface Props {
	categories: Category[];
}

export const CategorySwiper = ({ categories }: Props) => {
	const calculateSpaceBetween = (numCategories: number) => {
		if (numCategories <= 1) return 0;
		if (numCategories <= 3) return 25;
		if (numCategories <= 5) return 15;
		return 20;
	};

	const calculateSlidesPerView = (numCategories: number) => {
		if (numCategories === 1) return 1;
		if (numCategories === 2) return 2;
		if (numCategories === 3) return 3;
		if (numCategories <= 5) return 4;
		return 5;
	};

	const spaceBetween = calculateSpaceBetween(categories.length);
	const slidesPerView = calculateSlidesPerView(categories.length);

	return (
		<Box sx={{ maxWidth: '100%' }}>
			<Typography
				variant="h4"
				align="center"
				justifyContent="center"
				gutterBottom
				sx={{
					fontWeight: 'bold',
					my: 2,
					mx: 2,
					color: 'text.primary',
					display: 'flex',
				}}
			>
				CATEGORIAS
			</Typography>
			<Swiper
				spaceBetween={spaceBetween}
				navigation
				pagination={{ clickable: true }}
				autoplay={{ delay: 3000 }}
				modules={[Navigation, Pagination, Autoplay]}
				breakpoints={{
					640: { slidesPerView: Math.min(slidesPerView, 1) },
					768: { slidesPerView: Math.min(slidesPerView, 2) },
					1024: { slidesPerView: Math.min(slidesPerView, 3) },
					1280: { slidesPerView: slidesPerView },
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
						<Link
							href={`/categoria/${category.name
								.toLowerCase()
								.replace(/\s+/g, '-')}`}
							style={{ textDecoration: 'none' }}
						>
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
										height: '250px',
										width: '100%',
										objectFit: 'cover',
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
											textShadow:
												'2px 2px 6px rgba(0,0,0,0.6)',
											textAlign: 'center',
										}}
									>
										{category.name[0].toUpperCase() +
											category.name.slice(1)}
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
