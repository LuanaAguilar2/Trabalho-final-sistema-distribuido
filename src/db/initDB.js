const { default: knex } = require("knex");

const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

if(fs.existsSync(__dirname + "/database.db"))
{
    console.log("Database wasn't created because it already exists!");
    return;
}

fs.writeFileSync(__dirname + "/database.db", "");

const db_initializer = new sqlite3.Database("./src/db/database.db", sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message);

    console.log("Connection successful");
});

let table_initializer = init_all();

const db = knex(
    {
        client: 'sqlite3',
        connection: {
            filename: __dirname + '/database.db'
        }
    }
)

table_initializer.then(() => {
    let lock = true;

    db_initializer.close((err) =>
    {
        if(err)
        {
            console.warn("Error closing initializer.");
            console.log(err);
            lock = false;
            return;
        }
        
        lock = false;
        console.log("Successfully closed initializer.");
    });
})
.then(() => {
    db.select('tbl_name').from('sqlite_master').where({type: 'table'}).then(
    (values) =>{
        console.log("KNEX IS WORKING")
        console.log(values);
        db.destroy();
    }).catch((err) => {
        console.log("knex error");
        console.log(err);
        db.destroy();
    })
})

function init_all()
{
    return new Promise(async (resolve, reject) => 
    {
        let fodder = await Promise.all(
            [
                init_users(),
                init_books(),
                init_rent()
            ]
        );

        resolve();
    })
}

function init_users()
{
    return new Promise((resolve, reject) => 
    {
        db_initializer.run("CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nome varchar(128) NOT NULL, email varchar(64) NOT NULL, cpf varchar(11), senha INTEGER)",
            (res, err) =>
            {
                if(err)
                {
                    console.log("Error initializing users.")
                    console.log(err);
                }
                else
                {
                    console.log("Initialized or had users.");
                }

                resolve();
            }
        );
    });
}

function init_books()
{
    return new Promise((resolve, reject) => 
    {
        db_initializer.run("CREATE TABLE IF NOT EXISTS livro(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, titulo varchar(128) NOT NULL, categoria varchar(64) NOT NULL)",
            (res, err) =>
            {
                if(err)
                {
                    console.log("Error initializing books.")
                    console.log(err);
                }
                else
                {
                    console.log("Initialized or had books.");
                }

                resolve();
            }
        );
    });
}

function init_rent()
{
    return new Promise((resolve, reject) => 
    {
        db_initializer.run("CREATE TABLE IF NOT EXISTS livro_emprestado(id_usuario INTEGER NOT NULL, id_livro INTEGER NOT NULL, data_emprestimo INTEGER NOT NULL CHECK(data_emprestimo > 10000000) CHECK(data_emprestimo < 99999999), data_entrega INTEGER NOT NULL CHECK(data_emprestimo > 10000000) CHECK(data_emprestimo < 99999999))",
            (res, err) =>
            {
                if(err)
                {
                    console.log("Error initializing rents.")
                    console.log(err);
                }
                else
                {
                    console.log("Initialized or had rents.");
                }

                resolve();
            }
        );
    });
}