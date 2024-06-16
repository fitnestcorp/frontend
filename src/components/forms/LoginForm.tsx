'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { LoginSchema } from '@/schemas';
import { useLoginUserMutation } from '@/store';
import { PasswordInput } from '../ui/password-input/PasswordInput';

export const LoginForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const router = useRouter();

	const [succesfully, setSuccesfully] = useState('');
	const [errorMap, setErrorMap] = useState('');
	const [password, setPassword] = useState('');

	const [loginUser, { data, error }] = useLoginUserMutation();

	async function onSubmit(data: z.infer<typeof LoginSchema>) {
		let errorocurred = false;
		await loginUser(data)
			.unwrap()
			.catch((error) => {
				setErrorMap('Ocurrió un error al iniciar sesión');
				errorocurred = true;
			});

		if (!errorocurred && data) {
			setErrorMap('');
			setSuccesfully('Sesión iniciada correctamente');
			router.push('/');
		}
	}
	return (
		<div className="fade-in">
			<h2 className="mb-6 text-xl font-semibold text-center uppercase">
				Iniciar Sesión
			</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-5">
					<div className="relative space-y-1">
						<label
							htmlFor="email"
							className="font-semibold text-gray-600"
						>
							Email
						</label>
						<input
							{...register('email', { required: true })}
							type="email"
							name="email"
							className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
								errors?.email
									? 'focus:ring-red-600'
									: 'focus:ring-blue-600'
							}`}
						/>
						{errors?.email && (
							<span className="text-red-600 text-sm">
								{errors?.email?.message}
							</span>
						)}
					</div>
					<div className="relative space-y-1">
						<PasswordInput
							password={password}
							setPassword={setPassword}
							label="Contraseña"
							className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
								errors?.password
									? 'focus:ring-red-600'
									: 'focus:ring-blue-600'
							}`}
							register={register('password', { required: true })}
						/>
						{errors?.password && (
							<span className="text-red-600 text-sm">
								{errors?.password?.message}
							</span>
						)}
					</div>

					{succesfully != '' && (
						<div className="text-green-600 text-center font-bold mb-2 text-sm">
							{succesfully}
						</div>
					)}
					{errorMap != '' && (
						<div className="text-red-600 text-center font-bold mb-2 text-sm">
							{errorMap}
						</div>
					)}
					<button
						className="w-full py-2 pt-2 font-bold text-white bg-black rounded-md hover:bg-gray-800"
						disabled={!isDirty || isSubmitting}
					>
						Iniciar Sesión
					</button>
				</div>
			</form>
			<p className="mt-4 text-center">
				¿Aún no tienes cuenta?{' '}
				<Link
					href="/registrarse"
					className="text-blue-600 hover:underline"
				>
					Crear cuenta
				</Link>
			</p>
		</div>
	);
};
