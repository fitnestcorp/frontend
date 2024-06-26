import { z } from 'zod';

export const AddCategorySchema = z.object({
	name: z.string().min(3, {
		message: 'El nombre debe tener al menos 3 caracteres',
	}),
	description: z.string().min(10, {
		message: 'La descripción debe tener al menos 5 caracteres',
	}),
	url: z.string().min(1, {
		message: 'Debes agregar una imagen',
	}),
	groupName: z.string().min(1, {
		message: 'Debes seleccionar un grupo',
	}),
});
