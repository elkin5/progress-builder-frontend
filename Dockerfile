# Etapa 1: Construcción de la aplicación
FROM node:22-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

ENV NODE_ENV=production \
    VUE_APP_API_URL=https://progress-builder-backend-production.up.railway.app/api

# Copia el código fuente de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Etapa 2: Servir la aplicación con NGINX
FROM nginx:stable-alpine

# Copia los archivos construidos desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copia el archivo de configuración personalizado de NGINX (opcional)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]