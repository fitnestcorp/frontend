'use client';
import { SortOutlined } from '@mui/icons-material';
import { IconButton, Tooltip, Menu, MenuItem, Box } from '@mui/material';
import { useState, MouseEvent } from 'react';

interface SortButtonProps {
	/**
     * Function to be called when a sort option is selected.
     * @param key - The key to sort by.
     */
	onSort: (key: string) => void;
	/**
     * The type of items to be sorted.
     * Determines additional sort options specific to the item type.
     */
	type: string;
}

/**
 * SortButton component.
 * Provides a button that opens a menu with sorting options.
 *
 * @param {SortButtonProps} props - The properties for the component.
 * @returns {JSX.Element} The SortButton component.
 */
export const SortButton = ({ onSort, type }: SortButtonProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	/**
     * Handles the click event to open the sort menu.
     *
     * @param {MouseEvent<HTMLElement>} event - The mouse event.
     */
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

		/**
     * Handles the close event of the menu.
     *
     * @param {string | null} key - The sort key.
     */
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
