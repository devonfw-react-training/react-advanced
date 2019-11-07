const bodyParser = require("body-parser")
const jsonServer = require("json-server")
const server = jsonServer.create()
const router = jsonServer.router("./server/database.json")

const { register, login, handleError } = require("./auth/auth.js")

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults())

server.post("/auth/register", register)
server.post("/auth/login", login)

server.use(/^(?!\/auth).*$/, handleError)

server.use("/", router)

server.listen(8000, () => {
  console.log("Run Auth API Server")
})
