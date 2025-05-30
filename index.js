const restify = require("restify");
const usuarioController = require('./src/controllers/usuarioController');
const livroController = require('./src/controllers/livroController');
const emprestimoController = require('./src/controllers/emprestimoController');

const server = restify.createServer({
  name: "Livraria",
  version: "1.0.0",
});

// Plugins para processar requisições
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// Rota principal
server.get("/", (req, res, next) => {
  res.send({ resposta: "Sejam bem-vindos à Livraria" });
  next();
});

// Rotas de Usuários
server.get("/usuarios", usuarioController.getAll);
server.get("/usuarios/:idUser", usuarioController.getById);
server.post("/usuarios", usuarioController.create);
server.put("/usuarios/:idUser", usuarioController.update);
server.patch("/usuarios/:idUser", usuarioController.patch);
server.del("/usuarios/:idUser", usuarioController.remove);

// Rotas de Livros
server.get("/livros", livroController.getAll);
server.get("/livros/:idBook", livroController.getById);
server.post("/livros", livroController.create);
server.put("/livros/:idBook", livroController.update);
server.patch("/livros/:idBook", livroController.patch);
server.del("/livros/:idBook", livroController.remove);

// Rotas de Empréstimos
server.get("/emprestimos", emprestimoController.getAll);
server.get("/emprestimos/usuario/:idUser", emprestimoController.getByUserId);
server.get("/emprestimos/livro/:idBook", emprestimoController.getByBookId);
server.get("/emprestimos/usuario/:idUser/livro/:idBook", emprestimoController.getUserBookRent);
server.post("/emprestimos", emprestimoController.create);
server.put("/emprestimos/usuario/:idUser/livro/:idBook", emprestimoController.update);
server.patch("/emprestimos/usuario/:idUser/livro/:idBook", emprestimoController.patch);
server.del("/emprestimos/usuario/:idUser/livro/:idBook", emprestimoController.remove);

// Inicia o servidor
server.listen(2003, function () {
  console.log("%s executando em: %s", server.name, server.url);
});
