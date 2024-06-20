'use client';
import { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

import {
	AddProductModal,
	FilterButton,
	Search,
	SortButton,
	Table,
} from '@/components';
import { useGetAllProductsQuery } from '@/store';

const columns = [
	{ id: 'image', label: '', minWidth: 50, align: 'center' as const },
	{
		id: 'name',
		label: 'Nombre Producto',
		minWidth: 100,
		align: 'center' as const,
	},
	{
		id: 'type',
		label: 'Tipo',
		minWidth: 100,
		align: 'center' as const,
	},
	{
		id: 'category',
		label: 'Categoria',
		minWidth: 100,
		align: 'center' as const,
	},
	{ id: 'id', label: 'ID', minWidth: 170, align: 'center' as const },
	{
		id: 'price',
		label: 'Precio',
		minWidth: 100,
		align: 'center' as const,
		format: (value: number) => value.toLocaleString('en-US'),
	},
	{
		id: 'stock',
		label: 'Stock',
		minWidth: 100,
		align: 'center' as const,
		format: (value: number) => value.toLocaleString('en-US'),
	},
	{ id: 'status', label: 'Estatus', minWidth: 100, align: 'center' as const },
	{
		id: 'creation_date',
		label: 'Fecha de Creación',
		minWidth: 100,
		align: 'center' as const,
	},
	{
		id: 'actions',
		label: 'Acciones',
		minWidth: 100,
		align: 'center' as const,
	},
];

const rows = [
	{
		image: '/products/mancuernas-10kg-1.jpg',
		name: 'Set de mancuernas',
		categories: 'Fuerza, mancuernas',
		uuid: '107222fb-d46c-483d-887f-489c9ca0573a',
		price: 200000,
		quantity: 158,
		status: 'Activo',
	},
];

export const ManageInventoryPage = () => {
	const { data, isLoading } = useGetAllProductsQuery({
		page: 1,
		limit: 10,
	});
	const products = data?.[0] || [];

	console.log(products);

	const [searchTerm, setSearchTerm] = useState('');

	const productRows = products.map((product) => ({
		id: product.id,
		name: product.name,
		type: product.type,
		creation_date: product.create_date,
		price: '$' + product.price,
		image: product.image_url[0],
		category: product.category.name,
		status: product.status,
		stock: product.stock.stock,
	}));

	console.log('rows', rows);

	const filteredProductRows = productRows.filter((row) =>
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
				<Typography
					variant="h4"
					sx={{
						fontWeight: 'bold',
						color: 'text.primary',
						textAlign: { xs: 'center', md: 'left' },
					}}
				>
					Gestionar Inventario
				</Typography>
			</Grid>

			{/* Products */}
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
								Productos
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
							onSearch={(value) => setSearchTerm(value)}
						/>
						<AddProductModal />
						<SortButton />
						<FilterButton />
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={12} mb={10}>
				<Table
					columns={columns}
					rows={filteredProductRows}
					isLoading={isLoading}
				/>
				{/* <Table columns={columns} rows={rows} /> */}
			</Grid>

			{/* Groups */}
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
								Grupos
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
							Crear Grupo
						</Button>
						<SortButton />
						<FilterButton />
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={12} mb={10}>
				<Table
					columns={columns}
					rows={productRows}
					isLoading={isLoading}
				/>
			</Grid>

			{/* Categories */}
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
								Categorías
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
					rows={productRows}
					isLoading={isLoading}
				/>
			</Grid>
		</Grid>
	);
};

export default ManageInventoryPage;
