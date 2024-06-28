import Image from 'next/image';
import { Box, Typography } from '@mui/material';

interface Prop {
	image: string;
	title: string;
}


/**
 * Banner component that displays a full-width image with an overlaid title.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.image - The URL of the image to display in the banner.
 * @param {string} props.title - The title text to display over the image.
 * @returns {JSX.Element} The banner component.
 */
export const Banner = ({ image, title }: Prop) => {
	return (
		<Box
			sx={{
				position: 'relative',
				width: '100%',
				height: { xs: '350px', sm: '450px', md: '600px' },
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
					color: 'text.secondary',
					fontWeight: 'bold',
					textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)',
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
