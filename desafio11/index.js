const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const env = require('./env.config');
const dbConfig = require('./db/config');
const apisRoutes = require('./routers/app.routers');
const MongoContainer = require('./models/containers/Mongodb.container');
const passport = require('./middlewares/passport');

const { engine } = require('express-handlebars');
const path = require('path');

const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");

const PORT = env.PORT || 8080;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./views/layouts'));

app.use(session({
  name: 'coder-session',
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: dbConfig.mongodb.connectTo('sessions')
  })
}));

app.use(passport.initialize());
app.use(passport.session());

// Template engines
app.engine(
  'hbs',
  engine({
  extname: 'hbs',
  defaultLayout: 'index.hbs',
  layoutsDir: path.resolve(__dirname, './views/layouts'),
  partialsDir: path.resolve(__dirname, './views/partials')
}))
app.set('views', './views/layouts');
app.set('view engine', 'hbs');

// Routes
app.use(apisRoutes);

const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

httpServer.listen(PORT, async () => {
  MongoContainer.connect()
  .then(() => {
    console.log('Connected to DB!');
    console.log('Server is up and running on port: ', +PORT);
  });
});
 
const ProductsApi = require('./models/daos/products.mongo.dao')
const productsApi = new ProductsApi();

io.on('connection',async (socket) =>{
  console.log("New Client Conection");
  console.log(socket.id);

  socket.emit("products", await productsApi.getAll())

  socket.on("newProduct", async (newProduct)=>{
    await productsApi.save(newProduct)
    io.sockets.emit("products", await productsApi.getAll()) 
  })

 
})