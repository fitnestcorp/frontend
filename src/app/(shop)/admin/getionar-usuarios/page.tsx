'use client';
import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import {
	AddUserModal,
	FilterButton,
	Search,
	SortButton,
	Table,
	isAdmin,
} from '@/components';
import { useGetAllUsersQuery } from '@/store';

interface SortConfig {
	key: string;
	direction: 'asc' | 'desc';
}

interface FilterConfig {
	key: string;
	value: string;
}

const columns = [
	{ id: 'id', label: 'ID', minWidth: 50, align: 'center' as const },
	{
		id: 'name',
		label: 'Nombre completo',
		minWidth: 100,
		align: 'left' as const,
	},
	{
		id: 'birthDate',
		label: 'Fecha Nacimiento',
		minWidth: 100,
		align: 'center' as const,
	},
	{ id: 'email', label: 'Email', minWidth: 170, align: 'center' as const },
	{
		id: 'actions',
		label: 'Acciones',
		minWidth: 100,
		align: 'center' as const,
	},
];

export const ManageUsersPage = () => {
	const {
		data: usersData,
		isLoading,
		refetch,
	} = useGetAllUsersQuery({
		page: 1,
		limit: 100,
	});

	const users = usersData || [];

	const [searchTerm, setSearchTerm] = useState<string>('');
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: '',
		direction: 'asc',
	});
	const [filter, setFilter] = useState<FilterConfig>({ key: '', value: '' });

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('es-CO', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
	};

	const usersRows = users?.map((user) => ({
		name: user.first_name + ' ' + user.last_name,
		id: user.id,
		birthDate: formatDate(user.birthdate),
		email: user.email,
	}));

	const filteredUserRows = usersRows
		.filter((row) =>
			row.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.filter((row) =>
			filter.key
				? (row[filter.key as keyof typeof row] as string)
						?.toString()
						.includes(filter.value)
				: true
		);

	const sortedUserRows = [...filteredUserRows].sort((a, b) => {
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
				<Typography
					variant="h4"
					sx={{
						fontWeight: 'bold',
						color: 'text.primary',
						textAlign: { xs: 'center', md: 'left' },
					}}
				>
					Gestionar Usuarios
				</Typography>
			</Grid>

			{/* Users */}
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
								Usuarios
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
							alignItems: 'center',
							gap: 2,
							flexWrap: 'wrap',
						}}
					>
						<Search
							border
							onSearch={(value: string) => setSearchTerm(value)}
						/>
						<AddUserModal refetch={refetch} />
						<SortButton onSort={handleSort} />
						<FilterButton onFilter={handleFilter} />
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={12} mb={10}>
				<Table
					columns={columns}
					rows={sortedUserRows}
					isLoading={isLoading}
					type="usuarios"
					refetch={refetch}
				/>
			</Grid>
		</Grid>
	);
};

export default isAdmin(ManageUsersPage);
