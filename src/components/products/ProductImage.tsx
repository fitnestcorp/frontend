import Image from 'next/image';

interface ProductImageProps {
	/**
	 * URL of the product image.
	 */
	url: string;
	/**
	 * Title or alt text for the product image.
	 */
	title: string;
	/**
	 * Optional height of the image container. Defaults to 14.
	 */
	height?: number;
}

/**
 * ProductImage component.
 * Displays a product image inside a styled container.
 *
 * @param {ProductImageProps} props - The properties for the component.
 * @returns {JSX.Element} The ProductImage component.
 */
const ProductImage = ({ url, title, height = 14 }: ProductImageProps) => {
	return (
		<div className="w-full h-64 flex items-center justify-center bg-white p-4">
			<Image
				alt={title}
				className="object-contain max-w-full max-h-full"
				width={256}
				height={256}
				src={url}
			/>
		</div>
	);
};

export default ProductImage;
