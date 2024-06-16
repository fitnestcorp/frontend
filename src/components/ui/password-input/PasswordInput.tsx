'use client';
import { SetStateAction, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface Props {
	password: string;
	setPassword: (value: SetStateAction<string>) => void;
	label: string;
	className?: string;
	register?: UseFormRegisterReturn;
}

export const PasswordInput = ({
	password,
	setPassword,
	label,
	className,
	register,
}: Props) => {
	const [visible, setVisible] = useState<boolean>(false);

	return (
		<>
			<label htmlFor="password" className="font-semibold text-gray-600">
				{label}
			</label>
			<input
				{...register}
				value={password}
				type={visible ? 'text' : 'password'}
				className={className}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<span className="block relative float-right -top-8 right-5 cursor-pointer">
				{visible ? (
					<FaEyeSlash onClick={() => setVisible(!visible)} />
				) : (
					<FaEye onClick={() => setVisible(!visible)} />
				)}
			</span>
		</>
	);
};
