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


// Archivos Estaticos
app.use(express.static('uploads'))

// habilitar body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Habilitar Cors
const whiteList = ['http://localhost:5173']
const corsOptions = {
  origin: (origin, cb) => {
    const existe = whiteList.some(dominio => dominio === origin)
    if (existe) {
      cb(null, true)
    } else {
      cb(new Error('Not Allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

// Crear rutas
app.use('/', routes)

// Iniciar servidor
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`El servidor se esta ejecutando en (http://localhost:${port})`)
})
