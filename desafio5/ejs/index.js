const express = require('express');
const apiRoutes = require('./routers/app.routes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', apiRoutes);

app.set('views', './views');
app.set('view engine', 'ejs');

const conectedServer = app.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`);
});

conectedServer.on('error',(error)=>{
    console.error('Error:', error);
});