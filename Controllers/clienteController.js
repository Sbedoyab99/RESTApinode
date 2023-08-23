import Clientes from '../models/Clientes.js'

// agrega un nuevo cliente
const nuevoCliente = async (req, res, next) => {
  const cliente = new Clientes(req.body)
  try {
    // almacenar el registro
    await cliente.save()
    res.json({ mensaje: 'Se agrego un nuevo cliente' })
  } catch (error) {
    let mensaje = ''
    if (error.code === 11000) {
      mensaje = 'Ya existe un usuario registrado con ese Email.'
      return res.status(400).send(mensaje)
    } else {
      mensaje = error
      return res.status(500).send('Algo Fallo')
    }
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

// Actualiza un cliente por id
const actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findByIdAndUpdate(req.params.idCliente, req.body, { new: true })
    res.json({ mensaje: 'Se modifico la informacion', cliente })
  } catch (error) {
    let mensaje = ''
    if (error.code === 11000) {
      mensaje = 'Ya existe un usuario registrado con ese Email.'
      return res.status(400).send(mensaje)
    } else {
      mensaje = error
      return res.status(500).send('Algo Fallo')
    }
  }
}

// Elimina un cliente por id
const eliminarCliente = async (req, res, next) => {
  try {
    await Clientes.findByIdAndDelete(req.params.idCliente)
    res.json({ mensaje: 'El cliente se ha eliminado' })
  } catch (error) {
    res.json({ mensaje: 'Ese cliente no existe' })
    next()
  }
}

export {
  nuevoCliente,
  mostrarClientes,
  mostrarCliente,
  actualizarCliente,
  eliminarCliente
}
