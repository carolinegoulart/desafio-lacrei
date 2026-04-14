FROM node:22-alpine

LABEL maintainer="caroline"

# Cria usuário nodeapp
RUN adduser -h /home/nodeapp \
    -s /bin/bash \
    -D nodeapp

# Define diretório de trabalho
WORKDIR /app

# Define que o usuário nodeapp é o dono do diretório /app
RUN chown -R nodeapp:nodeapp /app

# Copia os arquivos para o container
COPY . .

# Instala as dependências
RUN npm install

EXPOSE 3000

# Define que o usuário nodeapp vai executar a aplicação
USER nodeapp

CMD ["npm", "start"]