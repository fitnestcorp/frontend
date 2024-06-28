import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';

const AboutUs = () => {
  return (
    <Container sx={{ mt: 7, mb: 7 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: '16px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
          Sobre Nosotros
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Somos un equipo de 5 apasionados por el desarrollo de software y el deporte. Nuestra misión es crear soluciones tecnológicas innovadoras que mejoren la vida de las personas y fomenten un estilo de vida saludable y activo.
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
          Nuestro Equipo
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Nuestro equipo está compuesto por profesionales con experiencia en diversas áreas del desarrollo de software, incluyendo desarrollo web, aplicaciones móviles, inteligencia artificial y más. Cada uno de nosotros aporta una perspectiva única y habilidades especializadas que nos permiten abordar proyectos de manera integral y eficiente.
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Creemos en el poder del deporte y la tecnología para transformar vidas. Nos esforzamos por ofrecer productos y servicios de alta calidad que no solo cumplan con las expectativas de nuestros clientes, sino que también las superen. Nuestro compromiso con la excelencia y la innovación nos impulsa a seguir aprendiendo y mejorando continuamente.
        </Typography>
        <Typography variant="body1">
          Si tienes alguna pregunta o deseas saber más sobre nuestro trabajo, no dudes en ponerte en contacto con nosotros. ¡Estamos aquí para ayudarte!
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutUs;
