# Ejercicio 4

## Crea un fichero ```README_PEC3_Ej4.md``` en el que debes indicar los comandos que se han de ejecutar para transpilar y ejecutar la aplicación. No es obligatorio, pero se valorará positivamente el uso de webpack para que transpile la aplicación completa a un único fichero JavaScript (```bundle.js```). Para ello se ha facilitado dos ficheros webpack de ejemplos (se tienen que modificar y adaptar a nuestro proyecto).

1. Instalar ```webpack```, ```webpack-cli``` y ```webpack-dev-server```.
  ```npm i --save-dev webpack webpack-cli webpack-dev-server```
2. Configurar el archivo ```webpack.config.js```.
3. Añadir script en ```package.json```.
4. Descargar todo lo necesario para ejecutar TypeScript.
   ```npm install --save-dev webpack webpack-cli ts-loader typescript```
5. Crear el archivo ```tsconfig.json``` y configurarlo.
6. Ejecutar la aplicación.
   
   ```bash
   npm run build
   npm run dev
   ```