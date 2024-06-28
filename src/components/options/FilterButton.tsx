'use client';
import { FilterAltOutlined } from '@mui/icons-material';
import { IconButton, Tooltip, Menu, MenuItem, TextField } from '@mui/material';
import { useState, MouseEvent } from 'react';

interface FilterButtonProps {
	/**
     * Function to be called when a filter is applied.
     * @param key - The key to filter by.
     * @param value - The value to filter by.
     */
	onFilter: (key: string, value: string) => void;
}

/**
 * FilterButton component.
 * Provides a button that opens a menu with filter options.
 *
 * @param {FilterButtonProps} props - The properties for the component.
 * @returns {JSX.Element} The FilterButton component.
 */
export const FilterButton = ({ onFilter }: FilterButtonProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [filterValue, setFilterValue] = useState<string>('');

	/**
     * Handles the click event to open the filter menu.
     *
     * @param {MouseEvent<HTMLElement>} event - The mouse event.
     */
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	/**
     * Handles the close event of the menu.
     *
     * @param {string | null} key - The filter key.
     */
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
