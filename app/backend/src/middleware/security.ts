import { FastifyInstance } from 'fastify';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';

export const configureSecurity = async (app: FastifyInstance) => {
  // Cabeceras HTTP seguras
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        upgradeInsecureRequests: [],
      },
    },
    referrerPolicy: { policy: 'same-origin' },
    frameguard: { action: 'deny' },
  });

  // Limitador de peticiones para evitar abusos (100 peticiones por minuto por IP)
  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
    errorResponseBuilder: (request, context) => ({
      statusCode: 429,
      error: 'Too Many Requests',
      message: 'Demasiadas solicitudes desde esta IP. Por favor, reintente en un minuto.',
    }),
  });
};