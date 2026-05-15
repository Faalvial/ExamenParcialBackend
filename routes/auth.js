import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async function authRoutes(fastify, options) {
  fastify.post('/register', async (request, reply) => {
    const { name, email, password, role } = request.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword, role });
      return reply.status(201).send({ message: 'Usuario registrado', userId: newUser._id });
    } catch (error) {
      return reply.status(500).send({ message: 'Error al registrar usuario' });
    }
  });

  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return reply.status(404).send({ message: 'Usuario no encontrado' });

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return reply.status(401).send({ message: 'Contraseña incorrecta' });

      // Generar token (Asegúrate de tener JWT_SECRET en tu .env)
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'clave_secreta_temporal', { expiresIn: '1d' });
      return reply.send({ token, role: user.role, name: user.name });
    } catch (error) {
      return reply.status(500).send({ message: 'Error en el login' });
    }
  });
}