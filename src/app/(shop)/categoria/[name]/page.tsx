import { Box } from '@mui/material';
import { Banner, Breadcrumb } from '@/components';
import { initialData } from '@/seed/seed';
import ProductGrid from '@/components/products/ProductGrid';
import ImageUploader from '@/components/products/Test';
import { Product, Review, User } from '@/interfaces';

interface Props {
	params: {
		name: string;
	};
}

const usuario: User = {
	id: "123",
	email: "123@123.com",
	firstName: "hola",
	lastName: "chao",
	role: "Cient"
}

const review : Review = {
	id: "123",
	comment: "Si",
	rate: 4.5,
	user: usuario
}

const producto1 : Product = {
	id: "123",
	name: "mancuernas",
	description: "muy pesadas",
	price: 20,
	rate: 4.5,
    stock: 10,
	images: ["71HEqww6NtL._AC_SX679_.jpg"],
	reviews: [review]
}
const producto2 : Product = {
	id: "123",
	name: "mancuernas",
	description: "muy pesadas",
	price: 20,
	rate: 4.5,
    stock: 10,
	images: ["812w7U9WzwL._AC_SX679_.jpg"],
	reviews: [review]
}
const producto3 : Product = {
	id: "123",
	name: "mancuernas",
	description: "muy pesadas",
	price: 20,
	rate: 4.5,
    stock: 10,
	images: ["71HEqww6NtL._AC_SX679_.jpg"],
	reviews: [review]
}
const producto4 : Product = {
	id: "123",
	name: "mancuernas",
	description: "muy pesadas",
	price: 20,
	rate: 4.5,
    stock: 10,
	images: ["812w7U9WzwL._AC_SX679_.jpg"],
	reviews: [review]
}
const productos : Product[] = [producto1,producto2,producto3,producto4]

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
			<ProductGrid products={productos} />
		</Box>
	);
};

export default CategoryPage;

