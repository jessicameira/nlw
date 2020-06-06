const express = require("express")
const server = express()

//Pegar o banco de dados
const db = require("./database/db")

//configurar pasta publica
server.use(express.static("public"))

//habilitar uso do req:body
server.use(express.urlencoded({ extended: true}))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar os caminhosda aplicacao
//pagina inicial
//req: requisicao - res: resposta

server.get("/", (req, res)=>{
    return res.render("index.html")
})

server.get("/create-point", (req, res)=>{

    //req.query: query strings da url
    return res.render("create-point.html")


})
server.post("/savepoint", (req, res) => {

    //req.body - O corpo do nosso formulario
    //inserir dados no banco de dados

    const query = `INSERT INTO places
    (image, name, address, address2, state, city, items)
    VALUES (?,?,?,?,?,?,?);`
        
        const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
        ]
    
        function afterInserData(err){
            if(err){
                console.log(err)

                return res.render("erro-cadastro.html", {cadastroErro:true} )
            }
            console.log("cadastro realizado com sucesso:")
            console.log(this)

            return res.render("create-point.html",{saved:true} )
        }
       db.run(query, values, afterInserData )

})

server.get("/search", (req, res)=>{
    //Pegar os dados do banco
    const search = req.query.search

    if(search == ""){
        return res.render("search-results.html", {total:0})
    }

    db.all(`SELECT * FROM places where city like '%${search}%' `, function(err, rows){
        if(err){
            return console.log(err)
        }
        const total = rows.length
        //console.log("Aqui estão os seus registros")
         //console.log(rows)

        return res.render("search-results.html", {places: rows, total:total})
    })
    

})

//ligar o servidor
server.listen(3000)

