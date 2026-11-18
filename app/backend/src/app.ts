import fastify from 'fastify';
import cookie from '@fastify/cookie';
import path from 'path';
import fastifyStatic from '@fastify/static';
import { configureSecurity } from './middleware/security';
import { globalErrorHandler } from './middleware/errorHandler';
import { tramitesRoutes } from './modules/tramites/tramites.routes';

const startServer = async () => {
  const app = fastify({ logger: true });

  // 1. Parser de Cookies
  await app.register(cookie, {
    secret: process.env.COOKIE_SECRET || 'cookie_secret_fallback_key',
  });

  // 2. Configurar Seguridad
  await configureSecurity(app);

  // 3. Servir el Frontend compilado (carpeta 'dist' del frontend)
  // Nota: Esto buscará los archivos en apps/frontend/dist
  await app.register(fastifyStatic, {
    root: path.join(__dirname, '../../frontend/dist'),
    prefix: '/',
  });

  // 4. Manejador global de errores
  app.setErrorHandler(globalErrorHandler);

  // 5. Rutas de la API
  await app.register(tramitesRoutes, { prefix: '/api' });

  // 6. Si no es un archivo estático ni una ruta API, servimos index.html (para React Router)
  app.setNotFoundHandler((req, reply) => {
    reply.sendFile('index.html');
  });

  // 7. Iniciar servidor
  const PORT = Number(process.env.PORT) || 4000;
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
    app.log.info(`Servidor y Frontend sirviéndose en puerto ${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();