'use client';
import { Box, Button, Grid, Typography } from '@mui/material';

import { FilterButton, Search, SortButton, Table } from '@/components';

const columns = [
	{ id: 'productImage', label: '', minWidth: 50, align: 'center' as const },
	{
		id: 'productName',
		label: 'Nombre Producto',
		minWidth: 100,
		align: 'center' as const,
	},
	{
		id: 'categories',
		label: 'Categorías',
		minWidth: 100,
		align: 'center' as const,
	},
	{ id: 'uuid', label: 'UUID', minWidth: 170, align: 'center' as const },
	{
		id: 'price',
		label: 'Precio',
		minWidth: 100,
		align: 'center' as const,
		format: (value: number) => value.toLocaleString('en-US'),
	},
	{
		id: 'quantity',
		label: 'Cantidad',
		minWidth: 100,
		align: 'center' as const,
		format: (value: number) => value.toLocaleString('en-US'),
	},
	{ id: 'status', label: 'Estatus', minWidth: 100, align: 'center' as const },
	{
		id: 'actions',
		label: 'Acciones',
		minWidth: 100,
		align: 'center' as const,
	},
];

const rows = [
	{
		productImage: '/path/to/product.jpg',
		productName: 'Set de mancuernas',
		categories: 'Fuerza, mancuernas',
		uuid: '107222fb-d46c-483d-887f-489c9ca0573a',
		price: 200000,
		quantity: 158,
		status: 'Activo',
	},
	{
		productImage: '/path/to/product.jpg',
		productName: 'Set de mancuernas',
		categories: 'Fuerza, mancuernas',
		uuid: '107222fb-d46c-483d-887f-489c9ca0573a',
		price: 200000,
		quantity: 158,
		status: 'Activo',
	},
	{
		productImage: '/path/to/product.jpg',
		productName: 'Set de mancuernas',
		categories: 'Fuerza, mancuernas',
		uuid: '107222fb-d46c-483d-887f-489c9ca0573a',
		price: 200000,
		quantity: 158,
		status: 'Activo',
	},
];

export const ManageInventoryPage = () => {
	return (
		<Grid
			container
			spacing={6}
			sx={{
				// p: 5,
				px: 10,
				my: 2,
			}}
		>
			<Grid item xs={9}>
				<Typography
					variant="h4"
					sx={{
						fontWeight: 'bold',
						color: 'text.primary',
					}}
				>
					Gestionar Inventario
				</Typography>
			</Grid>
			<Grid item xs={3}>
				<Search border />
			</Grid>

			<Grid item xs={12}>
				<Grid container spacing={2}>
					<Grid item xs={9}>
						<Box sx={{ display: 'flex', gap: 2 }}>
							<Button
								variant="contained"
								sx={{
									borderRadius: '0.5rem',
								}}
							>
								Crear Producto
							</Button>
							<Button
								variant="outlined"
								sx={{
									borderRadius: '0.5rem',
								}}
							>
								Crear Grupo
							</Button>
							<Button
								variant="outlined"
								sx={{
									borderRadius: '0.5rem',
								}}
							>
								Crear Categoría
							</Button>
						</Box>
					</Grid>
					<Grid
						item
						xs={3}
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							gap: 2,
						}}
					>
						<SortButton />

						<FilterButton />
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={12}>
				<Table columns={columns} rows={rows} />
				{/* <Box sx={{ width: '100%', overflow: 'hidden' }}> */}
				{/* </Box> */}
			</Grid>
		</Grid>
	);
};

export default ManageInventoryPage;
