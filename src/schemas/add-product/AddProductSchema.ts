import { z } from 'zod';

export const AddProductSchema = z.object({
	name: z.string().min(3, {
		message: 'El nombre debe tener al menos 3 caracteres',
	}),
	price: z
		.string({
			message: 'El precio debe ser un número',
		})
		.min(1, {
			message: 'El precio debe ser mayor a 0',
		})
		.transform((value) => parseFloat(value)),
	stock: z
		.string({
			message: 'El stock debe ser un número',
		})
		.min(1, {
			message: 'El stock debe ser mayor a 0',
		})
		.transform((value) => parseInt(value)),
	description: z.string().min(10, {
		message: 'La descripción debe tener al menos 10 caracteres',
	}),
	category: z.string().min(3, {
		message: 'La categoría debe tener al menos 3 caracteres',
	}),
	group: z.string().min(3, {
		message: 'El grupo debe tener al menos 3 caracteres',
	}),
	images: z
		.array(z.string())
		.min(1, {
			message: 'Debes agregar al menos una imagen',
		})
		.max(4, {
			message: 'No puedes agregar más de 4 imágenes',
		}),
});
