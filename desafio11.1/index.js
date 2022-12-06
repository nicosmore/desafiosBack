const express = require("express");
const errorMiddleware = require("./middlewares/error.middleware");
const apiRoutes = require("./routers/api.routes");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const handlebars = require("express-handlebars");



const app = express();
const PORT = process.env.PORT || 8080;

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
        "mongodb+srv://nicosmore:11cacatua@coder.3ctyud1.mongodb.net/sessions?retryWrites=true&w=majority",
    }),
    cookie: { maxAge: 60000 }, //1 minuto
  })
);

app.use("/", apiRoutes);
app.use(errorMiddleware);

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "../logout.hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./public");

//Listen
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

module.exports = app;




