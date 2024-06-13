import { Navbar } from '@/components';

export const ShopLayout = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return (
		<main className="min-h-screen">
			<Navbar />
			<div className="px-0 sm:px-5">{children}</div>
		</main>
	);
};

export default ShopLayout;
