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
				height: { xs: '300px', sm: '400px', md: '600px' },
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
				layout="fill"
				objectFit="cover"
				quality={100}
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
				{title}
			</Typography>
		</Box>
	);
};
