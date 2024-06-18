import Image from 'next/image';
import { Box, Typography } from '@mui/material';

interface Prop {
	image: string;
	title: string;
}

export const Banner = ({ image, title }: Prop) => {
	return (
		<Box
			sx={{
				position: 'relative',
				width: '100%',
				height: { xs: '350px', sm: '450px', md: '650px' },
				overflow: 'hidden',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				mb: 4,
			}}
		>
			<Image
				src={image}
				alt={title}
				quality={100}
				style={{ objectFit: 'cover' }}
				fill
				priority
			/>
			<Typography
				variant="h3"
				sx={{
					position: 'absolute',
					color: 'text.primary',
					fontWeight: 'bold',
					textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
					textAlign: 'center',
					fontSize: { xs: '2rem', sm: '3rem' },
					mx: 2,
				}}
			>
				{title.toUpperCase()}
			</Typography>
		</Box>
	);
};
