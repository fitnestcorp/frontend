import Image from 'next/image';

export const AuthLayout = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return (
		<div className='relative'>
			<Image
				src={'/background/auth-background.jpg'}
				alt="background image"
				fill
				sizes="100vw"
				style={{
					objectFit: 'cover',
					zIndex: -1,
				}}
			/>
			<div className="flex items-center justify-start min-h-screen ms-72">
				<div className="w-full max-w-xl px-20 p-6 bg-white/60 rounded-lg shadow-lg">
					<h1 className="mb-4 text-4xl font-extrabold text-center">
						FITNEST
					</h1>
					{children}
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
