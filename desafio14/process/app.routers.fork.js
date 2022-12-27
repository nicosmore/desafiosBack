const express = require("express");
const { fork } = require('child_process');
const config = require('../config');
const os = require('os');
const compression = require('compression');
const logger = require("../logger/winston");


const router = express.Router();

router.get("/randoms", (req, res) => {
  const cant = req.query.cant;

  if (cant){
    const resultado = random(cant);
    res.json(resultado)
  } else {
    const resultado = random(100000000)
    res.json(resultado)
  };
});

const NUM_WORKERS = os.cpus().length;

router.get("/info", (req, res) => {  
  let memory = JSON.stringify(process.memoryUsage());
  let args = JSON.stringify(config.ARGS);
  res.send(` 
    <h4>PORT:${args}</h4>    
    <h4>Num.Procesadores:${NUM_WORKERS}</h4>    
    <h4>Plataforma:${process.platform}</h4>
    <h4>Node:${process.version}</h4>
    <h4>Memoria:${memory}</h4>
    <h4>Path:${process.execPath}</h4>
    <h4>Id Process:${process.pid}</h4>
    <h4>Directorio:${process.cwd()}</h4>
    `);
});

router.get("/infozip", compression(), (req, res) => {  
  let memory = JSON.stringify(process.memoryUsage());
  let args = JSON.stringify(config.ARGS);
  res.send(` 
    <h4>PORT:${args}</h4>    
    <h4>Num.Procesadores:${NUM_WORKERS}</h4>    
    <h4>Plataforma:${process.platform}</h4>
    <h4>Node:${process.version}</h4>
    <h4>Memoria:${memory}</h4>
    <h4>Path:${process.execPath}</h4>
    <h4>Id Process:${process.pid}</h4>
    <h4>Directorio:${process.cwd()}</h4>
    `);
});

router.get("/mensajes", (req, res) =>{
  logger.error("error ruta de mensajes");
});

router.get("/productos", (req, res) =>{
  logger.error("error ruta de productos");
});

const random = (data) => {
  const objRandom = {};
  for (let i = 0; i < data; i++) {
    const numRandom = Math.floor(Math.random() * 1000);
    objRandom[numRandom] ? objRandom[numRandom]++ : (objRandom[numRandom] = 1);
  }
  return objRandom;
};

module.exports = router;
