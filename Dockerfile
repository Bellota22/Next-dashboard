# Usa una imagen base de Node.js
FROM node:20.14.0-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación Next.js en modo producción
RUN npm run build

# Expone el puerto de la aplicación
EXPOSE 3000
# Comando para iniciar la aplicación en modo producción
CMD ["npm", "start"]
