'use client';
import NextLink from 'next/link';
import { Box, Grid, Popover, Typography, MenuItem } from '@mui/material';
import { useGetAllCategoriesQuery, useGetAllGroupsQuery } from '@/store';

interface Props {
	anchorEl: HTMLElement | null;
	handleClose: () => void;
}

export const MenuNavbar = ({ anchorEl, handleClose }: Props) => {
	const open = Boolean(anchorEl);

	const { data: dataGroups } = useGetAllGroupsQuery({
		page: 1,
		limit: 10,
	});
	const groups = dataGroups?.[0] || [];

	const { data: dataCategories } = useGetAllCategoriesQuery({
		page: 1,
		limit: 50,
	});
	const categories = dataCategories?.[0] || [];

	if (!groups || !categories) {
		return null;
	}

	return (
		<Popover
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			sx={{ width: '80%', margin: 'auto' }}
		>
			<Box sx={{ px: 4, py: 2 }}>
				<Grid container spacing={2}>
					{groups.map((group) => (
						<Grid item key={group.id} xs={12} sm={6} md={4}>
							<Typography
								variant="h6"
								gutterBottom
								fontWeight="bold"
							>
								{group.name}
							</Typography>
							{group.categories.map((category) => (
								<MenuItem
									key={category.id}
									component={NextLink}
									href={`/categoria/${category.name
										.toLowerCase()
										.replace(/\s+/g, '-')}`}
								>
									{category.name}
								</MenuItem>
							))}
						</Grid>
					))}
				</Grid>
			</Box>
		</Popover>
	);
};
