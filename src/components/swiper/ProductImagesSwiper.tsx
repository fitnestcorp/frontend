'use client';
import Image from 'next/image';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Box } from '@mui/material';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {
	images: string[];
}

export const ProductImagesSwiper = ({ images }: Props) => {
	return (
		<Box sx={{ width: '100%', height: '100%' }}>
			<Swiper
				navigation
				pagination={{ clickable: true }}
				style={{ width: '100%', height: '100%' }}
				modules={[Navigation, Pagination]}
			>
				{images.map((image, index) => (
					<SwiperSlide key={index}>
						<Image
							src={`/${image}`}
							alt={`Product Image ${index}`}
							layout="fill"
							objectFit="cover"
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</Box>
	);
};
