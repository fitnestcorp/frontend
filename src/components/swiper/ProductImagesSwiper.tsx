'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Card, Grid } from '@mui/material';
import { AddPhotoAlternateOutlined } from '@mui/icons-material';

interface Props {
	images: string[];
	name: string;
}

export const ProductImagesSwiper = ({ images, name }: Props) => {
	const [selectedImage, setSelectedImage] = useState(images[0] || '');

	const handleImageClick = (image: string) => {
		setSelectedImage(image);
	};

	return (
		<Grid container spacing={2}>
			<Grid
				item
				xs={12}
				md={2}
				sx={{
					display: 'flex',
					flexDirection: { xs: 'row', md: 'column' },
					overflowX: { xs: 'scroll', md: 'hidden' },
					gap: 2,
					mb: { xs: 2, md: 0 },
				}}
			>
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
					<Box
						sx={{
							display: 'flex',
							flexDirection: { xs: 'row', md: 'column' },
							gap: 2,
						}}
					>
						{images.map((image, index) => (
							<Card
								key={index}
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: { xs: 60, md: 100 },
									height: { xs: 60, md: 100 },
									cursor: 'pointer',
									border:
										selectedImage === image
											? '2px solid #000'
											: 'none',
								}}
								onClick={() => handleImageClick(image)}
							>
								<Image
									priority
									src={image}
									alt={`${name}-${index}`}
									width={100}
									height={100}
									style={{ objectFit: 'cover' }}
								/>
							</Card>
						))}
					</Box>
				)}
			</Grid>
			<Grid item xs={12} md={10}>
				<Card
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						height: { xs: 300, md: 475, lg: 600 },
						borderRadius: '8px',
						overflow: 'hidden',
						p: 2,
					}}
				>
					{selectedImage ? (
						<Box
							sx={{
								position: 'relative',
								width: '100%',
								height: '100%',
							}}
						>
							<Image
								priority
								src={selectedImage}
								alt={name}
								layout="fill"
								objectFit="contain"
							/>
						</Box>
					) : (
						<AddPhotoAlternateOutlined />
					)}
				</Card>
			</Grid>
		</Grid>
	);
};

export default ProductImagesSwiper;
