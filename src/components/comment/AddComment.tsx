'use client';
import { useState } from 'react';
import {
	Box,
	Button,
	DialogActions,
	TextField,
	Grid,
	Snackbar,
	Alert,
	Typography,
	Rating,
	CircularProgress,
	Modal,
	Backdrop,
	Fade,
	IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { z } from 'zod';

import { AddCommentSchema } from '@/schemas';
import {
	RootState,
	useAddCommentMutation,
	useHasBoughtProductQuery,
} from '@/store';

interface Props {
	refetch: () => void;
	productId: string;
}

export const AddComment = ({ refetch, productId }: Props) => {
	const [open, setOpen] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState<
		'error' | 'success' | 'info'
	>('success');

	const [addComment] = useAddCommentMutation();

	const user = useSelector((state: RootState) => state.user.user);
	const { data: hasBoughtProduct } = useHasBoughtProductQuery({
		userId: user?.id || '',
		productId,
	});

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	const handleOpen = () => {
		if (!user) {
			setSnackbarMessage('Debes iniciar sesión para dejar un comentario');
			setSnackbarSeverity('info');
			setOpenSnackbar(true);
			return;
		} else if (!hasBoughtProduct) {
			setSnackbarMessage(
				'Debes comprar el producto para dejar un comentario'
			);
			setSnackbarSeverity('info');
			setOpenSnackbar(true);
			return;
		}
		setOpen(true);
	};

	const handleClose = () => setOpen(false);

	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<z.infer<typeof AddCommentSchema>>({
		resolver: zodResolver(AddCommentSchema),
		defaultValues: {
			title: '',
			comment: '',
			score: 0,
			productId: productId,
			userId: user?.id,
		},
	});

	async function onSubmit(data: z.infer<typeof AddCommentSchema>) {
		try {
			data.publication_date = new Date();
			await addComment(data).unwrap();
			setSnackbarMessage('Comentario enviado exitosamente');
			setSnackbarSeverity('success');
			setOpenSnackbar(true);
			refetch();
			handleClose();
		} catch (error) {
			setSnackbarMessage('Ocurrió un error al enviar el comentario');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
	}

	return (
		<div>
			<TextField
				label="Escribir comentario..."
				variant="outlined"
				fullWidth
				onClick={handleOpen}
				sx={{
					cursor: 'pointer',
					'& .MuiInputBase-root': {
						pointerEvents: 'none',
					},
				}}
			/>

			<Modal open={open} onClose={handleClose} closeAfterTransition>
				<Fade in={open}>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: { xs: '90%', sm: '70%', md: '50%' },
							bgcolor: 'background.paper',
							boxShadow: 24,
							p: 4,
							borderRadius: 2,
							outline: 'none',
						}}
					>
						<IconButton
							aria-label="close"
							onClick={handleClose}
							sx={{
								position: 'absolute',
								right: 8,
								top: 8,
								color: (theme) => theme.palette.grey[500],
							}}
						>
							<CloseIcon />
						</IconButton>
						<Typography
							variant="h6"
							component="h2"
							sx={{ mb: 2, fontWeight: 'bold' }}
						>
							Agregar comentario
						</Typography>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Controller
										name="title"
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												label="Título"
												variant="outlined"
												size="small"
												fullWidth
												error={!!errors.title}
												helperText={
													errors.title?.message
												}
												sx={{
													'& label': {
														color: 'text.primary',
													},
													'& .MuiOutlinedInput-root':
														{
															'& fieldset': {
																borderColor:
																	'gray',
															},
														},
												}}
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Controller
										name="comment"
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												label="Comentario"
												variant="outlined"
												size="small"
												fullWidth
												multiline
												rows={4}
												error={!!errors.comment}
												helperText={
													errors.comment?.message
												}
												sx={{
													'& label': {
														color: 'text.primary',
													},
													'& .MuiOutlinedInput-root':
														{
															'& fieldset': {
																borderColor:
																	'gray',
															},
														},
												}}
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Controller
										name="score"
										control={control}
										render={({ field }) => (
											<Box
												display="flex"
												alignItems="center"
											>
												<Typography component="legend">
													Calificación:
												</Typography>
												<Rating
													{...field}
													name="score"
													value={field.value}
													onChange={(_, value) =>
														field.onChange(value)
													}
													max={5}
													precision={0.5}
												/>
												{errors.score && (
													<Typography
														sx={{
															color: 'error.main',
															fontSize: '0.75rem',
															ml: 2,
														}}
													>
														{errors.score.message}
													</Typography>
												)}
											</Box>
										)}
									/>
								</Grid>
							</Grid>
							<DialogActions
								sx={{
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<Button
									type="submit"
									variant="contained"
									sx={{
										borderRadius: '0.5rem',
										textTransform: 'none',
										width: '50%',
										mt: 2,
									}}
									disabled={isSubmitting || !isDirty}
									endIcon={
										isSubmitting && (
											<CircularProgress size={20} />
										)
									}
								>
									Enviar comentario
								</Button>
							</DialogActions>
						</form>
					</Box>
				</Fade>
			</Modal>

			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbarSeverity}
					sx={{ width: '100%' }}
					variant="filled"
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</div>
	);
};
