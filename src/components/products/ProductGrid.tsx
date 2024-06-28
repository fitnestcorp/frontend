import { ProductCard } from '@/components';
import { Product } from '@/interfaces';

interface ProductGridProps {
	/**
	 * Array of products to be displayed in the grid.
	 */
	products: Product[];
}

/**
 * ProductGrid component.
 * Displays a grid of ProductCard components.
 *
 * @param {ProductGridProps} props - The properties for the component.
 * @returns {JSX.Element} The ProductGrid component.
 */
export const ProductGrid = ({ products }: ProductGridProps) => {
	return (
		<div className="pt-2 pb-6 flex flex-wrap -mx-1">
			{products.map((product) => (
				<div
					key={product.id}
					className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
				>
					<ProductCard product={product} />
				</div>
			))}
		</div>
	);
};
