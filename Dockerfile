# Etapa 1: Construcción de la aplicación
FROM node:22.8.0 AS build

# Configura el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu proyecto al contenedor
COPY package*.json ./
RUN npm install
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa 2: Servir la aplicación
FROM nginx:alpine

# Copia los archivos de la construcción al contenedor Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto en el que Nginx está escuchando
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
