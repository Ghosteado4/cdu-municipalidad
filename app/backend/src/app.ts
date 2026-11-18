import fastify from 'fastify';
import cookie from '@fastify/cookie';
import path from 'path';
import fastifyStatic from '@fastify/static';
import { configureSecurity } from './middleware/security';
import { globalErrorHandler } from './middleware/errorHandler';
import { tramitesRoutes } from './modules/tramites/tramites.routes';

const startServer = async () => {
  const app = fastify({ logger: });

  await app.register(cookie, { secret: process.env.COOKIE_SECRET || 'fallback_key' });
  await configureSecurity(app);

  // Servir archivos estáticos del frontend
  app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../../frontend/dist'),
    prefix: '/',
  });

  app.setErrorHandler(globalErrorHandler);
  await app.register(tramitesRoutes, { prefix: '/api' });

  // SPA Fallback para React Router
  app.setNotFoundHandler((req, reply) => {
    reply.sendFile('index.html');
  });

  const PORT = Number(process.env.PORT) || ;
  await app.listen({ port: PORT, host: '...' });
};

startServer();