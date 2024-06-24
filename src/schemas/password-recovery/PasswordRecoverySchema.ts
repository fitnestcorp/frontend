import { z } from 'zod';

export const PasswordRecoverySchema = z.object({
	email: z.string().email({
		message: 'Debes ingresar un correo válido',
	}),
});
