import { titleFonts } from '@/libs/fonts';

interface Props {
	title: string;
	subtitle: string;
	className: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
	return (
		<div className={`${className} mt-3`}>
			<h1
				className={`${titleFonts.className} antialiased text-3xl font-semibold my-5`}
			>
				{title}
			</h1>
			{subtitle && <h3 className="text-xl mb-6">{subtitle}</h3>}
		</div>
	);
};
