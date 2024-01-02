# Simple Note-Taking API

This is a simple RESTful API for a note-taking application built using Node.js, Express.js, and MongoDB.

## About

The Simple Note-Taking API allows users to create, retrieve, update, and delete text notes. It utilizes MongoDB as the database for storing notes. Basic Authentication is optionally available for endpoint protection.

#credentials
  Username : Prashant
  Password : Password
# API Endpoints

The following are the API endpoints provided by the Simple Note-Taking API:

## 1. Create Note

- **Endpoint:** `POST /api/notes`
- **Description:** Creates a new note.
- **Request Method:** `POST`
- **Request Body Format:**
  - Content-Type: `application/json`
  - Body:
    ```json
    {
      "title": "string",
      "content": "string"
    }
    ```
- **Response Format:**
  - Status Code: `201 Created`
  - Body:
    ```json
    {
      "id": "number",
      "title": "string",
      "content": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
    ```

## 2. Retrieve Notes

- **Endpoint:** `GET /api/notes`
- **Description:** Retrieves a list of all notes.
- **Request Method:** `GET`
- **Response Format:**
  - Status Code: `200 OK`
  - Body:
    ```json
    [
      {
        "id": "number",
        "title": "string",
        "content": "string",
        "createdAt": "date",
        "updatedAt": "date"
      },
      // ... (more notes)
    ]
    ```

## 3. Retrieve Single Note

- **Endpoint:** `GET /api/notes/:id`
- **Description:** Retrieves a single note by its ID.
- **Request Method:** `GET`
- **Response Format:**
  - Status Code: `200 OK`
  - Body:
    ```json
    {
      "id": "number",
      "title": "string",
      "content": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
    ```

## 4. Update Note

- **Endpoint:** `PUT /api/notes/:id`
- **Description:** Updates the content of an existing note.
- **Request Method:** `PUT`
- **Request Body Format:**
  - Content-Type: `application/json`
  - Body:
    ```json
    {
      "title": "string",
      "content": "string"
    }
    ```
- **Response Format:**
  - Status Code: `200 OK`
  - Body:
    ```json
    {
      "id": "number",
      "title": "string",
      "content": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
    ```

## 5. Delete Note

- **Endpoint:** `DELETE /api/notes/:id`
- **Description:** Deletes a note by its ID.
- **Request Method:** `DELETE`
- **Response Format:**
  - Status Code: `200 OK`
  - Body:
    ```json
    {
      "message": "Note deleted successfully"
    }
    ```

### Error Handling

- In case of an error, the API will respond with an appropriate HTTP status code and an error message in the response body.

### Basic Authentication 

- Endpoints are protected using Basic Authentication. The client must include the `Authorization` header with the Base64-encoded "username:password" string for authentication. If authentication fails, the API will respond with a `401 Unauthorized` status code.
