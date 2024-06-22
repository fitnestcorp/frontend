import { z } from 'zod';

export const AddGroupSchema = z.object({
	name: z.string().min(3, {
		message: 'El nombre debe tener al menos 3 caracteres',
	}),
	description: z.string().min(10, {
		message: 'La descripción debe tener al menos 10 caracteres',
	}),
	url: z.string().min(1, {
		message: 'Debes agregar una imagen',
	}),
});
