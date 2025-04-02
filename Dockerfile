# Etapa 1: Build da aplicação
FROM node:18-alpine AS build

WORKDIR /app

# 1. Primeiro copia apenas os arquivos necessários para instalação de dependências
COPY package.json .

# 2. Instala as dependências (incluindo devDependencies para o build)
RUN npm ci

# 3. Copia o restante dos arquivos
COPY . .

# 4. Build da aplicação com configuração de produção
RUN npm run build -- --configuration=production

# Etapa 2: Preparação para produção com NGINX
FROM nginx:alpine AS app

WORKDIR /usr/share/nginx/html

# Remove os arquivos padrão do NGINX
RUN rm -rf ./*

# Copia o build gerado
COPY --from=build /app/dist/f5sites-angular /usr/share/nginx/html

# Configuração do NGINX
COPY default.conf /etc/nginx/conf.d/default.conf

# Inicia o NGINX
CMD ["nginx", "-g", "daemon off;"]