import { Box } from '@mui/material';

import { Banner, Breadcrumb } from '@/components';

import { initialData } from '@/seed/seed';
import ProductCard from '@/components/products/ProductCard';
import ImageUploader from '@/components/products/Test';

interface Props {
	params: {
		name: string;
	};
}

const producto = {
	id: "123",
    name: "nombre",
    description: "descripcion",
    price: 123,
    category: "ktegorias",
    stock: 123,
    product_image: "71HEqww6NtL._AC_SX679_.jpg"
}

const categories = initialData.categories;

export const CategoryPage = ({ params }: Props) => {
	const { name } = params;
	const category = categories.find((category) => category.name === name);

	return (
		<Box>
			<Banner
				image={`/banners/${category?.image}`}
				title={category!.name}
			/>
			<Breadcrumb />
			<ProductCard product={producto}/>
		</Box>
	);
};

export default CategoryPage;

