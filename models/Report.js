import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['bache', 'luminaria', 'basura', 'emergencia'], 
    default: 'bache' 
  },
  status: { 
    type: String, 
    enum: ['reportado', 'en_progreso', 'resuelto'], 
    default: 'reportado' 
  },
  // Requisito: API con envío de imágenes, video o audio (2 pts)
  mediaFiles: [{
    filename: String,
    mimetype: String
  }]
}, { timestamps: true });

export default mongoose.model('Report', reportSchema);