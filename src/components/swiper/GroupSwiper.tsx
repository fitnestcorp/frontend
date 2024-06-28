'use client';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Group } from '@/interfaces';
import { useEffect, useState } from 'react';

interface Props {
	groups: Group[];
}

/**
 * GroupSwiper component renders a Swiper carousel with training groups.
 *
 * @component
 * @param {Array} groups - Array of group objects to display in the Swiper.
 * @example
 * const groups = [{ name: 'Cardio', image_url: '/path/to/image' }, ...];
 * return <GroupSwiper groups={groups} />
 */
export const GroupSwiper = ({ groups }: Props) => {
	return (
		<Box sx={{ maxWidth: '100%' }}>
			<Typography
				variant="h4"
				align="center"
				justifyContent="center"
				gutterBottom
				sx={{
					fontWeight: 'bold',
					my: 3,
					mx: 3,
					color: 'text.primary',
					display: 'flex',
				}}
			>
				ENTRENAMIENTO
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
				{groups.map((group, index) => (
					<SwiperSlide key={index}>
						<Link
							href={`/grupo/${group.name
								.toLowerCase()
								.replace(/\s+/g, '-')}`}
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
									image={group.image_url}
									alt={group.name}
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
										{group.name[0].toUpperCase() +
											group.name.slice(1)}
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
