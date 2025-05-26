const usuarioController = require("../controllers/produtoController")

//define os endpoints
function registerRoutes(server) {
  server.get("/", (req, res, next) => {
    res.send({resposta: "Sejam bem-vindos à nossa Lojinha"})
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