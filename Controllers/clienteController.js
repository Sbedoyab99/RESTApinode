import Clientes from '../models/Clientes.js'

// agrega un nuevo cliente
const nuevoCliente = async (req, res, next) => {
  const cliente = new Clientes(req.body)
  try {
    // almacenar el registro
    await cliente.save()
    res.json({ mensaje: 'Se agrego un nuevo cliente' })
  } catch (error) {
    // si hay error, console.log y next
    console.log(error)
    next()
  }
}

// muestra todos los clientes
const mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Clientes.find({})
    res.json(clientes)
  } catch (error) {
    console.log(error)
    next()
  }
}

// muestra un cliente por su id
const mostrarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findById(req.params.idCliente)
    res.json(cliente)
  } catch (error) {
    res.json({ mensaje: 'Ese cliente no existe' })
    next()
  }
}

const actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findByIdAndUpdate(req.params.idCliente, req.body, { new: true })
    res.json({ mensaje: 'Se modifico la informacion', cliente })
  } catch (error) {
    console.log(error)
    next()
  }
}

export {
  nuevoCliente,
  mostrarClientes,
  mostrarCliente,
  actualizarCliente
}
