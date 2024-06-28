import { z } from 'zod';

export const PQRSchema = z.object({
	name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
	email: z.string().email('Correo electrónico no válido'),
	type: z.enum(['Petición', 'Queja', 'Reclamo'], {
		errorMap: () => ({ message: 'Debe seleccionar un tipo de PQR' }),
	}),
	description: z
		.string()
		.min(10, 'La descripción debe tener al menos 10 caracteres'),
	privacyPolicy: z.boolean().refine((val) => val === true, {
		message: 'Debes aceptar la política de privacidad',
	}),
});
