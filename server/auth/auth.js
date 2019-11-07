const fs = require("fs")
const jwt = require("jsonwebtoken")
const userdb = JSON.parse(fs.readFileSync("./server/users.json", "UTF-8"))

const SECRET_KEY = "123456789"
const expiresIn = "1h"

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err,
  )
}

function isAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      user => user.email === email && user.password === password,
    ) !== -1
  )
}

const login = (req, res) => {
  console.log("login endpoint called; request body:")
  console.log(req.body)
  const { email, password } = req.body
  if (isAuthenticated({ email, password }) === false) {
    const status = 401
    const message = "Incorrect email or password"
    res.status(status).json({ status, message })
    return
  }
  const access_token = createToken({ email, password })
  console.log("Access Token:" + access_token)
  res.status(200).json({ access_token })
}

const register = (req, res) => {
  console.log("register endpoint called; request body:")
  console.log(req.body)
  const { email, password } = req.body

  if (isAuthenticated({ email, password }) === true) {
    const status = 401
    const message = "Email and Password already exist"
    res.status(status).json({ status, message })
    return
  }

  fs.readFile("./server/users.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({ status, message })
      return
    }

    const parsedData = JSON.parse(data.toString())

    const last_item_id = parsedData.users[parsedData.users.length - 1].id

    parsedData.users.push({
      id: last_item_id + 1,
      email: email,
      password: password,
    }) //add some data
    fs.writeFile("./users.json", JSON.stringify(data), (err, result) => {
      // WRITE
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({ status, message })
        return
      }
    })
  })

  // Create token for new user
  const access_token = createToken({ email, password })
  console.log("Access Token:" + access_token)
  res.status(200).json({ access_token })
}

const handleError = (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401
    const message = "Error in authorization format"
    res.status(status).json({ status, message })
    return
  }
  try {
    if (verifyToken(req.headers.authorization.split(" ")[1]) instanceof Error) {
      const status = 401
      const message = "Access token not provided"
      res.status(status).json({ status, message })
      return
    }
    next()
  } catch (err) {
    const status = 401
    const message = "Error access_token is revoked"
    res.status(status).json({ status, message })
  }
}

module.exports = {
  register,
  login,
  handleError,
}
