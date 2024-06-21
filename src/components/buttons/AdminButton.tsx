'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { TuneOutlined } from '@mui/icons-material';

const options = [
	{
		name: 'Gestionar usuarios',
		href: '/admin/getionar-usuarios',
	},
	{
		name: 'Gestionar productos',
		href: '/admin/gestionar-productos',
	},
	{
		name: 'Gestionar grupos',
		href: '/admin/gestionar-grupos',
	},
	{
		name: 'Gestionar categorias',
		href: '/admin/gestionar-categorias',
	},
];

export const AdminButton = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box>
			<Tooltip title="Administrar" arrow>
				<IconButton
					onClick={handleClick}
					color="inherit"
					sx={{
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '40px',
						height: '40px',
						borderRadius: '0.5rem',
						color: 'white',
						backgroundColor: 'primary.main',
						'&:hover': {
							backgroundColor: 'secondary.main',
							color: 'text.primary',
							border: '1px solid black',
						},
					}}
				>
					<TuneOutlined />
				</IconButton>
			</Tooltip>

			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				{options.map((option) => (
					<Link href={option.href} key={option.name}>
						<MenuItem
							onClick={handleClose}
							sx={{
								color: 'text.primary',
								'&:hover': {
									backgroundColor: 'primary.main',
									color: 'text.secondary',
								},
							}}
						>
							{option.name}
						</MenuItem>
					</Link>
				))}
			</Menu>
		</Box>
	);
};
