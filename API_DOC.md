# 🎥 Movies API Documentation

Base URL: http://localhost:5000/api/movies

---

## 1. Get All Movies

- **Endpoint:** `/api/movies`  
- **Method:** `GET`  
- **Description:** Fetches a list of all movies stored in the database  
- **Request Body:** None  
- **Response:** Array of movie objects  

### Sample Response
   [
  {
    "_id": "inception123",
    "title": "Inception",
    "director": "Christopher Nolan",
    "releaseYear": 2010,
    "genre": "Sci-Fi",
  },
  {
    "_id": "matrix456",
    "title": "The Matrix",
    "director": "The Wachowskis",
    "releaseYear": 1999,
    "genre": "Action",
  }
]

---

## 2. Get Movie by ID

- **Endpoint:** `/api/movies/:id`  
- **Method:** `GET`  
- **Description:** Fetches a single movie by its unique ID
- **URL Parameter:** id (string): The unique movie ID
- **Request Body:** None  
- **Response:** A single movie object or an error message if not found  

### Sample Response

[
  {
    "_id": "inception123",
    "title": "Inception",
    "director": "Christopher Nolan",
    "releaseYear": 2010,
    "genre": "Sci-Fi",
    "rating": 5
  }
]

---

## 3. Add a New Movie

- **Endpoint:** `/api/movies`  
- **Method:** `POST`  
- **Description:** Add a new movie to the database
- **Request Body:** JSON object with movie details  

### Sample Successful Response

[
 {
  "_id": "inception123",
  "title": "Inception",
  "director": "Christopher Nolan",
  "releaseYear": 2010,
  "genre": "Sci-Fi",
  "__v": 0
}
]

---

## 4. Update an Existing Movie

- **Endpoint:** `/api/movies/:id`  
- **Method:** `PUT`  
- **Description:** Update details of an existing movie by its ID
- **URL Parameter:** id (string): The unique movie ID to update
- **Request Body:** JSON object with updated fields (any subset)  

### Request Body Example

[
  {
  "title": "Inception Updated",
  "releaseYear": 2011
}
]

### Sample Successful Response

[
  {
  "_id": "inception123",
  "title": "Inception Updated",
  "director": "Christopher Nolan",
  "releaseYear": 2011,
  "genre": "Sci-Fi",
  "__v": 0
}
]

---

## 5. Delete a Movie

- **Endpoint:** `/api/movies/:id`  
- **Method:** `DELETE`  
- **Description:** Remove a movie from the database by its ID  
- **URL Parameter:** id (string): The unique movie ID to delete
- **Request Body:** None  
- **Response:** Confirmation message  

### Sample Response

[
  {
  "message": "Movie deleted"
}
]

## 📝 Notes

1. All requests and responses use application/json content type.

2. The _id field is a string and can be custom or autogenerated.

3. Handle CORS policies if using this API from a different frontend origin.

4. Status codes:

   🔸200 OK for successful GET, PUT, DELETE requests.

   🔸201 Created for successful POST requests.

   🔸400 Bad Request if required fields are missing or invalid.

   🔸500 Internal Server Error for unexpected failures.
