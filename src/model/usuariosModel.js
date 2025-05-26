const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./loja.db", sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message);

    console.log("Connection successful");
});

try
{
    db.run("CREATE TABLE IF NOT EXISTS produto(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nome varchar(128) NOT NULL, preço decimal(10,2) NOT NULL)")
    db.run("CREATE TABLE IF NOT EXISTS cliente(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nome varchar(128) NOT NULL, CEP varchar(8) NOT NULL, CPF varchar(11) UNIQUE NOT NULL)");
}
catch(err)
{
    console.log(err);
}