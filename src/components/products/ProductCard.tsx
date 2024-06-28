'use client';
import Link from 'next/link';
import ProductImage from './ProductImage';

import { Product } from '@/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface ProductCardProps {
	/**
	 * The product object to be displayed.
	 */
	product: Product;
}

/**
 * ProductCard component.
 * Displays product information in a card format.
 *
 * @param {ProductCardProps} props - The properties for the component.
 * @returns {JSX.Element} The ProductCard component.
 */
export const ProductCard = ({ product }: ProductCardProps) => {
	const isAdmin = useSelector(
		(state: RootState) => state.user.user?.role === 'ADMIN'
	);

	let averageRating =
		product.reviews.reduce((sum, review) => sum + review.score, 0) /
		product.reviews.length;

	if (isNaN(averageRating)) {
		averageRating = 0;
	}

	/**
	 * Formats a number as currency in Colombian Pesos (COP).
	 *
	 * @param {number} value - The value to format.
	 * @returns {string} The formatted currency string.
	 */
	const formatCurrency = (value: number) => {
		const formattedValue = new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: 'COP',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(value);

		return formattedValue.replace('COP', '').trim();
	};

	return (
		<div className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
			<Link href={`/producto/${product.id}`} passHref>
				<div className="block cursor-pointer">
					<ProductImage
						title={product.name}
						url={product.image_urls[0]}
					/>

					<div className="mt-4 text-center">
						<h3 className="font-semibold text-xl line-clamp-1 overflow-ellipsis text-gray-800">
							{product.name}
						</h3>

						<div className="flex items-center justify-center mt-1 text-yellow-500">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M9.049 2.927a1 1 0 011.902 0l1.287 4.01a1 1 0 00.95.69h4.205a1 1 0 01.554 1.832l-3.4 2.47a1 1 0 00-.36 1.118l1.287 4.01a1 1 0 01-1.541 1.118l-3.4-2.47a1 1 0 00-1.175 0l-3.4 2.47a1 1 0 01-1.541-1.118l1.287-4.01a1 1 0 00-.36-1.118l-3.4-2.47a1 1 0 01.554-1.832h4.205a1 1 0 00.95-.69l1.287-4.01z" />
							</svg>
							<span className="ml-1">
								{averageRating.toFixed(1)}
							</span>
							<span className="text-gray-600 ml-2">
								({product.reviews.length} reseñas)
							</span>
						</div>

						<div className="mt-2 text-lg font-semibold text-gray-800">
							{formatCurrency(product.price)}
						</div>

						{isAdmin && (
							<span className="text-gray-400 ml-2">
								({product.stock.unities_sold} vendidos)
							</span>
						)}
					</div>
				</div>
			</Link>
		</div>
	);
};
