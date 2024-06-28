# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./


# Instala pnpm
RUN npm install -g pnpm

# Instala las dependencias
RUN pnpm install --frozen-lockfile

# Copia el resto del código de la aplicación
COPY . .

# Compila el proyecto
RUN pnpm build

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD ["pnpm", "start"]
