# DESAFIO
# Creo base de datos y colecciones
 
use ecommerce

db.createCollection("mensajes")
db.createCollection("productos")

# Punto 1 - 2 (insertar 10 documentos para mensajes y productos)
# no se agrega time a mensajes ya que se incluye cuando se crea el _id


db.mensajes.insertMany([
    {username:"usuario1@mail", mensaje: "Hola"},
    {username:"usuario2@mail", mensaje: "Hola"},
    {username:"usuario3@mail", mensaje: "Hola"},
    {username:"usuario4@mail", mensaje: "Hola"},
    {username:"usuario1@mail", mensaje: "Como va?"},
    {username:"usuario2@mail", mensaje: "Bien, vos?"},
    {username:"usuario1@mail", mensaje: "Bien"},
    {username:"usuario1@mail", mensaje: "Chau"},
    {username:"usuario2@mail", mensaje: "Nos vemos"},
    {username:"usuario3@mail", mensaje: "Adios"}
])

db.productos.insertMany([
    {name:"producto1", price: 120 ,image:"http://imagen1.jpg", stock: 50},
    {name:"producto2", price: 580 ,image:"http://imagen2.jpg", stock: 50},
    {name:"producto3", price: 900 ,image:"http://imagen3.jpg", stock: 50},
    {name:"producto4", price: 1280 ,image:"http://imagen3.jpg", stock: 50},
    {name:"producto5", price: 1700 ,image:"http://imagen3.jpg", stock: 50},
    {name:"producto6", price: 2300 ,image:"http://imagen3.jpg", stock: 50},
    {name:"producto7", price: 2860 ,image:"http://imagen3.jpg,", stock: 50},
    {name:"producto8", price: 3350 ,image:"http://imagen3.jpg", stock: 50},
    {name:"producto9", price: 4320 ,image:"http://imagen3.jpg", stock: 50},
    {name:"producto10", price: 4990 ,image:"http://imagen3.jpg", stock: 50}
])

# Punto 3 (listar documentos)

db.mensajes.find()
db.productos.find()

# Punto 4 (cantidad de documentos en colecciones)

db.mensajes.countDocuments()
db.productos.countDocuments()

# Punto 5 (CRUD colecion productos)

   # a) (agregar un producto)
   db.productos.insertOne({name:"productoNuevo", price: 3000 ,image:"http://imagenproductonuevo.jpg", stock: 50}) 

   # b) Consultas 
        # I) listar productos con precio menor a 1000
        db.productos.find({price:{$lt:1000}})

        # II) listar productos con precio entre 1000 y 3000
        db.productos.find({price:{$gt:1000},price:{$lt:3000}})
        db.productos.find({price:{$gt:1000 , $lt:3000}})
        
        # III) listar productos con precio mayor a 3000
        db.productos.find({price:{$gt:3000}})

        # IV) nombre del 3er producto mas barato
        db.productos.find({},{_id:0, name:1}).sort({price: 1}).limit(1).skip(2) 

    # c) actualizar stock de todos a 100
    db.productos.updateMany({},{$set:{stock:100}})

    # d) stock 0 de productos precio mayor a 4000 
    db.productos.updateMany({price:{$gt:4000}},{$set:{stock:0}})

    # e) borrar productos con precio menor a 1000
    db.productos.deleteMany({price:{$lt:1000}})

# Punto 6 (usuario "pepe", clave:"asd456" que solo pueda leer base de datos)
use admin

db.createUser({user:"pepe",pwd:"asd456",roles:[{role:"read", db:"ecommerce"}]})




