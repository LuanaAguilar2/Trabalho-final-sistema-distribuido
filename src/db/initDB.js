const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/database.db", sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message);

    console.log("Connection successful");
});

init_users();
init_books();
init_rent();

function init_users()
{
    try
    {
        db.run("CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nome varchar(128) NOT NULL, email varchar(64) NOT NULL, cpf varchar(11), senha INTEGER)");
        console.log("Initialized/had users");
    }
    catch(err)
    {
        console.log("ERROR INITIATING USERS!");
        console.log(err);
    }
}

function init_books()
{
    try
    {
        db.run("CREATE TABLE IF NOT EXISTS livro(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, titulo varchar(128) NOT NULL, categoria varchar(64) NOT NULL)")
        console.log("Initialized/had books");
    }
    catch(err)
    {
        console.log("ERROR INITIATING BOOKS!");
        console.log(err);
    }
}

function init_rent()
{
    try
    {
        db.run("CREATE TABLE IF NOT EXISTS livro_emprestado(id_usuario INTEGER NOT NULL, id_livro INTEGER NOT NULL, data_emprestimo INTEGER NOT NULL CHECK(data_emprestimo > 10000000) CHECK(data_emprestimo < 99999999), data_entrega INTEGER NOT NULL CHECK(data_emprestimo > 10000000) CHECK(data_emprestimo < 99999999))")
        console.log("Initialized/had rents");
    }
    catch(err)
    {
        console.log("ERROR INITIATING RENTS!");
        console.log(err);
    }
}