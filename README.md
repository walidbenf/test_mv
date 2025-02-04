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

## Project presentation
### First of all we open the site and we see a navbar which contains genres and a search box
![image](https://github.com/user-attachments/assets/026e7e5f-69fc-451d-9bce-9c7805194686)

### When you search for a game or games it loads them into the database
![image](https://github.com/user-attachments/assets/11180b6f-9b2e-43fe-9605-83a2e8a25334)

### After that the games loaded in the database are displayed in the home page
![image](https://github.com/user-attachments/assets/94bf737a-e2e4-48db-9810-19952cb64990)

### And finally we can use the navbar to sort the games in the database by genre
![image](https://github.com/user-attachments/assets/3c918e9d-2dca-45db-afa2-c83b3c2097f6)
