const Koa = require("koa");
const koaBody = require("koa-body");

const config = require("./src/config/env.config");
const cors = require("cors");
const apiRoutes = require("./src/routers/app.routers");
const errorMiddleware = require("./src/middlewares/error.middleware");

const session = require("koa-session");
const MongoStore = require("connect-mongo");

const dbConfig = require("./src/config/db.config");
const passport = require("./src/middlewares/passport");


const app = new Koa();

//App Midlewares
app.use(koaBody());
app.use(cors());


app.use(
  session({
    name: "proyectoFinalSession",
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: dbConfig.mongodb.connectTo(config.DB_NAME),
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Api routes
app.use(apiRoutes.routes());
app.use(errorMiddleware);

module.exports = app;
