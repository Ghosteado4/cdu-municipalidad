import fastify from 'fastify';
import path from 'path';
import cookie from '@fastify/cookie';
import { configureSecurity } from './middleware/security';
import { globalErrorHandler } from './middleware/errorHandler';
import { tramitesRoutes } from './modules/tramites/tramites.routes';

export const startServer = async () => {
  const app = fastify();

  await app.register(cookie, {
    secret: process.env.COOKIE_SECRET || 'fallback_key',
  });

  await configureSecurity(app);

  // <-- Punto clave: sirve la carpeta dist/ del frontend desde la ruta raíz
  await app.register(require('fastify-static'), {
    root: path.join(__dirname, '../../frontend/dist'),
    prefix: '/',
  });

  await app.register(tramitesRoutes, { prefix: '/api' });

  app.setErrorHandler(globalErrorHandler);
  app.setNotFoundHandler((req, reply) => {
    reply.sendFile('index.html');
  });

  const PORT = Number(process.env.PORT) || 4000;
  await app.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`🚀 Servidor en http://0.0.0.0:${process.env.PORT || 4000}`);
};

startServer().catch(err => {
  console.error(err);
  process.exit(1);
});