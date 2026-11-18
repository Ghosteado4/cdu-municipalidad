// (Archivo que expone el endpoint y lo asocia con la autenticación y validación).

import { FastifyInstance } from 'fastify';
import { crearTramiteHandler } from './tramites.controller';
import { authenticate } from '../../middleware/auth';
import { requireRole } from '../../../middleware/rbac';
import { Role } from '@prisma/client';

export const tramitesRoutes = async (app: FastifyInstance) => {
  app.post(
    '/tramites',
    {
      preHandler: [authenticate, requireRole([Role.CIUDADANO, Role.SUPER_ADMIN])]
    },
    crearTramiteHandler
  );
};