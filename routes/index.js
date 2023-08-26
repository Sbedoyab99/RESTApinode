import express from 'express'
import { nuevoCliente, mostrarClientes, mostrarCliente, actualizarCliente, eliminarCliente } from '../Controllers/clienteController.js'
import { nuevoProducto, subirArchivo, mostrarProductos, mostrarProducto, actualizarProducto, eliminarProducto, buscarProducto } from '../Controllers/productosController.js'
import { nuevoPedido, mostrarPedidos, mostrarPedido, actualizarPedido, eliminarPedido } from '../Controllers/pedidosController.js'
import { isAuth } from '../middleware/auth.js'
import { signUp, logIn } from '../Controllers/usuariosController.js'

const router = express.Router()

/** API CLIENTES */
// Agregar nuevos clientes
router.post('/clientes', isAuth, nuevoCliente)
// Obtener todos los clientes
router.get('/clientes', isAuth, mostrarClientes)
// Muestra un cliente en especifico
router.get('/clientes/:idCliente', isAuth, mostrarCliente)
// Actualizar cliente
router.put('/clientes/:idCliente', isAuth, actualizarCliente)
// Eliminar cliente
router.delete('/clientes/:idCliente', isAuth, eliminarCliente)

/** API PRODUCTOS */
// Agregar nuevos productos
router.post('/productos', isAuth, subirArchivo, nuevoProducto)
// Listar todos los productos
router.get('/productos', isAuth, mostrarProductos)
// Listar producto por ID
router.get('/productos/:idProducto', isAuth, mostrarProducto)
// Actualizar Producto
router.put('/productos/:idProducto', isAuth, subirArchivo, actualizarProducto)
// Eliminar Producto
router.delete('/productos/:idProducto', isAuth, eliminarProducto)
// Busqueda de Productos
router.post('/productos/busqueda/:query', buscarProducto)

/** API Pedidos */
// Nuevo Pedido
router.post('/pedidos', isAuth, nuevoPedido)
// Listar todos los pedidos
router.get('/pedidos', isAuth, mostrarPedidos)
// Mostrar un pedido por su id
router.get('/pedidos/:idPedido', isAuth, mostrarPedido)
// Actualizar pedido
router.put('/pedidos/:idPedido', isAuth, actualizarPedido)
// Eliminar Pedido
router.delete('/pedidos/:idPedido', isAuth, eliminarPedido)

/** Usuarios */
// Crear Cuenta
router.post('/signup', signUp)
// Iniciar Sesion
router.post('/login', logIn)

export default router
