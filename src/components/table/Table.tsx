'use client';
import { useState } from 'react';
import {
	Table as MuiTable,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TablePagination,
	IconButton,
	Tooltip,
} from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';

interface Column {
	id: string;
	label: string;
	minWidth?: number;
	align?: 'right' | 'left' | 'center';
	format?: (value: any) => string;
}

interface Props {
	columns: Column[];
	rows: any[];
}

export const Table = ({ columns, rows }: Props) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(20);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440, overflowX: 'auto' }}>
				<MuiTable stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
									sx={{
										whiteSpace: 'nowrap',
										color: 'text.secondary',
										fontWeight: 'bold',
										fontSize: '1rem',
									}}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
							.map((row, rowIndex) => {
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={rowIndex}
									>
										{columns.map((column) => {
											const value = row[column.id];
											if (column.id === 'actions') {
												return (
													<TableCell
														key={column.id}
														align={column.align}
													>
														<Tooltip
															title="Editar"
															arrow
														>
															<IconButton
																sx={{
																	color: '#1565c0',
																}}
															>
																<EditOutlined />
															</IconButton>
														</Tooltip>
														<Tooltip
															title="Eliminar"
															arrow
														>
															<IconButton
																sx={{
																	color: '#b71c1c',
																}}
															>
																<DeleteOutline />
															</IconButton>
														</Tooltip>
													</TableCell>
												);
											}
											return (
												<TableCell
													key={column.id}
													align={column.align}
													sx={{
														color: 'text.primary',
														fontSize: '1rem',
													}}
												>
													{column.format &&
													typeof value === 'number'
														? column.format(value)
														: value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</MuiTable>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[20, 50, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				labelRowsPerPage="Filas por página:"
				labelDisplayedRows={({ from, to, count }) =>
					`${from}-${to} de ${count}`
				}
				sx={{}}
			/>
		</Paper>
	);
};
