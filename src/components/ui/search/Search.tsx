'use client';
import { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';

import { SearchSchema } from '@/schemas';

interface Props {
	border?: boolean;
	onSearch: (value: string) => void;
}

export const Search = ({ border = false, onSearch }: Props) => {
	const router = useRouter();

	const [searchValue, setSearchValue] = useState('');
	const [error, setError] = useState('');

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSearchValue(value);

		const validationResult = SearchSchema.safeParse({ search: value });
		if (!validationResult.success) {
			setError(validationResult.error.errors[0].message);
		} else {
			setError('');
			onSearch(value);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
		console.log('El formulario ha sido enviado, pero preventDefault ha sido llamado');
		router.push(`/buscar?query=${searchValue}`);
	};

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				value={searchValue}
				onChange={handleSearchChange}
				fullWidth
				placeholder="Buscar"
				variant="outlined"
				size="small"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
				}}
				error={!!error}
				helperText={error}
				sx={{
					'& .MuiOutlinedInput-root': {
						border: border ? '1px solid lightgray' : 'none',
						backgroundColor: 'background.paper',
						borderRadius: '0.5rem',
					},
					'& .MuiOutlinedInput-notchedOutline': {
						border: border ? '1px solid lightgray' : 'none',
					},
				}}
			/>
		</form>
	);
};
