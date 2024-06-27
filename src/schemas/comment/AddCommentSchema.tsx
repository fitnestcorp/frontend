import { z } from 'zod';

export const AddCommentSchema = z.object({
	title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
	comment: z
		.string()
		.min(5, 'El comentario debe tener al menos 5 caracteres'),
	score: z
		.number()
		.min(1, 'Debes dar una calificación')
		.max(5, 'La calificación máxima es 5'),
	publication_date: z.date().optional(),
	productId: z.string(),
	userId: z.string(),
});
