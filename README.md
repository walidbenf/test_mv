## Projet pour une entreprise:
### On crée déjà notre projet Next.js
```sh
npx create-next-app@latest next-games --typescript
cd next-games
```
### On installe PostgreSQL:
```sh
sudo apt update && sudo apt install postgresql postgresql-contrib
```
### On crée notre base de donnée PostgreSQL
```sh
sudo -u postgres psql
CREATE DATABASE mon_projet;
```
### On installe Prisma
```sh
npm install prisma @prisma/client
npx prisma init
```
### Puis on le configure avec notre connexion PostgreSQL et on migre
```sh
npx prisma migrate dev
```
### Run le projet
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
