'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Box, Card } from '@mui/material';
import { AddPhotoAlternateOutlined } from '@mui/icons-material';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

interface Props {
	images: string[];
	name: string;
}

export const ProductImagesSwiper = ({ images, name }: Props) => {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();

	return (
		// <Box
		// 	sx={{
		// 		position: 'relative',
		// 		width: '100%',
		// 		height: '100%',
		// 		display: 'flex',
		// 		alignItems: 'center',
		// 		justifyContent: 'center',
		// 		bgcolor: images.length === 0 ? 'grey.300' : 'transparent',
		// 	}}
		// >
		<>
			{images.length === 0 ? (
				<Card
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						height: '100%',
						borderRadius: '8px',
					}}
				>
					<AddPhotoAlternateOutlined />
				</Card>
			) : (
				<>
					<Box
						sx={{
							borderRadius: '10px',
							boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
						}}
					>
						<Swiper
							style={
								{
									'--swiper-navigation-color': 'lightgray',
									'--swiper-pagination-color': 'lightgray',
								} as React.CSSProperties
							}
							spaceBetween={10}
							navigation
							thumbs={{ swiper: thumbsSwiper }}
							modules={[FreeMode, Navigation, Thumbs]}
						>
							{images.map((image, index) => (
								<SwiperSlide key={index}>
									<Image
										alt={name}
										src={image}
										// src={'/products/estirillas-yoga-1.jpg'}
										width={500}
										height={500}
										style={{
											objectFit: 'cover',
										}}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</Box>

					<Box
						sx={{
							borderRadius: '10px',
							boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
							p: 1,
						}}
					>
						<Swiper
							onSwiper={setThumbsSwiper}
							spaceBetween={10}
							slidesPerView={5}
							freeMode
							watchSlidesProgress
							modules={[FreeMode, Navigation, Thumbs]}
						>
							{images.map((image, index) => (
								<SwiperSlide key={index}>
									<Image
										alt={name}
										src={image}
										// src={'/products/estirillas-yoga-1.jpg'}
										width={100}
										height={100}
										style={{
											objectFit: 'cover',
										}}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</Box>
				</>
			)}
		</>

		// </Box>
	);
};
