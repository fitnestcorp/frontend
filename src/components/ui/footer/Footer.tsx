import { titleFonts } from '@/libs/fonts';
import Link from 'next/link';

export const Footer = () => {
	return (
		<footer className="bg-black text-white py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
					<div className="lg:col-span-2">
						<h3
							className={`${titleFonts.className} text-3xl antialiased font-semibold`}
						>
							FITNEST
						</h3>
						<p className="mt-2 text-gray-300">
							P. Sherman, 42 Wallaby Way, Sydney
						</p>
						<p className="mt-2 text-gray-300">
							Teléfono:{' '}
							<span className="font-bold text-white">
								(+01) 234-567-89
							</span>
						</p>
						<p className="mt-2 text-gray-300">
							Email:{' '}
							<span className="font-bold text-white">
								support@fitnest.com
							</span>
						</p>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-2">
							Información
						</h4>
						<ul>
							<li className="mt-2 text-gray-300">
								<Link
									href="/sobre-nosotros"
									className="hover:underline"
								>
									Sobre nosotros
								</Link>
							</li>
							<li className="mt-2 text-gray-300">
								<Link
									href="/contactanos"
									className="hover:underline"
								>
									Contáctanos
								</Link>
							</li>
						</ul>
					</div>
					<div className="md:col-start-2 md:col-span-1 lg:col-span-1">
						<h4 className="text-lg font-semibold mb-2">
							Atención al cliente
						</h4>
						<ul>
							<li className="mt-2 text-gray-300">
								<Link
									href="/terminos-y-condiciones"
									className="hover:underline"
								>
									Términos y condiciones
								</Link>
							</li>
							<li className="mt-2 text-gray-300">
								<Link
									href="/reembolsos-y-devoluciones"
									className="hover:underline"
								>
									Reembolsos y devoluciones
								</Link>
							</li>
							<li className="mt-2 text-gray-300">
								<Link href="/pqrs" className="hover:underline">
									PQRs
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};
