import express from 'express'
import { nuevoCliente, mostrarClientes, mostrarCliente, actualizarCliente, eliminarCliente } from '../Controllers/clienteController.js'
import { nuevoProducto, subirArchivo, mostrarProductos, mostrarProducto, actualizarProducto, eliminarProducto, buscarProducto } from '../Controllers/productosController.js'
import { nuevoPedido, mostrarPedidos, mostrarPedido, actualizarPedido, eliminarPedido } from '../Controllers/pedidosController.js'
import { signUp, logIn } from '../Controllers/usuariosController.js'

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
// Busqueda de Productos
router.post('/productos/busqueda/:query', buscarProducto)

/** API Pedidos */
// Nuevo Pedido
router.post('/pedidos', nuevoPedido)
// Listar todos los pedidos
router.get('/pedidos', mostrarPedidos)
// Mostrar un pedido por su id
router.get('/pedidos/:idPedido', mostrarPedido)
// Actualizar pedido
router.put('/pedidos/:idPedido', actualizarPedido)
// Eliminar Pedido
router.delete('/pedidos/:idPedido', eliminarPedido)

/** Usuarios */
// Crear Cuenta
router.post('/signup', signUp)
// Iniciar Sesion
router.get('/login', logIn)

export default router
