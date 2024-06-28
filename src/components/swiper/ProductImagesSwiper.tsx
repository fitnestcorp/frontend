'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Card, Grid } from '@mui/material';
import { AddPhotoAlternateOutlined } from '@mui/icons-material';

interface Props {
	images: string[];
	name: string;
}

/**
 * ProductImagesSwiper component renders a gallery of product images with a main display and a thumbnail selection.
 *
 * @component
 * @param {Array} images - Array of image URLs for the product.
 * @param {string} name - Name of the product.
 * @example
 * const images = ['/path/to/image1.jpg', '/path/to/image2.jpg'];
 * const name = 'Product Name';
 * return <ProductImagesSwiper images={images} name={name} />
 */
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
				lg={2}
				sx={{
					display: { xs: 'none', lg: 'flex' },
					flexDirection: 'column',
					overflowX: 'hidden',
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
							flexDirection: 'column',
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
									width: 100,
									height: 100,
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
			<Grid item xs={12} lg={10}>
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

				{/* Show in small screens */}
				<Box
					sx={{
						display: { xs: 'flex', lg: 'none' },
						flexDirection: 'row',
						overflowX: 'scroll',
						mt: 2,
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
								width: 100,
								height: 100,
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
								width={60}
								height={60}
								style={{ objectFit: 'cover' }}
							/>
						</Card>
					))}
				</Box>
			</Grid>
		</Grid>
	);
};
