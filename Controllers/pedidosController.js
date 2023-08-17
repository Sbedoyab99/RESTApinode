import Pedidos from '../models/Pedidos.js'

// Nuevo Pedido
const nuevoPedido = async (req, res, next) => {
  const pedido = new Pedidos(req.body)
  try {
    await pedido.save()
    res.json({ mensaje: 'Se agrego un nuevo pedido', pedido })
  } catch (error) {
    console.log(error)
    next()
  }
}

// Listar pedidos
const mostrarPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedidos.find({}).populate('cliente').populate({
      path: 'pedido.producto',
      model: 'Productos'
    })
    res.json(pedidos)
  } catch (error) {
    console.log(error)
    next()
  }
}

// mostrar pedido por id
const mostrarPedido = async (req, res, next) => {
  try {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
      path: 'pedido.producto',
      model: 'Productos'
    })
    res.json(pedido)
  } catch (error) {
    res.json({ mensaje: 'Ese pedido no existe' })
    next()
  }
}

// Actualizar Pedido
const actualizarPedido = async (req, res, next) => {
  try {
    const pedido = await Pedidos.findByIdAndUpdate(req.params.idPedido, req.body, { new: true }).populate('cliente').populate({
      path: 'pedido.producto',
      model: 'Productos'
    })
    res.json({ mensaje: 'Se ha actualizado la informacion del pedido', pedido })
  } catch (error) {
    console.log(error)
    next()
  }
}

// Eliminar Pedido
const eliminarPedido = async (req, res, next) => {
  try {
    await Pedidos.findByIdAndDelete(req.params.idPedido)
    res.json({ mensaje: 'El pedido se ha eliminado' })
  } catch (error) {
    res.json({ mensaje: 'Ese pedido no existe' })
    next()
  }
}

export {
  nuevoPedido,
  mostrarPedidos,
  mostrarPedido,
  actualizarPedido,
  eliminarPedido
}
