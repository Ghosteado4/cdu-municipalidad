// (Lógica del trámite con conexión a la base de datos y registro de auditoría).

import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { CrearTramiteSchema } from '../../tramite.schema';

const prisma = new PrismaClient();

export const crearTramiteHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  // Validamos la entrada usando el esquema Zod
  const body = CrearTramiteSchema.parse(request.body);
  const user = (request as any).user; // Agregado previamente por el middleware "authenticate"

  // Transacción ACID para asegurar que se crea el trámite Y se audita simultáneamente
  const nuevoTramite = await prisma.$transaction(async (tx) => {
    const tramite = await tx.tramite.create({
      data: {
        tipo: body.tipo,
        titulo: body.titulo,
        descripcion: body.descripcion,
        domicilio: body.domicilio,
        telefono: body.telefono,
        estado: 'PENDIENTE',
        usuarioId: user.id,
      }
    });

    // Guardado inmutable en el Log de Auditoría
    await tx.auditLog.create({
      data: {
        userId: user.id,
        action: 'CREAR_TRAMITE',
        entity: `TRAMITE_${tramite.id}`,
        ipAddress: request.ip,
      }
    });

    return tramite;
  });

  return reply.status(201).send({
    message: 'Trámite generado con éxito',
    expedienteId: nuevoTramite.id,
    estado: nuevoTramite.estado
  });
};