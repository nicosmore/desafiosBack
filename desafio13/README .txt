CLASE: 30.PROXY & NGINX
Desafío: Servidor con balance de carga


Servidor modo FORK: npm start
Servidor modo CLUSTER: node appProcess.js 8081 CLUSTER 

Listar procesos: 
    PS C:\nginx-1.23.3> tasklist /fi "imagename eq nginx.exe"

   
Listar Forever:

    Cambiar package.json en "scripts" ("start":"forever start appProcess.js")
    forever list

Listar PM2:

    pm2 start appProcess.js
    pm2 list

    pm2 start appProcess.js --name=""server-cluster -i max 
    pm2 list


Modo escucha: se agrega "watch"
ej:
    pm2 start appProcess.js --name=""server-cluster -i max
    forever start -watch appProcess.js


