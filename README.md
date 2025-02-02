# Game Search Platform

A video game search platform built with Next.js, TypeScript, and PostgreSQL, using the IGDB API.

## Technologies

- Next.js 14
- TypeScript
- PostgreSQL
- Prisma ORM
- IGDB API
- Tailwind CSS

## Prerequisites

- Node.js 18+
- PostgreSQL
- IGDB API credentials

## Installation

1. Clone the repository:
```bash
git clone https://github.com/walidbenf/test_mv.git
cd next-games
```
2. Install dependencies:
```bash
npm install
```
3. Install PostgreSQL:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```
4.Create PostgreSQL database:
```bash
sudo -u postgres psql
CREATE DATABASE next_games;
```

### Configuration
1. Set up environment variables:
```bash
cp .env.example .env
```
2. Update .env with your credentials:
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/next_games"
TWITCH_CLIENT_ID="your_client_id"
TWITCH_CLIENT_SECRET="your_client_secret"
```
3. Initialize Prisma:
```bash
npx prisma init
npx prisma migrate dev
```
### Running the Project
1. Start the development server:
```bash
npm run dev
```
2. Open http://localhost:3000 in your browser

### Plan
1. Project title and description
2. Technologies used
3. Installation steps
4. Configuration steps
5. Running the project
6. Features

```markdown


# Game Search Platform

A video game search platform built with Next.js, TypeScript, and PostgreSQL, using the IGDB API.

## Technologies

- Next.js 14
- TypeScript
- PostgreSQL
- Prisma ORM
- IGDB API
- Tailwind CSS

## Prerequisites

- Node.js 18+
- PostgreSQL
- IGDB API credentials

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd next-games
```

2. Install dependencies:
```bash
npm install
```

3. Install PostgreSQL:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

4. Create PostgreSQL database:
```bash
sudo -u postgres psql
CREATE DATABASE next_games;
```

## Configuration

1. Set up environment variables:
```bash
cp .env.example .env
```

2. Update .env with your credentials:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/next_games"
TWITCH_CLIENT_ID="your_client_id"
TWITCH_CLIENT_SECRET="your_client_secret"
```

3. Initialize Prisma:
```bash
npx prisma init
npx prisma migrate dev
```

## Running the Project

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- Search games using IGDB API
- View game details including:
  - Cover images
  - Ratings
  - Genres
  - Screenshots
  - Release dates
- Responsive design
- Data persistence in PostgreSQL