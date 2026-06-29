# E-commerce backend en tiempo real

Segunda entrega del backend de e-commerce. Amplía la API de productos y carritos con vistas web y actualización de productos en tiempo real mediante Socket.IO.

## Funcionalidades

- CRUD de productos y gestión de carritos.
- Persistencia local en archivos JSON.
- Vista principal del catálogo.
- Vista `realtimeproducts` para agregar y eliminar productos.
- Sincronización automática entre clientes conectados por WebSockets.

## Stack

- Node.js y JavaScript
- Express
- Socket.IO
- Handlebars
- UUID
- HTML y cliente JavaScript
- Nodemon

## Organización

- `app.js`: servidor HTTP, vistas y rutas.
- `routes/`: endpoints de productos y carritos.
- `managers/`: acceso a los archivos de datos.
- `views/`: plantillas del catálogo y panel en tiempo real.
- `public/js/realtime.js`: comunicación del navegador con Socket.IO.
- `socket.js`: eventos del servidor.

## Ejecución local

```bash
npm install
npm run dev
```

Abrir:

- `http://localhost:8080/` para el catálogo.
- `http://localhost:8080/realtimeproducts` para la gestión en tiempo real.

También puede utilizarse `npm start` para iniciar el servidor sin Nodemon.

> Proyecto educativo centrado en Express, WebSockets y renderizado del lado del servidor.