const usuarioController = require("../controllers/usuarioController")
const livroController = require("../controllers/livroController")
const emprestimoController = require("../controllers/emprestimoController")
const restify = require("restify");

//define os endpoints
function registerRoutes(server_arg) {
  server_arg.get("/", (req, res, next) => {
    res.send({resposta: "Sejam bem-vindos à nossa Lojinha"})
  })

  const server = restify.createServer( {
    name : "Livraria" ,
    version : "1.0.0"
})

  //endpoints usuario
  server.get("/usuarios", usuarioController.getAll)
  server.get("/usuarios/:idUser", usuarioController.getById)
  server.post("/usuarios", usuarioController.create)
  server.put("/usuarios/:idUser", usuarioController.update)
  server.del("/usuarios/:idUser", usuarioController.remove)

  //endpoints livro
  server.get("/livros", livroController.getAll)
  server.get("/livros/:idBook", livroController.getById)
  server.post("/livros", livroController.create)
  server.put("/livros/:idBook", livroController.update)
  server.del("/livros/:idBook", livroController.remove) 
}

module.exports = registerRoutes