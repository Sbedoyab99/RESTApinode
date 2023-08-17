import Productos from '../models/Productos.js'
import upload from '../config/multer.js'
import multer from 'multer'

// agrega un nuevo producto
const nuevoProducto = async (req, res, next) => {
  const producto = new Productos(req.body)
  try {
    await producto.save()
    res.json({ mensaje: 'Se agrego un nuevo producto', producto })
  } catch (error) {
    console.log(error)
    next()
  }
}

const subirArchivo = (req, res, next) => {

}

export {
  nuevoProducto,
  subirArchivo
}
