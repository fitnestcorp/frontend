import { Box, Typography, Rating } from '@mui/material';

interface Props {
	author: string;
	publication_date: string;
	score: number;
	title: string;
	content: string;
}

export const Comment = ({
	author,
	publication_date,
	score,
	title,
	content,
}: Props) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('es-CO', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
	};

	return (
		<Box
			sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: '8px' }}
		>
			<Typography variant="h6" component="div">
				{author}
			</Typography>
			<Typography variant="caption" color="text.secondary">
				Publicado el {formatDate(publication_date)}
			</Typography>
			<Rating value={score} readOnly precision={0.5} sx={{ mt: 1 }} />
			<Typography variant="subtitle1" component="div" sx={{ mt: 1 }}>
				{title}
			</Typography>
			<Typography variant="body2" component="p" sx={{ mt: 1 }}>
				{content}
			</Typography>
		</Box>
	);
};
