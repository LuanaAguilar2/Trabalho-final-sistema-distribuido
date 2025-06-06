const usuarioController = require("../controllers/usuarioController")
const livroController = require("../controllers/livroController")
const emprestimoController = require("../controllers/emprestimoController")
const restify = require("restify");

const server = restify.createServer( {
      name : "Livraria" ,
      version : "1.0.0"
})

//define os endpoints
function registerRoutes() {
  server.get("/", (req, res, next) => {
    res.send({resposta: "Sejam bem-vindos à Livraria"});
    next();
  })

  server.use( restify.plugins.acceptParser( server.acceptable ) )
  server.use( restify.plugins.queryParser() )
  server.use( restify.plugins.bodyParser() )

  server.listen( 2003, function(){
      console.log( "%s executando em: %s" , server.name, server.url.replace("[::]", "localhost"))
  } )

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

  emprestimoRoutes(server);

  return server;
}

function emprestimoRoutes(server) {

  server.get("/emprestimos", emprestimoController.getAll);
  server.get("/emprestimos/usuario/:idUser", emprestimoController.getByUserId);
  server.get("/emprestimos/livro/:idBook", emprestimoController.getByBookId);
  server.get("/emprestimos/usuario/:idUser/livro/:idBook", emprestimoController.getUserBookRent);
  server.post("/emprestimos", emprestimoController.create);
  server.put("/emprestimos/usuario/:idUser/livro/:idBook", emprestimoController.update);
  server.patch("/emprestimos/usuario/:idUser/livro/:idBook", emprestimoController.patch);
  server.del("/emprestimos/usuario/:idUser/livro/:idBook", emprestimoController.remove);
}

//module.exports = emprestimoRoutes;

module.exports = registerRoutes