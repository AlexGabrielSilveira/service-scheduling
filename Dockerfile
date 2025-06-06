FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Importante: gerar o Prisma Client após copiar o schema
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
