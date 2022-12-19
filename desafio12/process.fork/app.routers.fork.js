const express = require("express");
const { fork } = require('child_process');

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

router.get("/info", (req, res) => {
  res.send(`      
    <h4>Plataforma:${process.platform}</h4>
    <h4>Node:${process.version}</h4>
    <h4>Memoria:${process.memoryUsage()}</h4>
    <h4>Path:${process.execPath}</h4>
    <h4>Id Process:${process.pid}</h4>
    <h4>Directorio:${process.cwd()}</h4>
    `);
});

module.exports = router;
