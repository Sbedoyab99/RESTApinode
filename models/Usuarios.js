import mongoose from 'mongoose'

const Schema = mongoose.Schema
const usuariosSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'El email es obligatorio'
  },
  nombre: {
    type: String,
    required: 'El nombre de usuario es obligatorio'
  },
  password: {
    type: String,
    required: 'La contraeña es obligatoria'
  }
})

const Usuarios = mongoose.model('Usuarios', usuariosSchema)

export default Usuarios
