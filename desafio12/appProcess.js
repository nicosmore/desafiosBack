const express = require('express');
const apisRoutesProcess = require('./process.fork/app.routers.fork');

const args = require('minimist')(process.argv.slice(2),{
    default:{PORT:8080},
    alias:{p:'PORT'}
});

const PORT= args.PORT;

const app = express();

app.use('/api', apisRoutesProcess);

app.listen(PORT, () =>{
    console.log(`Server is up and running at ${PORT}`);
});


