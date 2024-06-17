import { Box } from '@mui/material';
import { ProductDetails } from '@/components';
import { initialData } from '@/seed/seed';

interface Props {
	params: {
		slug: string;
	};
}

const products = initialData.products;

export const ProductPage = ({ params }: Props) => {
	const { slug } = params;
	const product = products.find((product) => product.slug === slug);

	return (
		<Box>
			<ProductDetails product={product} />
		</Box>
	);
};

export default ProductPage;
