import { z } from 'zod';

const imageFileSchema = z
	.instanceof(File)
	.refine((file) => file.size > 0, {
		message: 'El archivo no debe estar vacío',
	})
	.refine(
		(file) => ['image/jpg', 'image/jpeg', 'image/png'].includes(file.type),
		{
			message: 'El archivo debe ser de tipo JPG, JPEG o PNG',
		}
	)
	.refine((file) => file.size <= 5 * 1024 * 1024, {
		message: 'El archivo no debe ser mayor a 5MB',
	});

export const AddCategorySchema = z.object({
	name: z.string().min(3, {
		message: 'El nombre debe tener al menos 3 caracteres',
	}),
	description: z.string().min(10, {
		message: 'La descripción debe tener al menos 10 caracteres',
	}),
	url: z.union([
		imageFileSchema,
		z.string().min(1, {
			message: 'Debes agregar una imagen',
		}),
	]),
	groupName: z.string().min(1, {
		message: 'Debes seleccionar un grupo',
	}),
});
