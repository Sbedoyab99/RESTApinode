import Usuarios from '../models/Usuarios.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const signUp = async (req, res) => {
  const usuario = new Usuarios(req.body)
  usuario.password = await bcrypt.hash(req.body.password, 12)
  try {
    await usuario.save()
    res.json({ mensaje: 'Usuario Creado Correctamente' })
  } catch (error) {
    if (error.code === 11000) {
      res.json({ mensaje: 'Ya existe un usuario con ese correo.' })
    } else {
      res.json({ mensaje: 'hubo un error' })
    }
  }
}

const logIn = () => {

}

export {
  signUp,
  logIn
}
