import { Container } from '@mui/material';

import { PQRForm } from '@/components';

/**
 * PQRsPage page renders a form for handling PQR (Petitions, Complaints, and Claims).
 *
 * @page
 * @example
 * return (
 *   <PQRsPage />
 * )
 */
const PQRsPage = () => {
	return (
		<Container>
			<PQRForm />
		</Container>
	);
};

export default PQRsPage;
