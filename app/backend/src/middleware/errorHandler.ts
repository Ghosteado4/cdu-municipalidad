// (Requerido en app.ts para capturar errores sin exponer información sensible).

import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';

export const globalErrorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  // Manejo de errores de validación de esquemas (Zod)
  if (error instanceof ZodError) {
    return reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Los datos enviados no son válidos.',
      details: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    });
  }

  // Registramos el error internamente en consola/logs para el programador
  request.log.error(error);

  // Respuesta genérica y segura para el cliente
  return reply.status(500).send({
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'Ha ocurrido un error inesperado en el servidor municipal. Por favor, reintente más tarde.'
  });
};