# 🎬 Movies API Project

## Overview

This project is a simple **Movies CRUD API** with a frontend interface. It allows users to create, read, update, and delete movies stored in a MongoDB database. Additionally, it supports custom movie IDs and a star rating system.

---

## APIs and Functionality

| Endpoint               | Method | Description                              |
|------------------------|--------|------------------------------------------|
| `/api/movies`          | GET    | Fetch all movies                         |
| `/api/movies/:id`      | GET    | Fetch a movie by its unique ID           |
| `/api/movies`          | POST   | Add a new movie                          |
| `/api/movies/:id`      | PUT    | Update an existing movie by ID           |
| `/api/movies/:id`      | DELETE | Delete a movie by ID                     |

Each movie has the following fields:

- `_id` (string): Custom or autogenerated unique identifier  
- `title` (string): Movie title  
- `director` (string): Director's name  
- `releaseYear` (number): Year of release  
- `genre` (string): Movie genre  

---

## Database Integration

- **Database:** MongoDB Atlas (cloud-hosted)  
- **ODM:** Mongoose (Node.js ORM for MongoDB)  
- The server connects to MongoDB using Mongoose with connection string configured in `server.js`.  
- The movie schema defines all movie fields and allows custom string `_id`s.

---

## How to Run the Server

1. Clone the repository:

   ```bash
   git clone https://github.com/mimansha2019/movies-api.git
   cd movies-api

2. Install Dependencies:

   ```bash
   npm install

3. Configure your MongoDB connection string in server.js (replace with your credentials):

   ```bash
   mongoose.connect('your-mongodb-connection-string', {...});

4. Start the server:

   ```bash
   node server.js

The server will run at http://localhost:5000.

### How to Run the Frontend Locally

The frontend is a simple static HTML/JS app using fetch to interact with the API.

You can serve it using VS Code Live Server or any static server on port 5500.

Open index.html in your browser or via Live Server extension.

### How to Interact with the API

Sample Requests
  🔹Get all movies:- 

    ```bash
    curl http://localhost:5000/api/movies

  🔹Get movie by ID:- 

    ```bash
    curl http://localhost:5000/api/movies/movies01

  🔹Add a new movie:- 

    ```bash
    curl -X POST http://localhost:5000/api/movies \
    -H "Content-Type: application/json" \
    -d '{"_id":"inception123","title":"Inception","director":"Christopher Nolan","releaseYear":2010,"genre":"Sci-Fi","rating":5}'

  🔹Update a movie:- 

    ```bash
    curl -X PUT http://localhost:5000/api/movies/inception123 \
    -H "Content-Type: application/json" \
    -d '{"rating":4}'

  🔹Delete a movie:- 

    ```bash
    curl -X DELETE http://localhost:5000/api/movies/movies01

## Notes:-

▫️Ensure the server is running before using the frontend or curl commands.

▫️The frontend interacts with the backend via fetch calls to http://localhost:5000/api/movies.

▫️CORS is enabled in the backend for localhost origins to allow frontend interaction.
