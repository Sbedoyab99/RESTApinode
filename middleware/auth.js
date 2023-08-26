import jwt from 'jsonwebtoken'

const isAuth = (req, res, next) => {
  const auth = req.get('Authorization')
  if (!auth) {
    const error = new Error('El usuario no esta autenticado')
    error.statusCode = 401
    throw error
  }
  const token = auth.split(' ')[1]
  let revisarToken
  try {
    revisarToken = jwt.verify(token, 'secretkey')
  } catch (error) {
    error.statusCode = 500
    throw error
  }
  if (!revisarToken) {
    const error = new Error('El usuario no esta autenticado')
    error.statusCode = 401
    throw error
  }
  next()
}

export {
  isAuth
}
