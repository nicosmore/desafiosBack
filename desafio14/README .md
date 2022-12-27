**CLASE: 32.PROXY & NGINX**
**Desafío: LOGGERS, GZIP y ANÁLISIS DE PERFORMANCE**


**Servidor modo FORK: npm start**


**Se agrega:**
    *Rutas api/mensajes y api/productos     
    *Método de las peticiones a rutas inexistentes en el servidor (warning) en appProcess.js
    *Carpeta logger y archivo winston.js
    *Rutas api/info y api/infozip para comparacion de Bytes

**Punto1:** 
    *Resumen en "resultados/Punto1.txt"     

**Punto2:**
    *Imagen en "resultados/imagen/inspect.jpg"

**Punto3:**
    *Diagrama de flama "/info" en carpeta 18684.0x (flamegraph.html) 
    *Diagrama de flama "/infozip" en carpeta 6224.0x (flamegraph.html) 

**CONCLUSION: AUNQUE SE COMPRIMA "api/infozip" PARA TENER MENOS PESO Y LE LLEVA MAS TIEMPO RESPONDER QUE A "/info"**
