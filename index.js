import express from 'express'
import routes from './routes/index.js'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

// Conectar mongoose
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/restapis', {
  useNewUrlParser: true,
  family: 4
}).then(() => console.log('MongoDB cnectado')).catch((err) => console.log(err))

// Crear el servidor
const app = express()

// habilitar body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Habilitar Cors
app.use(cors())

// Crear rutas
app.use('/', routes)

// Archivos Estaticos
app.use(express.static('uploads'))

// Iniciar servidor
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`El servidor se esta ejecutando en (http://localhost:${port})`)
})
