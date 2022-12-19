const express = require("express");
const { fork } = require('child_process');
const config = require('../config');
const os = require('os');
const PORT = require("../appProcess");

const router = express.Router();

router.get("/randoms", (req, res) => {
  const cant = req.query.cant;
  const computo = fork("process.fork/random.js"); 

  if (cant){
    computo.send(cant);
  } else computo.send(100000000);
  
  computo.on("message", (data) => {
    res.json({ resultado: data });
  });
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

module.exports = router;
