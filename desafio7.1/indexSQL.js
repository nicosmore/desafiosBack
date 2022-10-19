const SQLClient = require('./db/clients/cql.clients')
const dbConfig = require('./db/config')

const mariaDB = new SQLClient(dbConfig.mariaDB)

mariaDB.creatTable("productos")
    .then(()=>{
        console.log('created');
        const products = [
            {name: "auto",
            price: 323.45,
            image: "https://cdn1.iconfinder.com/data/icons/cars-01-1/512/car-128.png"
            },
            {name: "camioneta",
            price: 234.56,
            image: "https://cdn1.iconfinder.com/data/icons/cars-01-1/512/cab-128.png"
            }];
        return mariaDB.insertRecords("productos", products);
    })
    .then((records) => {
        console.log("pronto");
        console.table(records);
    })
    .then(()=>{
        return mariaDB.getRecords("productos");
    })
    .then((records)=>{
        console.table(records);
    })
    .catch((error)=> console.log(error.message))
    .finally(()=>{mariaDB.disconnect()});



