'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Breadcrumbs, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const Breadcrumb = () => {
	const pathname = usePathname();
	const pathSegments = pathname.split('/').filter((segment) => segment);

	const breadcrumbLinks = pathSegments.map((segment, index) => {
		const href = '/' + pathSegments.slice(0, index + 1).join('/');
		let label = decodeURIComponent(
			segment.charAt(0).toUpperCase() + segment.slice(1)
		);
		label = label.replace(/-/g, ' ');
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
				const isGroup = link.label === 'Grupo' && !isLast;
				const isProduct = link.label === 'Producto' && !isLast;
				return isLast || isGroup || isCategory || isProduct ? (
					<Typography
						key={index}
						color="text.primary"
						variant="body1"
						sx={{ fontWeight: 'bold' }}
					>
						{link.label}
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
