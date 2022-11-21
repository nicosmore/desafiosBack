//const config = require('../config');
const knex = require('knex');

class SQLClient {
    constructor (config){
        this.knex = knex(config);
    }

    creatTable(tableName){
        return this.knex.schema.hasTable(tableName)
            .then((response)=>{
                if(!response){
                    this.knex.schema.createTable(tableName, (table)=>{
                        table.increments('id').notNullable().primary();
                        table.string('name').notNullable();                        
                        table.float('price');
                        table.string('image');
                    });
                }            
            })            
    }

    insertRecords(tableName, item) {             
        return this.knex(tableName).insert(item)
            .then(()=>console.log("success"));
    }
    
    getRecords(tableName) {        
        const records = this.knex.from(tableName).select('id','name','price','image');
        return records;
    }               
       
    disconnect(){
        this.knex.destroy();
    }
    
    createTableMessage(tableName){
        return this.knex.schema.hasTable(tableName)
            .then((response)=>{
                if(!response){
                    return this.knex.schema.createTable(tableName, (table)=>{
                            table.increments('id').notNullable().primary();
                            table.string('username').notNullable(); 
                            table.string('text');
                            table.string('time');
                    });
                } 
                console.log("creado");           
            })            
    }

    getMessages(tablename){
        const messages = this.knex.from(tablename).select('id', 'username', 'text', 'time');
        return messages
    }
}

module.exports = SQLClient;
