// Datos de la invitación. Edita este archivo para cambiar la información.

export const EVENTO = {
  nombre: 'Fabricio',
  edad: 60,
  nacimiento: '7 de enero de 1967',
  cumple: '7 de enero de 2027',

  // Fecha y hora de inicio (hora del centro de México)
  fechaISO: '2027-01-09T15:00:00-06:00',
  fechaTexto: 'Sábado 9 de enero de 2027',
  fechaCorta: '09.01.27',
  hora: '3:00 pm',
  // Para "Agregar al calendario" (inicio/fin en hora local)
  calendario: '20270109T150000/20270109T230000',

  lugar: {
    nombre: 'Mansión Mansur',
    // Escribe aquí la dirección cuando la tengas; si está vacía no se muestra.
    direccion: '',
    // Ubicación exacta en Google Maps (latitud, longitud)
    coordenadas: '20.6627313290997,-103.43010018027319',
    foto: 'fotos/lugar.jpg',
  },

  vestimenta: 'Casual. Ven cómodo y con ganas de bailar.',

  // Las fotos por época (están en public/fotos)
  gira: [
    { epoca: '1967', titulo: 'El debut', foto: 'fotos/bebe.jpg' },
    { epoca: '70s', titulo: 'Gira del moño rojo', foto: 'fotos/nino.jpg' },
    { epoca: '80s', titulo: 'Tour de los rizos', foto: 'fotos/joven.jpg' },
    { epoca: '90s', titulo: 'Traje y corbata', foto: 'fotos/traje.jpg' },
    { epoca: '2010s', titulo: 'Lentes y barba', foto: 'fotos/lentes.jpg' },
    { epoca: 'Hoy', titulo: '60 y contando', foto: 'fotos/hoy.jpg' },
  ],
  fotoPortada: 'fotos/lentes.jpg',

  // Número de WhatsApp que recibe las confirmaciones, con lada de país y sin espacios.
  // Ejemplo: '5213312345678'. Si se deja vacío, WhatsApp pedirá elegir el contacto.
  whatsapp: '523330132720',

  // Canción de fondo: el código del video de YouTube (lo que va después de "watch?v=").
  // Déjalo vacío para quitar la música.
  musicaYoutube: '',
};

export const mapaUrl = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EVENTO.lugar.coordenadas)}`;

export const mapaEmbed = () =>
  `https://maps.google.com/maps?q=${encodeURIComponent(EVENTO.lugar.coordenadas)}&z=16&output=embed`;
