const express = require('express');
const apisRoutesProcess = require('./process.fork/app.routers.fork');

const app = express();

app.use('/api', apisRoutesProcess);

app.listen(8080);
