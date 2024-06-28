import Image from 'next/image';
import { Box } from '@mui/material';

import logo from '../../../public/Logo/Logo.png';

/**
 * LogoLoader component.
 * Displays a full-screen loader with a centered logo.
 *
 * @returns {JSX.Element} The LogoLoader component.
 */
export const LogoLoader = () => {
	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'rgba(255, 255, 255, 1)',
				zIndex: 9999,
			}}
		>
			<Image
				priority
				src={logo}
				width={200}
				height={200}
				alt="Digital Leaf"
				className="animate-pulse"
			/>
		</Box>
	);
};
