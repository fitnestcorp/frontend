import React from 'react';
import { Container, Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const RefundsAndReturns = () => {
  return (
    <Container sx={{ mt: 7, mb: 7 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: '16px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
          Reembolsos y Devoluciones
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          En nuestra tienda, nos esforzamos por garantizar la satisfacción de nuestros clientes. Si no estás completamente satisfecho con tu compra, estamos aquí para ayudarte.
        </Typography>
        
        <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
          Políticas de Devolución
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Tienes 30 días calendario para devolver un artículo desde la fecha en que lo recibiste." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Para ser elegible para una devolución, el artículo debe estar sin usar y en las mismas condiciones en que lo recibiste." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Tu artículo debe estar en el embalaje original." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Tu artículo necesita tener el recibo o comprobante de compra." />
          </ListItem>
        </List>

        <Typography variant="h5" component="h2" sx={{ mb: 2, mt: 4, fontWeight: 'bold' }}>
          Políticas de Reembolso
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Una vez que recibamos tu artículo, lo inspeccionaremos y te notificaremos que hemos recibido tu artículo devuelto." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Te notificaremos inmediatamente sobre el estado de tu reembolso después de inspeccionar el artículo." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Si tu devolución es aprobada, procesaremos un reembolso a tu tarjeta de crédito (o método original de pago)." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Recibirás el crédito dentro de una cierta cantidad de días, dependiendo de las políticas de tu emisor de tarjetas." />
          </ListItem>
        </List>

        <Typography variant="h5" component="h2" sx={{ mb: 2, mt: 4, fontWeight: 'bold' }}>
          Envío de Devoluciones
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Serás responsable de pagar tus propios costos de envío para devolver tu artículo. Los costos de envío no son reembolsables. Si recibes un reembolso, el costo del envío de devolución se deducirá de tu reembolso.
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mb: 2, mt: 4, fontWeight: 'bold' }}>
          Contáctanos
        </Typography>
        <Typography variant="body1">
          Si tienes alguna pregunta sobre cómo devolver tu artículo, contáctanos en contacto@tuempresa.com.
        </Typography>
      </Paper>
    </Container>
  );
};

export default RefundsAndReturns;
