const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const auth = require("./middlewares/auth");
const users = require("./db/data/users.json");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const { formatMessage } = require("./utils/utils");
const SQLClient = require("./db/clients/cql.clients");
const dbConfig = require("./db/config");
const console = require("console");
const handlebars = require('express-handlebars')

const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const mariaDB = new SQLClient(dbConfig.mariaDB);
const sqliteDB = new SQLClient(dbConfig.sqlite);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(
  session({
    name: "my-session",
    secret: "top-secret-51",
    resave: false,
    saveUninitialized: false,
    rolling: true, //recarga maxEdge
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://nicosmore:<pasword>@coder.3ctyud1.mongodb.net/sessions?retryWrites=true&w=majority",
    }),
    cookie: {maxAge: 60000} //1 minuto
  })
);
app.engine(
  "hbs",
  handlebars({
      extname: ".hbs", 
      defaultLayout: '../logoutUser.hbs',     
  })
);
app.set("view engine", "hbs");
app.set("views", "./public");

//Listen
httpServer.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

const usersSocket = [];

app.get("/", async (req, res) => {
  const user = await req.session.user;
  console.log(user);
  if (user) {
    return res.redirect("/form.html");
  } else {
    return res.redirect("/login.html");
  }
});

app.get("/form", auth, async (req, res) => {
  const userData = await req.session.user;
  res.redirect("/form.html");

  io.on("connection", async (socket) => {
    console.log("New Client Conection");
    console.log(socket.id);

    let username = userData.name;
    socket.emit("header", username); 
    socket.emit("logoutUser", username);    

    mariaDB.creatTable("productos");

    mariaDB.getRecords("productos").then((data) => {
      socket.emit("products", data);
    });

    socket.on("newProduct", (newProduct) => {
      mariaDB.insertRecords("productos", newProduct);
      mariaDB.getRecords("productos").then((data) => {
        socket.emit("products", data);
      });
    });

    sqliteDB.createTableMessage("mensajes");

    sqliteDB
      .getMessages("mensajes")
      .then((data) => socket.emit("message", data));

    socket.on("newUser", (username) => {
      const newUser = {
        id: socket.id,
        username: username,
      };
      users.push(newUser);
    });

    socket.on("newMessage", (data) => {
      const user = usersSocket.find((user) => user.id === socket.id);
      const newMessage = formatMessage(user.username, data);
      console.log("socket newMessage");
      sqliteDB.insertRecords("mensajes", newMessage);
      //messages.push(newMessage);
      io.emit("chatMessage", newMessage);
    });
    socket.on("disconnect", () => {
      io.emit("userDisconnected", `${socket.id}`);
    });
  });

  //res.render("header", {sessionUser: user});
});

app.get("/logout", auth, async (req, res) => {  
  const nameUser = await req.session.user.name;
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.clearCookie("my-session");
      } else {                     
        res.render('logoutUser', {nameUser});  
        res.clearCookie("my-session");      
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/error", (req, res) => {
  res.status(500).redirect("error.html");
});

app.get("/unauthorized", (req, res) => {
  res.status(401).sendFile(__dirname + "/public/unauthorized.html");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (!user) return res.redirect("/error");
  req.session.user = user;
  req.session.save((err) => {
    if (err) {
      console.log("Sesion error=>", err);
      return res.redirect("/error");
    }
    res.redirect("/form");
  });
});
