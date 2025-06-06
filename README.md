# 🗓️ Sistema de Agendamentos (Back-end)

Este projeto é uma API de agendamentos onde clientes podem marcar serviços com prestadores em horários disponíveis. Ele simula o back-end de sistemas como barbearias, consultórios e clínicas.

---

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT Authentication](https://jwt.io/)
- [Docker](https://www.docker.com/)
- [Swagger](https://swagger.io/)

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seuusuario/seu-repo.git
cd seu-repo

# Instale as dependências
npm install

# Copie o .env.example para .env e configure
cp .env.example .env

# Gere os arquivos do Prisma
npx prisma generate

# Rode as migrations
npx prisma migrate dev

# Inicie o servidor
npm run start:dev
