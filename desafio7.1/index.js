const express = require('express');
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const { formatMessage } = require("./utils/utils");
const SQLClient = require('./db/clients/cql.clients')
const dbConfig = require('./db/config');
const console = require('console');




const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const mariaDB = new SQLClient(dbConfig.mariaDB)
const sqliteDB = new SQLClient(dbConfig.sqlite);

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Listen
httpServer.listen(PORT, () =>{
    console.log('listening on port ' + PORT);    
});


const users = [];

io.on('connection',async (socket) =>{
    console.log("New Client Conection");
    console.log(socket.id);

    mariaDB.creatTable("productos");

    mariaDB.getRecords("productos")
        .then(data =>{
            console.log(data)
            socket.emit('products',data)});
               
    socket.on('newProduct', (newProduct) =>{          
        mariaDB.insertRecords("productos", newProduct)
        mariaDB.getRecords("productos")
        .then(data =>{            
            socket.emit('products',data)});            
    });   

    sqliteDB.createTableMessage("mensajes");

    sqliteDB.getMessages("mensajes")
        .then(data =>socket.emit('message', data));

    socket.on('newUser', (username) =>{
        const newUser = {
            id: socket.id,
            username: username,
        }
        users.push(newUser);
    });

    socket.on('newMessage', (data) =>{
        const user = users.find(user => user.id === socket.id);
        const newMessage = formatMessage(user.username, data);
        console.log("socket newMessage");
        sqliteDB.insertRecords('mensajes', newMessage);
        //messages.push(newMessage);
        io.emit('chatMessage', newMessage);
    });

    socket.on("disconnect", () => {
        io.emit("userDisconnected", `${socket.id}`);        
    });
});