import Image from 'next/image';

interface ProductImageProps {
	url: string;
	title: string;
	height?: number;
}

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
