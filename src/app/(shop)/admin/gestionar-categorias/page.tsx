'use client';
import { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

import { FilterButton, Search, SortButton, Table } from '@/components';
import { useGetAllCategoriesQuery } from '@/store';

const columns = [
	{ id: 'image', label: '', minWidth: 50, align: 'center' as const },
	{
		id: 'name',
		label: 'Nombre Categoría',
		minWidth: 100,
		align: 'center' as const,
	},
	{
		id: 'description',
		label: 'Descripción',
		minWidth: 100,
		align: 'center' as const,
	},
];

export const ManageCategoriesPage = () => {
	const { data, isLoading } = useGetAllCategoriesQuery({
		page: 1,
		limit: 10,
	});

	const categories = data?.[0] || [];

	const [searchTerm, setSearchTerm] = useState('');

	const categoryRows = categories.map((category) => ({
		name: category.name,
		image: category.image_url[0],
		description: category.description,
	}));

	const filteredCategoryRows = categoryRows.filter((row) =>
		row.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<Grid
			container
			spacing={4}
			sx={{
				px: { xs: 2, md: 10 },
				my: 2,
			}}
		>
			<Grid item xs={12}>
				<Grid container spacing={2} alignItems="center">
					<Grid item xs={12} md={8}>
						<Box sx={{ display: 'flex', gap: 5 }}>
							<Typography
								sx={{
									color: 'text.primary',
									fontWeight: 'bold',
									fontSize: '1.8rem',
								}}
							>
								Gestionar Categorías
							</Typography>
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						md={4}
						sx={{
							display: 'flex',
							justifyContent: { xs: 'center', md: 'flex-end' },
							gap: 2,
							flexWrap: 'wrap',
						}}
					>
						<Search
							border
							onSearch={(value) => setSearchTerm(value)}
						/>
						<Button
							variant="contained"
							sx={{
								borderRadius: '0.5rem',
							}}
						>
							Crear Categoría
						</Button>
						<SortButton />
						<FilterButton />
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={12} mb={10}>
				<Table
					columns={columns}
					rows={filteredCategoryRows}
					isLoading={isLoading}
					type="categorías"
				/>
			</Grid>
		</Grid>
	);
};

export default ManageCategoriesPage;
