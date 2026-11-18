import { fileTypeFromBuffer } from 'file-type';
import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

// Tipos MIME permitidos por la Municipalidad (PDF, Imágenes limpias)
const TIPOS_PERMITIDOS = ['application/pdf', 'image/jpeg', 'image/png'];
const TAMAÑO_MAXIMO_BYTES = 5 * 1024 * 1024; // 5 Megabytes

export async function validarYGuardarArchivo(fileBuffer: Buffer, originalName: string): Promise<string> {
  // 1. Validar tamaño máximo
  if (fileBuffer.length > TAMAÑO_MAXIMO_BYTES) {
    throw new Error('El archivo supera el tamaño máximo permitido de 5MB.');
  }

  // 2. Detectar el tipo MIME real mediante los Magic Numbers (Bytes de cabecera)
  const detectedType = await fileTypeFromBuffer(fileBuffer);

  if (!detectedType || !TIPOS_PERMITIDOS.includes(detectedType.mime)) {
    throw new Error('Tipo de archivo no permitido o alterado. Solo se aceptan PDF, JPG y PNG.');
  }

  // 3. Generar un nombre único aleatorio (UUID v4) para evitar ataques de Path Traversal
  const extension = detectedType.ext;
  const nombreSeguro = `${randomUUID()}.${extension}`;
  
  // 4. Aislar el archivo fuera de la ruta pública (en una carpeta segura del servidor)
  const directorioDestino = path.resolve(process.cwd(), 'uploads_seguros');
  await fs.mkdir(directorioDestino, { recursive: true });
  
  const rutaCompleta = path.join(directorioDestino, nombreSeguro);
  
  // 5. Guardar el archivo en disco de forma segura
  await fs.writeFile(rutaCompleta, fileBuffer);

  // Retornamos el nombre seguro para guardarlo en la base de datos vinculado al trámite
  return nombreSeguro;
}