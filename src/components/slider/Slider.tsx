'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface Props {
	images: string[];
	title: string;
	type: string;
	className: string;
}

export const Slider = ({ images, title, type, className }: Props) => {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

	return (
		<div className={className}>
			<Swiper
				style={
					{
						'--swiper-navigation-color': '#fff',
						'--swiper-pagination-color': '#fff',
					} as React.CSSProperties
				}
				spaceBetween={10}
				navigation={true}
				thumbs={{ swiper: thumbsSwiper }}
				modules={[FreeMode, Navigation, Thumbs]}
				className="mySwiper2"
			>
				{images.map((image, index) => (
					<SwiperSlide key={index}>
						<Image
							src={`/${type}/${image}`}
							alt={title}
							width={300}
							height={300}
							className="rounded-lg object-fill"
						></Image>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
