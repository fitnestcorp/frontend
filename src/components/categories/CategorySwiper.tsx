'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

import { SeedCategory } from '@/seed/seed';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Link from 'next/link';

interface Props {
	categories: SeedCategory[];
}

export const CategorySwiper = ({ categories }: Props) => {
	return (
		<Box
			sx={{ maxWidth: '100%', py: 2, mx: { xs: 2, sm: 3, md: 4, lg: 5 } }}
		>
			<Typography
				variant="h4"
				align="center"
				gutterBottom
				sx={{
					fontWeight: 'bold',
					my: 2,
					color: 'text.secondary',
				}}
			>
				ENTRENAMIENTO
			</Typography>
			<Swiper
				spaceBetween={10}
				slidesPerView={1}
				loop
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
						<Link href={`/categoria/${category.name}`}>
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
									height="140"
									image={`/categories/${category.image}`}
									alt={category.name}
									sx={{
										height: '100%',
										width: '100%',
										// filter: 'blur(1px)',
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
												'2px 2px 4px rgba(0,0,0,0.6)',
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
