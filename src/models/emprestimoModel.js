const connection = require("../db/connection")
const db = connection.db;

const Emprestimo = {
    getAll: () => db("livro_emprestado"),
    getAllRentedByUserId: (id) => db("livro_emprestado").where("id_usuario", id),
    getAllByBookId: (id) =>  db("livro_emprestado").where("id_livro", id),
    getRentListing: (user_id, book_id) => db("livro_emprestado").where("id_usuario", user_id).andWhere("id_livro", book_id).first(),
    updateRentListing: (user_id, book_id, data) => db("livro_emprestado").where("id_usuario", user_id).andWhere("id_livro", book_id).update(data),
    removeRentListing: (user_id, book_id) => db("livro_emprestado").where("id_usuario", user_id).andWhere("id_livro", book_id).delete()
}