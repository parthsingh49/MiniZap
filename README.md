# MiniZap 

MiniZap is a full-stack workflow automation platform inspired by tools like Zapier. It allows users to visually design automation workflows using a node-based workflow builder.

## Features

- Visual workflow builder using React Flow
- Trigger and action based workflow design
- User registration and login
- JWT-based authentication
- Google OAuth authentication
- GitHub OAuth authentication
- user DashBoard
- Database Integration
- REST API built with Express.js

## Tech Stack

### Frontend
- React
- Vite
- React Router
- React Flow
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Passport.js
- Google OAuth
- GitHub OAuth

## How It Works

1. User registers or logs in.
2. Authentication is handled using JWT or OAuth.
3. Authenticated users are redirected to the dashboard.
4. Users can access the visual workflow builder.
5. Workflows are represented using connected trigger and action nodes.
6. The backend provides authentication APIs and communicates with MongoDB.

## Project Structure

MiniZap/
├── src/
│   ├── components/
│   ├── pages/
│   ├── api/
│   └── data/
│
├── server/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       └── routes/
│
├── public/
├── package.json
└── README.md

## Contributors

- Parth Singh
- Rudra Saxena
- Sheersh Shankdhaar
