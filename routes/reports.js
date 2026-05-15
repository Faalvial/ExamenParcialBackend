import jwt from 'jsonwebtoken';
import Report from '../models/Report.js';

const authenticate = async (request, reply) => {
  try {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) return reply.status(401).send({ message: 'No autorizado. Falta token.' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
  } catch (err) {
    return reply.status(401).send({ message: 'Token inválido o expirado' });
  }
};

export default async function reportRoutes(fastify, options) {
  
  fastify.post('/reports', { preHandler: authenticate }, async (request, reply) => {
    if (request.user.role === 'supervisor') {
      return reply.status(403).send({ message: 'Los supervisores no pueden crear reportes' });
    }

    const data = await request.file();
    if (!data) return reply.status(400).send({ message: 'Se requiere archivo multimedia' });

    const { title, description, location, category } = data.fields;

    try {
      const newReport = await Report.create({
        userId: request.user.userId,
        title: title.value,
        description: description.value,
        location: location.value,
        category: category?.value || 'bache',
        mediaFiles: [{ filename: data.filename, mimetype: data.mimetype }]
      });
      return reply.status(201).send({ message: 'Reporte creado', report: newReport });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ message: 'Error al crear el reporte' });
    }
  });

  fastify.get('/reports', { preHandler: authenticate }, async (request, reply) => {
    try {
      const filter = request.user.role === 'vecino' ? { userId: request.user.userId } : {};
      
      const reports = await Report.find(filter).sort({ createdAt: -1 });
      return reports;
    } catch (error) {
      return reply.status(500).send({ message: 'Error al obtener reportes' });
    }
  });

  fastify.delete('/reports/:id', { preHandler: authenticate }, async (request, reply) => {
    try {
      const report = await Report.findByIdAndDelete(request.params.id);
      if (!report) return reply.status(404).send({ message: 'Reporte no encontrado' });
      return reply.send({ message: 'Reporte eliminado exitosamente' });
    } catch (error) {
      return reply.status(500).send({ message: 'Error al eliminar el reporte' });
    }
  });
}