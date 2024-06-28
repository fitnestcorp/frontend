'use client';
import Image from 'next/image';
import { useState } from 'react';
import { CardMedia } from '@mui/material';
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface Props {
	images: string[];
	name: string;
}

/**
 * ProductSwiper component renders a main image swiper with a thumbnail swiper for product images.
 *
 * @component
 * @param {Array} images - Array of image URLs for the product.
 * @param {string} name - Name of the product.
 * @example
 * const images = ['image1.jpg', 'image2.jpg'];
 * const name = 'Product Name';
 * return <ProductSwiper images={images} name={name} />
 */
export const ProductSwiper = ({ images, name }: Props) => {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
	return (
		<>
			{/* Main Swiper for displaying product images */}
			<Swiper
				style={
					{
						'--swiper-navigation-color': '#fff',
						'--swiper-pagination-color': '#fff',
					} as React.CSSProperties
				}
				spaceBetween={10}
				navigation
				thumbs={{ swiper: thumbsSwiper }}
				modules={[FreeMode, Navigation, Thumbs]}
			>
				{images.map((image, index) => (
					<SwiperSlide key={index}>
						<CardMedia
							component={Image}
							image={`/products/${image}`}
							alt={name}
							sx={{ borderRadius: '8px' }}
							width={1024}
							height={800}
						/>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Thumbnail Swiper for selecting product images */}
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
						<CardMedia
							component={Image}
							image={`/products/${image}`}
							alt={name}
							sx={{ borderRadius: '8px' }}
							width={300}
							height={300}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
};
