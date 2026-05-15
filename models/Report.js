import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  // Nuevo campo para enlazar el reporte con el usuario:
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
  mediaFiles: [{
    filename: String,
    mimetype: String
  }]
}, { timestamps: true });

export default mongoose.model('Report', reportSchema);