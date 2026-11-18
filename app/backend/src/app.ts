import fastify from 'fastify';
import cookie from '@fastify/cookie';
import { configureSecurity } from './middleware/security';
import { globalErrorHandler } from './middleware/errorHandler';
import { tramitesRoutes } from './modules/tramites/tramites.routes';

const startServer = async () => {
  const app = fastify({ logger: true });

  // 1. Parser de Cookies obligatorio para poder leer las HttpOnly
  await app.register(cookie, {
    secret: process.env.COOKIE_SECRET || 'cookie_secret_fallback_key',
  });

  // 2. Cargar configuraciones de seguridad (Helmet y Rate Limiter)
  await configureSecurity(app);

  // 3. Manejador global de errores (Evita la fuga de información técnica)
  app.setErrorHandler(globalErrorHandler);

  // 4. Endpoint público de salud de la API (Healthcheck)
  app.get('/health', async () => {
    return { status: 'OK', system: 'CDU_Municipio_API' };
  });

  // 5. Registrar el módulo de trámites con el prefijo "/api"
  // Esto creará el endpoint accesible en: POST /api/tramites
  await app.register(tramitesRoutes, { prefix: '/api' });

  // 6. Iniciar la escucha del puerto
  const PORT = Number(process.env.PORT) || 4000;
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
    app.log.info(`Servidor municipal blindado corriendo en puerto ${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();