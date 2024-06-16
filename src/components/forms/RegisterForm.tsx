'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { RegisterSchema } from '@/schemas';
import { useRegisterUserMutation } from '@/store';
import { PasswordInput } from '../ui/password-input/PasswordInput';

export const RegisterForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			birthDate: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const router = useRouter();

	const [succesfully, setSuccesfully] = useState('');
	const [errorMap, setErrorMap] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [registerUser, { data, error }] = useRegisterUserMutation();

	async function onSubmit(data: z.infer<typeof RegisterSchema>) {
		let errorocurred = false;
		await registerUser(data)
			.unwrap()
			.catch((error) => {
				setErrorMap('Ocurrió un error al registrar el usuario');
				errorocurred = true;
			});

		if (!errorocurred && data) {
			setErrorMap('');
			setSuccesfully('Usuario registrado correctamente');
			router.push('/');
		}
	}

	return (
		<>
			<h2 className="mb-6 text-xl font-semibold text-center">
				REGISTRARSE
			</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-5">
					<div className="relative space-y-1">
						<label
							htmlFor="firstName"
							className="font-semibold text-gray-600"
						>
							Nombre
						</label>
						<input
							{...register('firstName', { required: true })}
							type="text"
							name="firstName"
							className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
								errors?.firstName
									? 'focus:ring-red-600'
									: 'focus:ring-blue-600'
							}`}
						/>
						{errors?.firstName && (
							<span className="text-red-600 text-sm">
								{errors?.firstName?.message}
							</span>
						)}
					</div>
					<div className="relative space-y-1">
						<label
							htmlFor="lastName"
							className="font-semibold text-gray-600"
						>
							Apellido
						</label>
						<input
							{...register('lastName', { required: true })}
							type="text"
							name="lastName"
							className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
								errors?.lastName
									? 'focus:ring-red-600'
									: 'focus:ring-blue-600'
							}`}
						/>
						{errors?.lastName && (
							<span className="text-red-600 text-sm">
								{errors?.lastName?.message}
							</span>
						)}
					</div>
					<div className="relative space-y-1">
						<label
							htmlFor="birthDate"
							className="font-semibold text-gray-600"
						>
							Fecha de nacimiento
						</label>
						<input
							{...register('birthDate', { required: true })}
							type="date"
							name="birthDate"
							className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
								errors?.birthDate
									? 'focus:ring-red-600'
									: 'focus:ring-blue-600'
							}`}
						/>
						{errors?.birthDate && (
							<span className="text-red-600 text-sm">
								{errors?.birthDate?.message}
							</span>
						)}
					</div>
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
					<div className="relative space-y-1">
						<PasswordInput
							password={confirmPassword}
							setPassword={setConfirmPassword}
							label="Confirmar contraseña"
							className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
								errors?.confirmPassword
									? 'focus:ring-red-600'
									: 'focus:ring-blue-600'
							}`}
							register={register('confirmPassword', {
								required: true,
							})}
						/>
						{errors?.confirmPassword && (
							<span className="text-red-600 text-sm">
								{errors?.confirmPassword?.message}
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
						Registrarse
					</button>
				</div>
			</form>
			<p className="mt-4 text-center">
				¿Ya tienes una cuenta?{' '}
				<Link
					href="/iniciar-sesión"
					className="text-blue-600 hover:underline"
				>
					Iniciar sesión
				</Link>
			</p>
		</>
	);
};
