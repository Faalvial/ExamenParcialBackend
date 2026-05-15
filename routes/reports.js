import Report from '../models/Report.js';

export default async function reportRoutes(fastify, options) {
  
  // Caso de Uso 1: Crear reporte con evidencia multimedia
  fastify.post('/reports', async (request, reply) => {
    const data = await request.file(); // Procesa el archivo (imagen, video, audio)
    
    if (!data) {
      return reply.status(400).send({ message: 'Se requiere un archivo multimedia de evidencia' });
    }

    // Extraemos los campos de texto enviados en el form-data
    const { title, description, location, category } = data.fields;

    try {
      const newReport = await Report.create({
        title: title.value,
        description: description.value,
        location: location.value,
        category: category?.value || 'bache',
        mediaFiles: [{
          filename: data.filename,
          mimetype: data.mimetype
        }]
      });

      return reply.status(201).send({ message: 'Reporte de incidencia creado', report: newReport });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ message: 'Error al crear el reporte' });
    }
  });

  // Caso de Uso 2: Obtener todos los reportes (para la municipalidad)
  fastify.get('/reports', async (request, reply) => {
    try {
      const reports = await Report.find().sort({ createdAt: -1 });
      return reports;
    } catch (error) {
      return reply.status(500).send({ message: 'Error al obtener reportes' });
    }
  });
  // Caso de Uso 3: Eliminar un reporte
  fastify.delete('/reports/:id', async (request, reply) => {
    try {
      const report = await Report.findByIdAndDelete(request.params.id);
      if (!report) {
        return reply.status(404).send({ message: 'Reporte no encontrado' });
      }
      return reply.send({ message: 'Reporte eliminado exitosamente' });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ message: 'Error al eliminar el reporte' });
    }
  });
}