import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: string;
  role: string;
}

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  const token = request.cookies['access_token'];

  if (!token) {
    return reply.status(401).send({
      error: 'Unauthorized',
      message: 'Sesión no iniciada o token ausente.',
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'super_secret_fallback_key';
    const decoded = jwt.verify(token, secret) as DecodedToken;

    // Adjuntar datos del usuario a la petición para que estén disponibles en los endpoints
    (request as any).user = {
      id: decoded.userId,
      role: decoded.role,
    };
  } catch (err) {
    return reply.status(401).send({
      error: 'Unauthorized',
      message: 'La sesión ha expirado o no es válida.',
    });
  }
};