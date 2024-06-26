'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconButton, Box, Typography, Paper } from '@mui/material';
import {
	Remove as RemoveIcon,
	Add as AddIcon,
	Close as CloseIcon,
} from '@mui/icons-material';
import { ShoppingCartItem } from '@/interfaces/ShoppingCartItem';


interface Props {
	cartItem: ShoppingCartItem;
}

export const CartItem = ({ cartItem }: Props) => {
	const { quantity, price, product } = cartItem;

	const [quantityShopin, setQuantityShopin] = useState<number>(1);

	const increaseQuantity = () => {
		setQuantityShopin(quantity + 1);
	};

	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantityShopin(quantity - 1);
		}
	};

	return (
		<Paper
			elevation={3}
			sx={{
				p: 2,
				mb: 2,
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				width: '100%',
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
			<Link href={`/producto/${cartItem.product.id}`} passHref>
				<Image
					src={product.image_urls[0]}
					alt={product.name}
					width={100}
					height={100}
					style={{ borderRadius: '8px' }}
				/>
				</Link>
				<Box sx={{ flexGrow: 1, ml: 2 }}>
					<Typography
						variant="h6"
						sx={{ fontWeight: 'bold', color: 'text.primary' }}
					>
						{product.name}
					</Typography>
					<Typography variant="body2" color="text.primary">
						{product.type}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							mt: 2,
						}}
					>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<IconButton
								onClick={decreaseQuantity}
								sx={{
									backgroundColor: 'gray',
									color: 'white',
									width: 25,
									height: 25,
									'&:hover': { backgroundColor: 'darkgray' },
								}}
							>
								<RemoveIcon fontSize="small" />
							</IconButton>
							<Typography
								variant="body2"
								color="text.primary"
								sx={{ mx: 2 }}
							>
								{quantity}
							</Typography>
							<IconButton
								size="small"
								onClick={increaseQuantity}
								sx={{
									backgroundColor: 'gray',
									color: 'white',
									width: 25,
									height: 25,
									'&:hover': { backgroundColor: 'darkgray' },
								}}
							>
								<AddIcon fontSize="small" />
							</IconButton>
						</Box>
						<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
							{price}
						</Typography>
					</Box>
				</Box>
				<IconButton
					sx={{
						position: 'absolute',
						top: 8,
						right: 8,
						color: 'gray',
					}}
				>
					<CloseIcon />
				</IconButton>
			</Box>
		</Paper>
	);
};
