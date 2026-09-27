# Etapa 1: Build da aplicação
FROM node:18-alpine AS build

WORKDIR /app

# Copie o package.json e o package-lock.json para instalar dependências
COPY package.json ./
COPY package-lock.json ./

# Instale as dependências do Node.js
RUN npm install

# Copie todos os arquivos do app Angular (do contexto definido no docker-compose)
COPY . .

# Realiza o build da aplicação Angular
RUN npm run build -- --configuration=production

# Etapa 2: Runtime com Node (serve o Angular + API de contato via Resend)
FROM node:18-alpine AS app

WORKDIR /app

ENV NODE_ENV=production

# Instala apenas as dependências de produção (express, nodemailer, dotenv)
COPY package.json ./
COPY package-lock.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copia o build do Angular e o servidor
COPY --from=build /app/dist ./dist
COPY server ./server

RUN apk add nano

EXPOSE 80

# Inicia o servidor Node
CMD ["node", "server/index.js"]
