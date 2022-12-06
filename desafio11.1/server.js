const app = require('./index');
const config = require('./config');

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`);
} )
