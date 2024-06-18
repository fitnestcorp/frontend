import Link from 'next/link';
import ProductImage from './ProductImage';

class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    product_image: string;

    constructor(id: string, name: string, description: string, price: number, category: string, stock: number, product_image: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.stock = stock;
        this.product_image = product_image;
    }
}

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className='group w-[80vh]'>
            <Link href={`/ebook/${product.id}`} passHref>
                <div className="block">
                    
                    <ProductImage title={product.name} url={product.product_image} />

                    <div className="mt-2">
                        <h3 className="font-semibold text-lg line-clamp-1 overflow-ellipsis">
                            {product.name}
                        </h3>

                        <h4 className='text-neutral-600'>
                            {product.description}
                        </h4>

                        <div className='flex justify-between items-center w-full pr-4'>
                            <span className="text-xl font-bold">
                                ${product.price.toFixed(2)}
                            </span>
                            <span className="text-sm">
                                Stock: {product.stock}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ProductCard;
