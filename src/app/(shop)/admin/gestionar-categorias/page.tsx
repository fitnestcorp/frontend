'use client';
import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import {
	AddCategoryModal,
	FilterButton,
	Search,
	SortButton,
	Table,
} from '@/components';
import { useGetAllCategoriesQuery } from '@/store';

interface SortConfig {
	key: string;
	direction: 'asc' | 'desc';
}

interface FilterConfig {
	key: string;
	value: string;
}

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
	{
		id: 'group',
		label: 'Grupo',
		minWidth: 100,
		align: 'center' as const,
	},
];

export const ManageCategoriesPage = () => {
	const { data: dataCategories, isLoading } = useGetAllCategoriesQuery({
		page: 1,
		limit: 10,
	});

	const categories = dataCategories?.[0] || [];

	const [searchTerm, setSearchTerm] = useState('');
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: '',
		direction: 'asc',
	});
	const [filter, setFilter] = useState<FilterConfig>({ key: '', value: '' });

	const categoryRows = categories.map((category) => ({
		name: category.name,
		image: category.image_url[0],
		description: category.description,
	}));

	const filteredCategoryRows = categoryRows.filter((row) =>
		row.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSort = (key: string) => {
		let direction: 'asc' | 'desc' = 'asc';
		if (sortConfig.key === key && sortConfig.direction === 'asc') {
			direction = 'desc';
		}
		setSortConfig({ key, direction });
	};

	const handleFilter = (key: string, value: string) => {
		setFilter({ key, value });
	};

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
						<AddCategoryModal />
						<SortButton onSort={handleSort} />
						<FilterButton onFilter={handleFilter} />
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
