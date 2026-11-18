import { FastifyInstance } from 'fastify';
import path from 'path';

export const startServer = async () => {
  const app: any = fastify();

  // 1️⃣  Cookie (HttpOnly, Secure, SameSite)
  await app.register(require('cookie'), {
    secret: process.env.COOKIE_SECRET || 'fallback_key',
  });

  // 2️⃣ Seguridad (Helmet, Rate‑Limit, etc.)
  await configureSecurity(app);

  // 2️⃣ Servir los archivos estáticos del Frontend
  await app.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'), // <-- ruta absoluta a la carpeta "public" dentro de backend
    prefix: '/',
  });

  // 3️⃣ Rutas de la API
  await app.register(tramitesRoutes, { prefix: '/api' });

  // 4️⃣ Fallback para React Router (SPA)
  app.setNotFoundHandler((req, reply) => {
    reply.sendFile('index.html');
  });

  // 6️⃣ Arrancar el servidor
  const PORT = Number(process.env.PORT) || 4000;
  await app.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`🚀 Servidor en http://localhost:${process.env.PORT || 4000}`);
};

startServer().catch(err => {
  console.error(err);
  process.exit(1);
};