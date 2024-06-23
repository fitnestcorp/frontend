import Link from 'next/link';
import ProductImage from './ProductImage';
import { Product } from '@/interfaces';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const averageRating = product.reviews.reduce((sum, review) => sum + review.score, 0) / product.reviews.length;

    return (
        <div className='group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6'>
            <Link href={`/producto/${product.id}`} passHref>
                <div className="block cursor-pointer">
                    <ProductImage title={product.name} url={product.image_url[0]} />

                    <div className="mt-4 text-center">
                        <h3 className="font-semibold text-xl line-clamp-1 overflow-ellipsis text-gray-800">
                            {product.name}
                        </h3>
                        
                        <div className="flex items-center justify-center mt-1 text-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927a1 1 0 011.902 0l1.287 4.01a1 1 0 00.95.69h4.205a1 1 0 01.554 1.832l-3.4 2.47a1 1 0 00-.36 1.118l1.287 4.01a1 1 0 01-1.541 1.118l-3.4-2.47a1 1 0 00-1.175 0l-3.4 2.47a1 1 0 01-1.541-1.118l1.287-4.01a1 1 0 00-.36-1.118l-3.4-2.47a1 1 0 01.554-1.832h4.205a1 1 0 00.95-.69l1.287-4.01z" />
                            </svg>
                            <span className="ml-1">{averageRating.toFixed(1)}</span>
                            <span className="text-gray-600 ml-2">({product.reviews.length} opiniones)</span>
                        </div>

                        <div className='mt-2 text-lg font-semibold text-gray-800'>
                            ${product.price}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ProductCard;
