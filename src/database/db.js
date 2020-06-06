//importar a dependencia do sqlite

const sqlite3 = require("sqlite3").verbose()

//iniciar/criar o objeto que irá fazer operacoes no banco de dados
const db = new sqlite3.Database("./src/database.database.db")

module.exports = db

//utilizar o objeto de banco de dados para as operações

//db.serialize(() => {
    //criar tabela 
//     db.run(`
//           CREATE TABLE IF NOT EXISTS places(
//               id INTEGER PRIMARY KEY AUTOINCREMENT,
//               image TEXT,
//               name TEXT,
//               address TEXT,
//               address2 TEXT,
//               state TEXT,
//               city TEXT,
//               items TEXT
//           );                                      
//     `)
//     //inserir dados no banco
//     const query = `INSERT INTO places 
//     (image, name, address, address2, state, city, items) 
//     VALUES (?,?,?,?,?,?,?);`
    
//     const values = ["https://images.unsplash.com/photo-1542739674-b449a8938b59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     "Papersider",
//     "Guilherme Gemballa, Jardim América",
//     "Número 260",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Papéis e papelão"]

//     function afterInserData(err){
//         if(err){
//             return console.log(err)
//         }
//         console.log("cadastro realizado com sucesso:")
//         console.log(this)
//     }
//    db.run(query, values, afterInserData )

//    //Consultar dados
//    db.all(`SELECT * FROM places`, function(err, rows){
//        if(err){
//            return console.log(err)
//        }
//        console.log("Aqui estão os seus registros")
//         console.log(rows)
//    })

//    //deletar o dado da Base
//    db.run(`DELETE FROM places where id = ?`, [3], function(err){
//        if(err){
//            return console.log(err)
//        }
//        console.log("Registro deletado com sucesso.")
//    })
// })