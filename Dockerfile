# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de tu proyecto
COPY package*.json ./
RUN npm install
COPY . .

# Expone el puerto que usa tu aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD [ "node", "app.js" ]
