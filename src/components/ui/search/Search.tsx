import { IoSearchOutline } from 'react-icons/io5';

interface Props {
	className?: string;
}

export const Search = ({ className }: Props) => {
	return (
		<div
			className={`${className} relative w-full`}
		>
			<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
				<IoSearchOutline className="w-5 h-5 text-gray-400" />
				<span className="sr-only">Search icon</span>
			</div>
			<input
				type="text"
				id="search-navbar"
				className="block w-full p-2 ps-10 text-sm text-gray-900 rounded-lg focus:outline-none"
				placeholder="Buscar"
			/>
		</div>
	);
};
