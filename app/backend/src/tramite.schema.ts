// (Esquema de validación estricto usado tanto por el Frontend como por el Backend).

import { z } from 'zod';

export const CrearTramiteSchema = z.object({
  tipo: z.enum(['HABILITACION_COMERCIAL', 'PERMISO_CONSTRUCCION', 'LICENCIA_CONDUCIR', 'RECLAMO']),
  titulo: z.string().min(5, 'El título debe tener al menos 5 caracteres').max(100).trim(),
  descripcion: z.string().min(10, 'Describe con más detalle tu solicitud').max(1000).trim(),
  domicilio: z.string().min(5, 'Ingresa una dirección válida en Concepción del Uruguay'),
  telefono: z.string().regex(/^\+?[0-9]{10,15}$/, 'Número de teléfono inválido (ej: 3442XXXXXX)')
}).strict();

export type CrearTramiteInput = z.infer<typeof CrearTramiteSchema>;