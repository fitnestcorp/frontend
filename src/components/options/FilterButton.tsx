import { FilterAltOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

export const FilterButton = () => {
	return (
		<Tooltip title="Filtrar" arrow>
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
				<FilterAltOutlined />
			</IconButton>
		</Tooltip>
	);
};
