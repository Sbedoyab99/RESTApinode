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

const logIn = async (req, res, next) => {
  const { email, password } = req.body
  const usuario = await Usuarios.findOne({ email })
  if (!usuario) {
    await res.status(401).json({ mensaje: 'Ese Usuario no existe' })
    next()
  } else {
    if (!bcrypt.compareSync(password, usuario.password)) {
      await res.status(401).json({ mensaje: 'La contraseña no es correcta' })
      next()
    } else {
      const token = jwt.sign({
        email: usuario.email,
        usuario: usuario.nombre,
        _id: usuario._id
      }, 'secretkey', {
        expiresIn: '5h'
      })
      res.json({ token })
    }
  }
}

export {
  signUp,
  logIn
}
