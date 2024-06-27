import { Review } from '@/interfaces';
import { Box, Typography, Rating } from '@mui/material';

interface Props {
	comment: Review;
}

export const Comment = ({ comment }: Props) => {
	const { user, publication_date, score, title, comment: content } = comment;

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('es-CO', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	};

	return (
		<Box
			sx={{
				mb: 3,
				p: 2,
				border: '1px solid #ddd',
				borderRadius: '8px',
				boxShadow: 2,
				backgroundColor: 'background.paper',
			}}
		>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography variant="subtitle1" component="div">
					{user}
				</Typography>
				<Typography variant="caption" color="gray">
					Publicado el {formatDate(publication_date)}
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
				<Rating value={score} readOnly precision={0.5} />
				<Typography
					variant="subtitle1"
					component="div"
					fontWeight="bold"
				>
					{title}
				</Typography>
			</Box>
			<Typography variant="body2" component="p" sx={{ mt: 2 }}>
				{content}
			</Typography>
		</Box>
	);
};
