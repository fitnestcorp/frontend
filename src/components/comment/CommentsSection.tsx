'use client';
import { useState } from 'react';
import { Box, Pagination, Typography } from '@mui/material';

import { Comment } from '@/components';
import { Review } from '@/interfaces';

/**
 * Props for the CommentsSection component.
 * 
 * @typedef {Object} Props
 * @property {Review[]} comments - Array of comment objects.
 */
interface Props {
	comments: Review[];
}

/**
 * CommentsSection component for displaying paginated comments.
 * 
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered CommentsSection component.
 */
export const CommentsSection = ({ comments }: Props) => {
	const [page, setPage] = useState(1);
	const commentsPerPage = 5;
	const totalPages = Math.ceil(comments.length / commentsPerPage);

	/**
	 * Handles the page change event for pagination.
	 * 
	 * @param {React.ChangeEvent<unknown>} event - The change event.
	 * @param {number} value - The new page number.
	 */
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
			{displayedComments.length > 0 ? (
				displayedComments.map((comment, index) => (
					<Comment key={index} comment={comment} />
				))
			) : (
				<Typography variant="body1" component="div">
					No hay comentarios
				</Typography>
			)}
			<Pagination
				count={totalPages}
				page={page}
				onChange={handleChangePage}
				sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}
			/>
		</Box>
	);
};
