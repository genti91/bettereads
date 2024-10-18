## Prerequisites

- Node.js 18.17 or later.
- PostgreSQL database server running.

## Getting Started

First, run the command:

```bash
npm install
```
Add the required environment variables to the .env file in the root folder.
```bash
DATABASE_URL="postgresql://USER_HERE:PASSWORD_HERE@localhost:5432/bettereads"
APP_URL="http://localhost:3000"
```

Create the "bettereads" database in Postgres and then then synchronize the Prisma schema with your database.
```bash
npx prisma db push
```
Generate Prisma Client with the following command:
```bash
npx prisma generate
```
Populate the database:
```bash
npx prisma db seed
```
Finally run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

