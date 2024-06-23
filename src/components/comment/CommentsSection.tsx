'use client';
import { useState } from 'react';
import { Box, Pagination, Typography } from '@mui/material';

import { Comment } from '@/components';
import { Review } from '@/interfaces';

interface Props {
	comments: Review[];
}

export const CommentsSection = ({ comments }: Props) => {
	const [page, setPage] = useState(1);
	const commentsPerPage = 5;
	const totalPages = Math.ceil(comments.length / commentsPerPage);

	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
	};

	const displayedComments = comments.slice(
		(page - 1) * commentsPerPage,
		page * commentsPerPage
	);

	return (
		<Box sx={{ my: 4 }}>
			<Typography
				variant="h5"
				component="div"
				sx={{ mb: 3, fontWeight: 'bold' }}
			>
				COMENTARIOS
			</Typography>
			{displayedComments.map((comment, index) => (
				<Comment key={index} {...comment} />
			))}
			<Pagination
				count={totalPages}
				page={page}
				onChange={handleChangePage}
				sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}
			/>
		</Box>
	);
};
