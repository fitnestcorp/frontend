import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';

const TermsAndConditions = () => {
  return (
    <Container sx={{ mt: 7, mb: 7 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: '16px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
          Términos y Condiciones
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            1. Introducción
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Estos Términos y Condiciones rigen el uso de este sitio web; al usar este sitio web, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con estos términos y condiciones o con cualquier parte de estos términos y condiciones, no debes usar este sitio web.
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            2. Licencia de uso del sitio web
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            A menos que se indique lo contrario, nosotros o nuestros licenciantes poseemos los derechos de propiedad intelectual en el sitio web y el material en el sitio web. Sujeto a la licencia a continuación, todos estos derechos de propiedad intelectual están reservados.
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            3. Uso aceptable
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            No debes usar este sitio web de ninguna manera que cause, o pueda causar, daños al sitio web o deterioro de la disponibilidad o accesibilidad del sitio web; o de cualquier manera que sea ilegal, fraudulenta o dañina, o en relación con cualquier propósito o actividad ilegal, fraudulenta o dañina.
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            4. Limitaciones de responsabilidad
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            No seremos responsables ante ti (ya sea bajo la ley de contacto, la ley de agravio o de otro modo) en relación con los contenidos de, o el uso de, o de otro modo en conexión con, este sitio web: por cualquier pérdida indirecta, especial o consecuente; o por cualquier pérdida de negocios, pérdida de ingresos, ingresos, beneficios o ahorros anticipados, pérdida de contratos o relaciones comerciales, pérdida de reputación o buena voluntad, o pérdida o corrupción de información o datos.
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            5. Cambios en los términos
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Podemos revisar estos términos y condiciones de vez en cuando. Los términos y condiciones revisados se aplicarán al uso de este sitio web a partir de la fecha de publicación de los términos y condiciones revisados en este sitio web.
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            6. Ley y jurisdicción
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Estos términos y condiciones se regirán e interpretarán de acuerdo con la ley, y cualquier disputa relacionada con estos términos y condiciones estará sujeta a la jurisdicción exclusiva de los tribunales de dicha jurisdicción.
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            7. Información de contacto
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Si tienes alguna pregunta sobre estos Términos y Condiciones, por favor contáctanos en [correo electrónico] o [número de teléfono].
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsAndConditions;
