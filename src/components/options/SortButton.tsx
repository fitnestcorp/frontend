import { SortOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

export const SortButton = () => {
	return (
		<Tooltip title="Ordenar" arrow>
			<IconButton
				sx={{
					position: 'relative',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: '0.5rem',
					color: 'text.primary',
					backgroundColor: 'secondary.main',
					border: '1px solid black',
					'&:hover': {
						backgroundColor: 'primary.main',
						color: 'text.secondary',
					},
				}}
			>
				<SortOutlined />
			</IconButton>
		</Tooltip>
	);
};
