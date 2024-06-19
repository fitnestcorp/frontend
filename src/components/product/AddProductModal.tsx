'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	IconButton,
	Box,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	Grid,
	styled,
	Card,
	Input,
	InputAdornment,
	OutlinedInput,
	Tooltip,
} from '@mui/material';
import { Close, DeleteOutline, UploadFileOutlined } from '@mui/icons-material';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

export const AddProductModal = () => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				onClick={handleClickOpen}
				variant="contained"
				sx={{
					borderRadius: '0.5rem',
				}}
			>
				Crear Producto
			</Button>

			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="md"
				fullWidth
				sx={{
					'& .MuiDialog-paper': {
						borderRadius: '0.5rem',
					},
				}}
			>
				<DialogTitle>
					<IconButton
						onClick={handleClose}
						sx={{
							position: 'absolute',
							top: 10,
							right: 10,
							color: 'gray',
						}}
					>
						<Close />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={4} px={4} py={2}>
						<Grid item xs={6}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									gap: 4,
									mt: 2,
								}}
							>
								<TextField
									label="Nombre"
									variant="outlined"
									fullWidth
									sx={{
										'& label': {
											color: 'text.primary',
										},
										'& .MuiOutlinedInput-root': {
											'& fieldset': {
												borderColor: 'gray',
											},
										},
									}}
								/>

								<FormControl
									fullWidth
									sx={{
										'& label': {
											color: 'text.primary',
										},
										'& .MuiOutlinedInput-root': {
											'& fieldset': {
												borderColor: 'gray',
											},
										},
									}}
								>
									<InputLabel id="precio" htmlFor="category">
										Precio
									</InputLabel>
									<OutlinedInput
										id="precio"
										fullWidth
										label="Precio"
										startAdornment={
											<InputAdornment
												position="start"
												sx={{
													'& p': { color: 'black' },
												}}
											>
												$
											</InputAdornment>
										}
									/>
								</FormControl>

								<TextField
									label="Cantidad en inventario"
									variant="outlined"
									fullWidth
									sx={{
										'& label': {
											color: 'text.primary',
										},
										'& .MuiOutlinedInput-root': {
											'& fieldset': {
												borderColor: 'gray',
											},
										},
									}}
								/>

								<FormControl
									fullWidth
									sx={{
										'& label': {
											color: 'text.primary',
										},
										'& .MuiOutlinedInput-root': {
											'& fieldset': {
												borderColor: 'gray',
											},
										},
									}}
								>
									<InputLabel id="category-label">
										Categorías
									</InputLabel>
									<Select
										labelId="category-label"
										id="category"
										label="Categorías"
									>
										<MenuItem value="Categoria1">
											Categoria1
										</MenuItem>
										<MenuItem value="Categoria2">
											Categoria2
										</MenuItem>
										<MenuItem value="Categoria3">
											Categoria3
										</MenuItem>
									</Select>
								</FormControl>

								<FormControl
									fullWidth
									sx={{
										'& label': {
											color: 'text.primary',
										},
										'& .MuiOutlinedInput-root': {
											'& fieldset': {
												borderColor: 'gray',
											},
										},
									}}
								>
									<InputLabel id="group-label">
										Grupo
									</InputLabel>
									<Select
										labelId="group-label"
										id="group"
										label="Grupo"
									>
										<MenuItem value="Grupo1">
											Grupo1
										</MenuItem>
										<MenuItem value="Grupo2">
											Grupo2
										</MenuItem>
										<MenuItem value="Grupo3">
											Grupo3
										</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</Grid>

						<Grid item xs={6} gap={2}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									gap: 2,
									mt: 2,
								}}
							>
								<Box
									sx={{
										display: 'flex',
										gap: 2,
									}}
								>
									<Box
										sx={{
											display: 'block',
											flexDirection: 'column',
											alignItems: 'center',
											gap: 4,
										}}
									>
										<Card>
											<Image
												src="/products/mancuernas-10kg-1.jpg"
												alt="Product"
												width={80}
												height={80}
												style={{ borderRadius: '8px' }}
											/>
										</Card>

										<Card
											sx={{
												my: 2,
											}}
										>
											<Image
												src="/products/mancuernas-10kg-1.jpg"
												alt="Product"
												width={80}
												height={80}
												style={{ borderRadius: '8px' }}
											/>
										</Card>

										<Card>
											<Image
												src="/products/mancuernas-10kg-1.jpg"
												alt="Product"
												width={80}
												height={80}
												style={{ borderRadius: '8px' }}
											/>
										</Card>
									</Box>

									<Card sx={{ borderRadius: '8px' }}>
										<Image
											src="/products/mancuernas-10kg-1.jpg"
											alt="Product"
											width={200}
											height={200}
											style={{
												borderRadius: '8px',
												width: '100%',
												height: 'auto',
											}}
										/>
									</Card>
								</Box>
								<Box
									sx={{
										display: 'flex',
										gap: 2,
										justifyContent: 'center',
									}}
								>
									<Tooltip title="Eliminar imagen" arrow>
										<IconButton sx={{ color: '#b71c1c' }}>
											<DeleteOutline />
										</IconButton>
									</Tooltip>

									<Button
										component="label"
										role={undefined}
										variant="contained"
										size="small"
										tabIndex={-1}
										startIcon={<UploadFileOutlined />}
										sx={{
											border: '1px solid gray',
											borderRadius: '0.5rem',
											fontSize: '0.8rem',
											backgroundColor: 'secondary.main',
											color: 'primary.main',
											'&:hover': {
												color: 'secondary.main',
											},
										}}
									>
										Añadir imagen
										<VisuallyHiddenInput
											type="file"
											accept="image/*"
										/>
									</Button>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Descripción"
								variant="outlined"
								fullWidth
								multiline
								rows={4}
								sx={{
									'& label': {
										color: 'text.primary',
									},
									'& .MuiOutlinedInput-root': {
										'& fieldset': {
											borderColor: 'gray',
										},
									},
								}}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions
					sx={{
						display: 'flex',
						justifyContent: 'center',
						pr: 4,
						pb: 4,
					}}
				>
					<Button
						variant="contained"
						sx={{ borderRadius: '0.5rem', width: '50%', py: 1 }}
					>
						Añadir producto
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
