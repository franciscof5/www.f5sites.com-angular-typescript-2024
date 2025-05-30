# Etapa 1: Build da aplicação
FROM node:18-alpine AS build

WORKDIR /app

# Copie o package.json e o package-lock.json para instalar dependências
COPY package.json ./
##COPY package-lock.json ./

# Instale as dependências do Node.js
RUN npm install

# Copie todos os arquivos do app Angular (do contexto definido no docker-compose)
COPY . .

# Realiza o build da aplicação Angular
# RUN npm run build
RUN npm run build -- --configuration=production

# Etapa 2: Preparação para produção com NGINX
FROM nginx:alpine AS app

WORKDIR /usr/share/nginx/html

# Remove os arquivos padrão do NGINX
RUN rm -rf ./*

# Copia o build gerado na etapa anterior para o diretório correto no NGINX
COPY --from=build /app/dist/f5sites-angular /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

RUN apk add nano

# Exponha a porta padrão do NGINX
# EXPOSE 80

# Inicia o NGINX
CMD ["nginx", "-g", "daemon off;"]

