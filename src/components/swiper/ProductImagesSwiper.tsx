'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Box, Card, IconButton } from '@mui/material';
import { Add, AddPhotoAlternateOutlined } from '@mui/icons-material';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';

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
					<Swiper
						style={
							{
								'--swiper-navigation-color': 'white',
								'--swiper-pagination-color': 'white',
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
									width={1024}
									height={800}
									alt={name}
									src={`/${image}`}
									style={{
										objectFit: 'contain',
										borderRadius: '8px',
									}}
								/>
							</SwiperSlide>
						))}
					</Swiper>

					<Swiper
						onSwiper={setThumbsSwiper}
						spaceBetween={10}
						slidesPerView={3}
						freeMode
						watchSlidesProgress
						modules={[FreeMode, Navigation, Thumbs]}
					>
						{images.map((image, index) => (
							<SwiperSlide key={index}>
								<Image
									width={200}
									height={200}
									alt={name}
									src={`/${image}`}
									style={{
										objectFit: 'contain',
										borderRadius: '8px',
									}}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</>
			)}
			{/* </Box> */}
		</>
	);
};
