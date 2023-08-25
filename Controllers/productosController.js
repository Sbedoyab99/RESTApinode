import Productos from '../models/Productos.js'
import upload from '../config/multer.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { unlink } from 'fs'

// agrega un nuevo producto
const nuevoProducto = async (req, res, next) => {
  const producto = new Productos(req.body)
  try {
    if (req.file) {
      producto.imagen = req.file.filename
    }
    await producto.save()
    res.json({ mensaje: 'Se agrego un nuevo producto', producto })
  } catch (error) {
    console.log(error)
    next()
  }
}

// Midleware para subir archivos
const subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ mensaje: error })
    }
    return next()
  })
}

// Listar productos
const mostrarProductos = async (req, res, next) => {
  try {
    const productos = await Productos.find({})
    res.json(productos)
  } catch (error) {
    console.log(error)
    next()
  }
}

// Listar producto por ID
const mostrarProducto = async (req, res, next) => {
  try {
    const producto = await Productos.findById(req.params.idProducto)
    res.json(producto)
  } catch (error) {
    res.json({ mensaje: 'Ese producto no existe' })
    next()
  }
}

// Actualizar Producto
const actualizarProducto = async (req, res, next) => {
  const nuevoProducto = req.body
  try {
    const productoAnterior = await Productos.findById(req.params.idProducto)
    if (req.file) {
      nuevoProducto.imagen = req.file.filename
      const __dirname = path.dirname(fileURLToPath(import.meta.url))
      const imagenAnteriorPath = path.join(__dirname, '..', `/uploads/${productoAnterior.imagen}`)
      unlink(imagenAnteriorPath, (error) => {
        if (error) {
          return console.log(error)
        }
      })
    } else {
      nuevoProducto.imagen = productoAnterior.imagen
    }
    const producto = await Productos.findByIdAndUpdate(req.params.idProducto, nuevoProducto, { new: true })
    res.json({ mensaje: 'Se ha actualizado la informacion del producto', producto })
  } catch (error) {
    console.log(error)
    next()
  }
}

// Eliminar un prodcuto
const eliminarProducto = async (req, res, next) => {
  try {
    const producto = await Productos.findById(req.params.idProducto)
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const imagenAnteriorPath = path.join(__dirname, '..', `/uploads/${producto.imagen}`)
    unlink(imagenAnteriorPath, (error) => {
      if (error) {
        return console.log(error)
      }
    })
    await Productos.findByIdAndDelete(req.params.idProducto)
    res.json({ mensaje: 'El producto se ha eliminado' })
  } catch (error) {
    console.log(error)
    next()
  }
}

// Buscar un producto con un query
const buscarProducto = async (req, res, next) => {
  try {
    const { query } = req.params
    const producto = await Productos.find({ nombre: new RegExp(query, 'i') })
    res.json(producto)
  } catch (error) {
    console.log(error)
    next()
  }
}

export {
  nuevoProducto,
  subirArchivo,
  mostrarProductos,
  mostrarProducto,
  actualizarProducto,
  eliminarProducto,
  buscarProducto
}
