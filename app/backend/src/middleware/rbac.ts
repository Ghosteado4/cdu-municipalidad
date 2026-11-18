// Control de acceso basado en roles para proteger rutas específicas).


import { FastifyRequest, FastifyReply } from 'fastify';
import { Role } from '@prisma/client';

export const requireRole = (rolesPermitidos: Role[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = (request as any).user;

    if (!user || !rolesPermitidos.includes(user.role)) {
      return reply.status(403).send({
        error: 'Forbidden',
        message: 'No tienes permisos suficientes para realizar esta acción.'
      });
    }
  };
};