'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

import { SeedCategory } from '@/seed/seed';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

interface Props {
	categories: SeedCategory[];
}

export const CategorySwiper = ({ categories }: Props) => {
	return (
		<Box sx={{ maxWidth: '100%', mx: 'auto', py: 2 }}>
			<Typography
				variant="h4"
				align="center"
				gutterBottom
				sx={{
					fontWeight: 'bold',
					my: 2,
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
				className="mySwiper"
			>
				{categories.map((category, index) => (
					<SwiperSlide key={index}>
						<Card
							sx={{
								position: 'relative',
								borderRadius: '8px',
								overflow: 'hidden',
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
					</SwiperSlide>
				))}
			</Swiper>
		</Box>
	);
};
