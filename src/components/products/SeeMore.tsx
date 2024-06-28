import Link from 'next/link';
import { Box, Typography, Link as MuiLink } from '@mui/material';

/**
 * SeeMore component.
 * Displays a heading and a link to view all relevant items.
 *
 * @returns {JSX.Element} The SeeMore component.
 */
export const SeeMore = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				mb: 2,
				pt: 6,
			}}
		>
			<Typography variant="h5" sx={{ fontWeight: '700' }}>
				MÁS RELEVANTES
			</Typography>
			<MuiLink
				href="/todos"
				component={Link}
				underline="hover"
				sx={{ fontSize: '1rem', fontWeight: 'bold' }}
			>
				VER TODOS
			</MuiLink>
		</Box>
	);
};
