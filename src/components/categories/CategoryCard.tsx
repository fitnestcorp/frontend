import Image from 'next/image';
import Link from 'next/link';

interface Props {
	name: string;
	imageSrc: string;
	href: string;
}

export const CategoryCard = ({ name, imageSrc, href }: Props) => {
	return (
		<Link
			href={href}
			className="relative block overflow-hidden mx-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow hover:scale-105 sm:mx-0"
		>
			<Image
				src={`/categories/${imageSrc}`}
				alt={name}
				width={500}
				height={500}
				className="transform transition-transform rounded-lg object-fill"
			/>
			<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
				<span className="text-white text-3xl md:text-2xl font-bold">
					{name[0].toUpperCase() + name.slice(1)}
				</span>
			</div>
		</Link>
	);
};
