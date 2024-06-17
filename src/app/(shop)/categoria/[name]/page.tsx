import { Box } from '@mui/material';

import { Banner, Breadcrumb } from '@/components';

import { initialData } from '@/seed/seed';

interface Props {
	params: {
		name: string;
	};
}

const categories = initialData.categories;

export const CategoryPage = ({ params }: Props) => {
	const breadcrumbLinks = [
		{ href: '/', label: 'Inicio' },
		{ href: '/categoria', label: 'Categorías' },
	];

	const { name } = params;
	const category = categories.find((category) => category.name === name);

	return (
		<Box>
			<Banner
				image={`/banners/${category?.image}`}
				title={category!.name}
			/>
			<Breadcrumb links={breadcrumbLinks} current={category!.name} />
		</Box>
	);
};

export default CategoryPage;
