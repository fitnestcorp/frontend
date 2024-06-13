'use client';
import Link from 'next/link';
import { LuUser } from 'react-icons/lu';
import { IoCartOutline } from 'react-icons/io5';

import { Sidemenu } from '@/components/sidemenu/Sidemenu';
import { titleFonts } from '@/libs/fonts';
import { Search } from '../search/Search';

export const Navbar = () => {
	return (
		<nav className="bg-black text-white flex px-5 p-1 justify-between items-center w-full">
			<div>
				{/* Logo */}
				<Link href="/">
					<span
						className={`${titleFonts.className} antialiased text-4xl font-semibold p-2`}
					>
						FITNEST
					</span>
				</Link>
			</div>

			{/* Center Menu */}
			<div className="hidden sm:block my-4">
				<Link
					href="/categoria/entrenamiento"
					className="m-2 p-2 rounded-md transition-all hover:bg-white hover:text-black"
				>
					Entrenamiento
				</Link>
				<Link
					href="/categoria/equipamiento"
					className="m-2 p-2 rounded-md transition-all hover:bg-white hover:text-black"
				>
					Equipamiento
				</Link>
				<Link
					href="/categoria/servicios" //! Esto es una categoria??
					className="m-2 p-2 rounded-md transition-all hover:bg-white hover:text-black"
				>
					Servicios
				</Link>
			</div>

			{/* Search, Cart, Login */}
			<div className="flex items-center">
				<Search className="hidden md:block mx-2 px-2" />

				<Link href="/carrito">
					<div className="relative mx-2 ms-4 hidden md:block">
						<span className="absolute text-sm rounded-full px-1 font-bold -top-2 -right-2 bg-red-600 text-white">
							3
						</span>
						<IoCartOutline className="w-5 h-5" />
					</div>
				</Link>

				<Link
					href="/iniciar-sesión"
					className="m-2 p-2 rounded-md transition-all hover:bg-white hover:text-black hidden md:block"
				>
					<LuUser className="w-5 h-5" />
				</Link>
			</div>

			{/* Show when screen is small */}
			<Sidemenu />
		</nav>
	);
};
