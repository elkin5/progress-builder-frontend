# Usa una imagen de node para construir la aplicación
FROM node:22.8.0

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Expon el puerto en el que el servidor de desarrollo escuchará
EXPOSE 8080

# Comando para iniciar el servidor de desarrollo de Vue
CMD ["npm", "run", "serve"]
