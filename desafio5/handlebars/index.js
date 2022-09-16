const express = require('express');
const apiRoutes = require('./routers/app.routes');
const handlebars = require('express-handlebars')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', apiRoutes);

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);

app.set("view engine", "hbs");
app.set("views", "./views");

const conectedServer = app.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`);
});

conectedServer.on('error',(error)=>{
    console.error('Error:', error);
});