import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import reportRoutes from './routes/reports.js';

dotenv.config();

const fastify = Fastify({ logger: true });

// Conexión a la base de datos
connectDB();

// Configuración de middlewares
fastify.register(cors);
// Habilita el procesamiento de archivos multimedia pesados
fastify.register(multipart, { attachFieldsToBody: false, limits: { fileSize: 15 * 1024 * 1024 } }); 

// Registrar rutas
fastify.register(reportRoutes, { prefix: '/api' });

// Ruta de comprobación
fastify.get('/', async () => {
  return { status: 'UrbanVía API en línea (Fastify)' };
});

const start = async () => {
  try {
    const port = process.env.PORT || 5000;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Servidor corriendo en el puerto ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();