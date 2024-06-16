import Image from 'next/image';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

interface Props {
	name?: string;
	description?: string;
	price?: string;
	imageSrc?: string;
}

export const CartItem = ({ name, description, price, imageSrc }: Props) => {
	const [quantity, setQuantity] = useState<number>(1);

	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	return (
		<div className="relative p-3 border rounded-md shadow-md">
			<div className="flex items-center">
				<Image
					// src={imageSrc}
					src={'/products/mancuernas-10kg-1.jpg'}
					alt={name}
					width={100}
					height={100}
					className="rounded-lg"
				/>
				<div className="flex-col w-full ml-4">
					<h3 className="text-black font-bold">
						{name}Set de Mancuernas
					</h3>
					<p className="text-sm text-gray-500">
						{description}Juego de 149.9 lbs
					</p>
					<div className="flex items-center justify-between">
						<div className="flex items-center mt-3">
							<button
								onClick={decreaseQuantity}
								className="text-sm bg-gray-200 text-gray-400 rounded-full p-1 px-2 hover:bg-gray-300 hover:text-white"
							>
								-
							</button>
							<span className="text-sm text-black mx-3">
								{quantity}
							</span>
							<button
								onClick={increaseQuantity}
								className="text-sm bg-gray-200 text-gray-400 rounded-full p-1 px-1.5 hover:bg-gray-300 hover:text-white"
							>
								+
							</button>
						</div>
						<span className="text-black font-bold mt-3">
							{price}$200.000
						</span>
					</div>
				</div>
				<div className="flex flex-col items-end">
					<button className="absolute top-0 right-0 me-2 mt-2 text-gray-400 hover:text-gray-600">
						<IoCloseOutline size={20} />
					</button>
				</div>
			</div>
		</div>
	);
};
