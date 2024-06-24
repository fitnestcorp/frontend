'use client'
import { useState } from 'react';
import Image from 'next/image';
import { IconButton, Box, Typography, Paper } from '@mui/material';
import {
	Remove as RemoveIcon,
	Add as AddIcon,
	Close as CloseIcon,
} from '@mui/icons-material';

import { CartItem as ICartItem } from '@/interfaces';

interface Props {
	cartItem: ICartItem;
}

export const CartItem = ({ cartItem }: Props) => {
	const { name, description, price, image_url } = cartItem;

	const [quantity, setQuantity] = useState<number>(1);

	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
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
				<Image
					src={image_url}
					alt={name}
					width={100}
					height={100}
					style={{ borderRadius: '8px' }}
				/>
				<Box sx={{ flexGrow: 1, ml: 2 }}>
					<Typography
						variant="h6"
						sx={{ fontWeight: 'bold', color: 'text.primary' }}
					>
						{name}
					</Typography>
					<Typography variant="body2" color="text.primary">
						{description}
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
