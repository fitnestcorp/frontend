'use client';
import { SortOutlined } from '@mui/icons-material';
import { IconButton, Tooltip, Menu, MenuItem, Box } from '@mui/material';
import { useState, MouseEvent } from 'react';

interface SortButtonProps {
	onSort: (key: string) => void;
	type: string;
}

export const SortButton = ({ onSort, type }: SortButtonProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (key: string | null) => {
		setAnchorEl(null);
		if (key) {
			onSort(key);
		}
	};

	return (
		<>
			<Tooltip title="Ordenar" arrow>
				<IconButton
					onClick={handleClick}
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
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => handleClose(null)}
			>
				<MenuItem onClick={() => handleClose('name')}>Nombre</MenuItem>
				{type === 'productos' && (
					<Box>
						<MenuItem onClick={() => handleClose('price')}>
							Precio
						</MenuItem>
						<MenuItem onClick={() => handleClose('stock')}>
							Stock
						</MenuItem>
					</Box>
				)}
			</Menu>
		</>
	);
};
