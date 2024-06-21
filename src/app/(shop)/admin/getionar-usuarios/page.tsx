'use client';
import { Box, Button, Grid, Typography } from '@mui/material';

import {
	AddUserModal,
	FilterButton,
	Search,
	SortButton,
	Table,
} from '@/components';
import { useGetAllUsersQuery } from '@/store';

const columns = [
	{ id: 'image', label: '', minWidth: 50 },
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

const rows = [
	{
		image: '/path/to/image.jpg',
		name: 'Ana Sofia Londoño Fernandez',
		birthDate: '01/08/2004',
		email: 'anasofia.a024@gmail.com',
		orders: 3,
	},
];

export const ManageUsersPage = () => {
	const { data: users } = useGetAllUsersQuery({
		page: 1,
		limit: 10,
	}) as any;

	console.log(users);

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
						<Search border />
						<AddUserModal />
						<SortButton />
						<FilterButton />
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={12} mb={10}>
				<Table columns={columns} rows={rows} />
				{/* <Table columns={columns} rows={users} /> */}
			</Grid>
		</Grid>
	);
};

export default ManageUsersPage;
