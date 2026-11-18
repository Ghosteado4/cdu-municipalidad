import fastify from 'fastify';
import cookie from '@fastify/cookie';
import path from 'path';
import fastifyStatic from '@fastify/static';
import { configureSecurity } from './middleware/security';
import { globalErrorHandler } from './middleware/errorHandler';
import { tramitesRoutes } from './modules/tramites/tramites.routes';

const startServer = async () => {
  // Corrección 1: Agregamos true para activar el logger
  const app = fastify({ logger: true });

  await app.register(cookie, {
    secret: process.env.COOKIE_SECRET || 'fallback_key',
  });

  await configureSecurity(app);

  app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../../frontend/dist'),
    prefix: '/',
  });

  app.setErrorHandler(globalErrorHandler);
  await app.register(tramitesRoutes, { prefix: '/api' });

  app.setNotFoundHandler((req, reply) => {
    reply.sendFile('index.html');
  });

  // Corrección 2: Definimos el puerto y el host '0.0.0.0' para Render
  const PORT = Number(process.env.PORT) || 4000;
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Servidor operativo en puerto ${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();