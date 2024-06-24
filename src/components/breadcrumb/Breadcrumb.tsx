'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface Props {
	name?: string;
}

export const Breadcrumb = ({ name }: Props) => {
	const pathname = usePathname();
	const pathSegments = pathname.split('/').filter((segment) => segment);

	const breadcrumbLinks = pathSegments.map((segment, index) => {
		const href = '/' + pathSegments.slice(0, index + 1).join('/');
		const label = segment.charAt(0).toUpperCase() + segment.slice(1);
		return { href, label };
	});

	return (
		<Breadcrumbs
			separator={<NavigateNextIcon fontSize="small" color="primary" />}
			aria-label="breadcrumb"
		>
			<Link href="/" passHref>
				<Typography
					color="text.primary"
					variant="body1"
					sx={{
						textDecoration: 'none',
						cursor: 'pointer',
						fontWeight: 'bold',
					}}
				>
					Inicio
				</Typography>
			</Link>
			{breadcrumbLinks.map((link, index) => {
				const isLast = index === breadcrumbLinks.length - 1;
				const isCategory = link.label === 'Categoria' && !isLast;
				const isProduct = link.label === 'Producto' && !isLast;
				return isLast || isCategory || isProduct ? (
					<Typography
						key={index}
						color="text.primary"
						variant="body1"
						sx={{ fontWeight: 'bold' }}
					>
						{name}
					</Typography>
				) : (
					<Link key={index} href={link.href} passHref>
						<Typography
							color="text.primary"
							variant="body1"
							sx={{
								textDecoration: 'none',
								cursor: 'pointer',
								fontWeight: 'bold',
							}}
						>
							{link.label}
						</Typography>
					</Link>
				);
			})}
		</Breadcrumbs>
	);
};
