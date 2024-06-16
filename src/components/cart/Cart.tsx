'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { IoCartOutline, IoCloseOutline } from 'react-icons/io5';
import { CartItem } from './CartItem';

export const Cart = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
	const drawerRef = useRef<HTMLDivElement>(null);

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			drawerRef.current &&
			!drawerRef.current.contains(event.target as Node)
		) {
			setIsDrawerOpen(false);
		}
	};

	useEffect(() => {
		if (isDrawerOpen) {
			document.body.classList.add('overflow-hidden');
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.body.classList.remove('overflow-hidden');
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.body.classList.remove('overflow-hidden');
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isDrawerOpen]);

	return (
		<>
			<button
				className="relative m-2 p-2 rounded-md transition-all hover:bg-white hover:text-black"
				type="button"
				onClick={toggleDrawer}
				aria-controls="drawer-navigation"
			>
				<span className="absolute text-sm rounded-full px-1 font-bold -top-2 -right-2 bg-red-600 text-white">
					3
				</span>
				<IoCartOutline className="w-5 h-5" />
			</button>

			{isDrawerOpen && (
				<div
					className="fixed inset-0 z-30 bg-black opacity-50"
					onClick={toggleDrawer}
				></div>
			)}
			<div
				ref={drawerRef}
				id="drawer-navigation"
				className={`fixed top-0 right-0 z-40 w-96 h-screen py-4 ps-4 transition-transform ${
					isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
				} bg-white`}
				tabIndex={-1}
				aria-labelledby="drawer-navigation-label"
			>
				<h5
					id="drawer-navigation-label"
					className="text-base font-semibold mb-2 text-gray-500 uppercase"
				>
					Carrito
				</h5>
				<button
					type="button"
					onClick={toggleDrawer}
					aria-controls="drawer-navigation"
					className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
				>
					<IoCloseOutline className="w-5 h-5" />
					<span className="sr-only">Cerrar carrito</span>
				</button>
				<div className="flex flex-col h-full">
					<div className="flex-grow overflow-y-auto">
						<ul className="space-y-4 font-medium mt-2">
							<li>
								<CartItem />
							</li>
							<li>
								<CartItem />
							</li>
							<li>
								<CartItem />
							</li>
							<li>
								<CartItem />
							</li>
							<li>
								<CartItem />
							</li>
							<li>
								<CartItem />
							</li>
							<li>
								<CartItem />
							</li>
							<li>
								<CartItem />
							</li>
							<li>
								<CartItem />
							</li>
							<li>
								<CartItem />
							</li>
						</ul>
					</div>
					<div className="sticky bottom-0 p-4 bg-white border-t shadow-md">
						<div className="flex justify-between items-center mb-4">
							<span className="text-black text-lg font-bold">
								Subtotal:
							</span>
							<span className="text-black text-lg font-bold">
								$200.000
							</span>
						</div>
						<Link
							href={'#'}
							className="flex justify-center  bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
						>
							Comprar
						</Link>
					</div>
				</div>
			</div>
		</>
		// <>
		// 	<button
		// 		className="relative m-2 p-2 rounded-md transition-all hover:bg-white hover:text-black"
		// 		type="button"
		// 		onClick={toggleDrawer}
		// 		aria-controls="drawer-navigation"
		// 	>
		// 		<span className="absolute text-sm rounded-full px-1 font-bold -top-2 -right-2 bg-red-600 text-white">
		// 			3
		// 		</span>
		// 		<IoCartOutline className="w-5 h-5" />
		// 	</button>

		// 	{isDrawerOpen && (
		// 		<div
		// 			className="fixed inset-0 z-30 bg-black opacity-50"
		// 			onClick={toggleDrawer}
		// 		></div>
		// 	)}
		// 	<div
		// 		ref={drawerRef}
		// 		id="drawer-navigation"
		// 		className={`fixed top-0 right-0 z-40 w-96 h-screen p-4 overflow-y-auto transition-transform ${
		// 			isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
		// 		} bg-white`}
		// 		tabIndex={-1}
		// 		aria-labelledby="drawer-navigation-label"
		// 	>
		// 		<h5
		// 			id="drawer-navigation-label"
		// 			className="text-base font-semibold text-gray-500 uppercase"
		// 		>
		// 			Carrito
		// 		</h5>
		// 		<button
		// 			type="button"
		// 			onClick={toggleDrawer}
		// 			aria-controls="drawer-navigation"
		// 			className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
		// 		>
		// 			<IoCloseOutline className="w-5 h-5" />
		// 			<span className="sr-only">Cerrar carrito</span>
		// 		</button>
		// 		<div className="py-4 overflow-y-auto">
		// 			<ul className="space-y-2 font-medium mt-2">
		// 				<li>
		// 					<CartItem />
		// 				</li>
		// 			</ul>
		// 			<ul className="space-y-2 font-medium pt-4 mt-4 border-t border-gray-300 sm:pt-0 sm:mt-0 sm:border-none">
		// 				<li></li>
		// 			</ul>
		// 		</div>
		// 		<div className="sticky bottom-0 mt-8 p-3 border rounded-md shadow-md bg-white">
		// 			<div className="flex justify-between items-center mb-4">
		// 				<span className="text-black text-lg font-bold">
		// 					Subtotal:
		// 				</span>
		// 				{/* <span className="text-lg font-bold">${subtotal.toLocaleString()}</span> */}
		// 				<span className="text-black text-lg font-bold">$200.000</span>
		// 			</div>
		// 			<button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
		// 				Comprar
		// 			</button>
		// 		</div>
		// 		{/* <Link
		// 			className="absolute bottom-0.5 w-52 py-2 text-center text-white bg-black rounded-md hover:bg-gray-800"
		// 			href="#"
		// 		>
		// 			Comprar
		// 		</Link> */}
		// 	</div>
		// </>
	);
};
