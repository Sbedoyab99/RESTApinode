import express from 'express'
import { nuevoCliente, mostrarClientes, mostrarCliente, actualizarCliente, eliminarCliente } from '../Controllers/clienteController.js'
import { nuevoProducto, subirArchivo, mostrarProductos, mostrarProducto, actualizarProducto, eliminarProducto } from '../Controllers/productosController.js'

const router = express.Router()

/** API CLIENTES */
// Agregar nuevos clientes
router.post('/clientes', nuevoCliente)
// Obtener todos los clientes
router.get('/clientes', mostrarClientes)
// Muestra un cliente en especifico
router.get('/clientes/:idCliente', mostrarCliente)
// Actualizar cliente
router.put('/clientes/:idCliente', actualizarCliente)
// Eliminar cliente
router.delete('/clientes/:idCliente', eliminarCliente)

/** API PRODUCTOS */
// Agregar nuevos productos
router.post('/productos', subirArchivo, nuevoProducto)
// Listar todos los productos
router.get('/productos', mostrarProductos)
// Listar producto por ID
router.get('/productos/:idProducto', mostrarProducto)
// Actualizar Producto
router.put('/productos/:idProducto', subirArchivo, actualizarProducto)
// Eliminar Producto
router.delete('/productos/:idProducto', eliminarProducto)

export default router
