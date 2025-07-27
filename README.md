# Project Name: Blog API

### Description :

A simple backend REST API for creating, reading, updating, and deleting blogs with JWT-based authentication. It includes user authentication, protected routes, and error handling for a production-like structure.
<br><br>

### Features :

- User authentication with JWT (access & refresh tokens).

- Create, read, update, and delete (CRUD) blogs.

- Secure routes using authentication middleware.

- Centralized error handling and API responses.

- MongoDB database with Mongoose models.

- Populating referenced author field to show author details.  
  <br>

### Tech Stacks :

- Backend: Node.js, Express.js

- Database: MongoDB (Mongoose ORM)

- Authentication: JWT (jsonwebtoken)

- Utilities: bcrypt, dotenv, custom middleware (error handling, auth).

- Testing & API Calls: Postman

<br>

### API Endpoints:

#### 1 - Base URL: /api/v1/blogs

- POST / – Create a new blog (protected).

- GET / – Get all blogs (public).

- GET /:id – Get a blog by ID (public).

- PATCH /:id – Update a blog by ID (protected).

- DELETE /:id – Delete a blog by ID (protected).

#### 2 - Authentication Routes:

- /api/v1/users – Signup/Login.

- /auth – Refresh tokens.

<br>

### Environment Variables:

- PORT – Server port.

- MONGODB_URL – MongoDB connection URL.

- ACCESS_TOKEN_SECRET – Secret key for access token.

- REFRESH_TOKEN_SECRET – Secret key for refresh token.

- ACCESS_TOKEN_EXPIRY - Expiry for access token.

- REFRESH_TOKEN_EXPIRY - Expiry for refresh token.

<br><br>

```
Tested The REST API with Postman.
```
