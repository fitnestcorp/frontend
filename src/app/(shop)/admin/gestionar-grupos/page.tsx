'use client';
import { useEffect, useMemo, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import {
	GroupModal,
	PieChartUsage,
	Search,
	SortButton,
	Table,
	isAdmin,
} from '@/components';
import { useGetAllGroupsQuery } from '@/store';

interface SortConfig {
	key: string;
	direction: 'asc' | 'desc';
}

const columns = [
	{
		id: 'image',
		label: '',
		minWidth: 50,
		align: 'center' as const,
	},
	{
		id: 'name',
		label: 'Nombre',
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
		id: 'categories',
		label: 'Categorias',
		minWidth: 100,
		align: 'center' as const,
	},
	{ id: 'id', label: 'ID', minWidth: 170, align: 'center' as const },
	{
		id: 'actions',
		label: 'Acciones',
		minWidth: 120,
		align: 'center' as const,
	},
];

const ManageGroupsPage = () => {
	const {
		data: dataGroups,
		isLoading: isLoadingGroups,
		refetch,
	} = useGetAllGroupsQuery({
		page: 1,
		limit: 100,
	});

	const groups = useMemo(() => dataGroups?.[0] || [], [dataGroups]);

	const [searchTerm, setSearchTerm] = useState('');
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: '',
		direction: 'asc',
	});

	const [labels, setLabels] = useState<string[]>([]);
	const [soldByGroup, setSoldByGroup] = useState<number[]>([]);

	useEffect(() => {
		const labels = groups.map((group) => group.name);
		const soldByGroup = groups.map((group) =>
			group.categories.reduce(
				(acc, category) =>
					acc +
					category.products.reduce(
						(acc, product) =>
							acc + (product.stock?.unities_sold ?? 0),
						0
					),
				0
			)
		);
		setLabels(labels);
		setSoldByGroup(soldByGroup);
	}, [groups]);

	const title = 'Ventas por Grupo';

	const groupRows = groups.map((group) => ({
		name: group.name,
		image: group.image_url,
		description: group.description,
		id: group.id,
		categories: group.categories
			.map((category) => category.name)
			.join(', '),
	}));

	const filteredGroupRows = groupRows.filter((row) =>
		row.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const sortedGroupsRows = [...filteredGroupRows].sort((a, b) => {
		if (sortConfig.key) {
			const aValue: any = a[sortConfig.key as keyof typeof a];
			const bValue: any = b[sortConfig.key as keyof typeof b];
			if (aValue < bValue) {
				return sortConfig.direction === 'asc' ? -1 : 1;
			}
			if (aValue > bValue) {
				return sortConfig.direction === 'asc' ? 1 : -1;
			}
		}
		return 0;
	});

	const handleSort = (key: string) => {
		let direction: 'asc' | 'desc' = 'asc';
		if (sortConfig.key === key && sortConfig.direction === 'asc') {
			direction = 'desc';
		}
		setSortConfig({ key, direction });
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
					<Grid item xs={12} md={6}>
						<Box
							sx={{
								display: 'flex',
								gap: 5,
								justifyContent: {
									xs: 'center',
									md: 'flex-start',
								},
							}}
						>
							<Typography
								sx={{
									color: 'text.primary',
									fontWeight: 'bold',
									fontSize: '1.8rem',
								}}
							>
								Gestionar Grupos
							</Typography>
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
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
						<GroupModal refetch={refetch} />
						<SortButton onSort={handleSort} type="grupos" />
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={12} mb={10}>
				<Table
					columns={columns}
					rows={sortedGroupsRows}
					isLoading={isLoadingGroups}
					type="grupos"
					refetch={refetch}
				/>
			</Grid>

			<Grid item xs={12} mb={10}>
				<PieChartUsage
					labels={labels}
					values={soldByGroup}
					title={title}
				/>
			</Grid>
		</Grid>
	);
};

export default isAdmin(ManageGroupsPage);
