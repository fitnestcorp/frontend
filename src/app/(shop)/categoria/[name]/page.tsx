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
	const { name } = params;
	const category = categories.find((category) => category.name === name);

	return (
		<Box>
			<Banner
				image={`/banners/${category?.image}`}
				title={category!.name}
			/>
			<Breadcrumb />
		</Box>
	);
};

export default CategoryPage;
