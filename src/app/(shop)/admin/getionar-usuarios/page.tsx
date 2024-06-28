'use client';
import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import { AddUserModal, Search, SortButton, Table, isAdmin } from '@/components';
import { useGetAllUsersQuery } from '@/store';

/**
 * Configuration for sorting.
 * @typedef {Object} SortConfig
 * @property {string} key - The key to sort by.
 * @property {'asc' | 'desc'} direction - The direction of the sort.
 */
interface SortConfig {
	key: string;
	direction: 'asc' | 'desc';
}

/**
 * Column configuration for the users table.
 */
const columns = [
	{ id: 'id', label: 'ID', minWidth: 50, align: 'center' as const },
	{
		id: 'name',
		label: 'Nombre completo',
		minWidth: 100,
		align: 'center' as const,
	},
	{
		id: 'birthDate',
		label: 'Fecha Nacimiento',
		minWidth: 100,
		align: 'center' as const,
	},
	{ id: 'email', label: 'Email', minWidth: 170, align: 'center' as const },
];

/**
 * The ManageUsersPage component allows admin users to manage user accounts.
 *
 * @page
 * @returns {JSX.Element} The rendered ManageUsersPage component.
 */
const ManageUsersPage = () => {
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

	/**
	 * Formats a date string to the local date format.
	 *
	 * @param {string} dateString - The date string to format.
	 * @returns {string} The formatted date.
	 */
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
		birthDate: formatDate(user.birth_date),
		email: user.email,
	}));

	const filteredUserRows = usersRows.filter((row) =>
		row.name.toLowerCase().includes(searchTerm.toLowerCase())
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

	/**
	 * Handles sorting of the table.
	 *
	 * @param {string} key - The key to sort by.
	 */
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
								Gestionar Usuarios
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
						<SortButton onSort={handleSort} type="usuarios" />
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={12} mb={10}>
				<Table
					columns={columns}
					rows={sortedUserRows}
					isLoading={isLoading}
					type="productos"
					refetch={refetch}
				/>
			</Grid>
		</Grid>
	);
};

export default isAdmin(ManageUsersPage);
