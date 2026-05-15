import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Actualizamos los roles aquí:
  role: { type: String, enum: ['vecino', 'supervisor'], default: 'vecino' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);