'use client';
import { FilterAltOutlined } from '@mui/icons-material';
import { IconButton, Tooltip, Menu, MenuItem, TextField } from '@mui/material';
import { useState, MouseEvent } from 'react';

interface FilterButtonProps {
	onFilter: (key: string, value: string) => void;
}

export const FilterButton = ({ onFilter }: FilterButtonProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [filterValue, setFilterValue] = useState<string>('');

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (key: string | null) => {
		setAnchorEl(null);
		if (key) {
			onFilter(key, filterValue);
		}
	};

	return (
		<>
			<Tooltip title="Filtrar" arrow>
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
					<FilterAltOutlined />
				</IconButton>
			</Tooltip>

			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => handleClose(null)}
			>
				<MenuItem>
					Nombre
					<TextField
						value={filterValue}
						onChange={(e) => setFilterValue(e.target.value)}
					/>
					<IconButton
						onClick={() => handleClose('name')}
						color="primary"
					>
						Aplicar
					</IconButton>
				</MenuItem>
				<MenuItem>
					Categoria
					<TextField
						value={filterValue}
						onChange={(e) => setFilterValue(e.target.value)}
					/>
					<IconButton
						onClick={() => handleClose('category')}
						color="primary"
					>
						Aplicar
					</IconButton>
				</MenuItem>
			</Menu>
		</>
	);
};
