import express from 'express'
import { nuevoCliente, mostrarClientes, mostrarCliente, actualizarCliente } from '../Controllers/clienteController.js'

const router = express.Router()

// Agregar nuevos clientes
router.post('/clientes', nuevoCliente)

// Obtener todos los clientes
router.get('/clientes', mostrarClientes)

// Muestra un cliente en especifico
router.get('/clientes/:idCliente', mostrarCliente)

// Actualizar cliente
router.put('/clientes/:idCliente', actualizarCliente)

export default router
