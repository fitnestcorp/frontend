'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { SearchSchema } from '@/schemas';

interface Props {
	border?: boolean;
}

export const Search = ({ border = false }: Props) => {
	const { handleSubmit, control } = useForm<z.infer<typeof SearchSchema>>({
		resolver: zodResolver(SearchSchema),
		defaultValues: {
			search: '',
		},
	});

	// const [findProduct, { data, error }] = useFindProductMutation(); //TODO: Implement this

	const router = useRouter();
	const [errorMap, setErrorMap] = useState('');

	// async function onSubmit(data: z.infer<typeof SearchSchema>) {
	// 	let errorocurred = false;
	// 	await findProduct(data)
	// 		.unwrap()
	// 		.catch((error) => {
	// 			setErrorMap('Ocurrió un error al buscar el producto');
	// 			errorocurred = true;
	// 		});

	// 	if (!errorocurred && data) {
	// 		setErrorMap('');
	// 		router.push('/'); //TODO: Redirect to search page
	// 	}
	// }

	return (
		// <form onSubmit={handleSubmit(onSubmit)}>
		<form>
			<Controller
				name="search"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
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
				)}
			/>
		</form>
	);
};
