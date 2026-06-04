# MERN CRUD Application

A full-stack CRUD (Create, Read, Update, Delete) application built with the MERN stack.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Build Tool**: Vite

## Project Structure

```
bt-MERN-CRUD/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── db/
│   │   │   └── db.js
│   │   └── models/
│   │       └── schema.model.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── EnterData.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── package.json
│   └── index.html
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-crud
```

Start the backend server:
```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Start the development server:
```bash
npm run dev
```

## Usage

1. Start the MongoDB server
2. Run the backend server (default: http://localhost:5000)
3. Run the frontend development server (default: http://localhost:5173)
4. Open your browser and navigate to the frontend URL

## Features

- Create new entries
- Read/View all entries
- Update existing entries
- Delete entries

## Scripts

### Backend
- `npm start` - Start the development server

### Frontend
- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License

ISC

## Author

Bhautik
