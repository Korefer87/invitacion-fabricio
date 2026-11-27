# Fabricio 60

Invitación digital para el cumpleaños 60 de Fabricio (sábado 9 de enero de 2027, 3:00 pm, Mansión Mansur). Diseño de póster de gira "1967–2027".

## Correr en local

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # genera /dist para publicar
```

## Editar la información

Todo el contenido está en [`src/config.ts`](src/config.ts):

- `lugar.coordenadas` / `lugar.foto`: ubicación en Google Maps y foto de Mansión Mansur.
- `whatsapp`: número que recibe las confirmaciones (con lada, ej. `5213312345678`).
- `gira`: las fotos por época (en `public/fotos`).
- `musicaYoutube`: código del video de YouTube para la música de fondo (vacío = sin música).
