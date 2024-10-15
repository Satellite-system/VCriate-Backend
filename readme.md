```md
# Online Quiz Application Backend

This is a RESTful API for an online quiz application built using Node.js, Express.js, and MongoDB. The API allows users to register and log in, manage quizzes (create, retrieve, attempt quizzes), and view quiz results. It uses JWT for user authentication.

## Features

1. **User Authentication:**
   - Register new users.
   - Login with an existing account.
   - Secure routes with JWT authentication.

2. **Quiz Management:**
   - Create quizzes with multiple-choice questions (MCQs).
   - Retrieve all quizzes.
   - Get quiz details (without revealing the correct answers).
   - Submit quiz attempts and calculate scores.
   - View previous attempts and results.

## Requirements

- Node.js (v14.x or higher)
- MongoDB (v4.x or higher)
- npm (v6.x or higher)

## Installation

### Clone the repository:

```bash
git clone https://github.com/Satellite-system/VCriate-Backend
cd VCriate-Backend
```

### Install dependencies:

```bash
npm install
```

### Environment Variables:

Create a `.env` file in the root of your project and add the following variables:

```env
JWT_SECRET="vcriat_e"
```

for more refer to .env.sample

Replace `MONGO_URI` with your MongoDB connection string and `JWT_SECRET` with a secret key for JWT authentication.

### Start the server:

```bash
npm start
```

The server should now be running on `http://localhost:3000`.

## API Documentation

### **User Authentication**

#### Register

- **Endpoint**: `api/auth/register`
- **Method**: `POST`
- **Description**: Register a new user.

**Request Body**:
```json
{
  "name": "Adarsh Urmaliya",
  "email": "adarsh.urmaliya@gmail.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "message": "User registered successfully"
}
```

#### Login

- **Endpoint**: `api/auth/login`
- **Method**: `POST`
- **Description**: Log in to get a JWT token.

**Request Body**:
```json
{
  "email": "adarsh.urmaliya@gmail.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "token": "your_jwt_token"
}
```

### **Quiz Management**

#### Create a Quiz

- **Endpoint**: `api/quiz/quizzes`
- **Method**: `POST`
- **Description**: Create a new quiz. (Authenticated users only)

**Request Body**:
```json
{
  "title": "Sample Quiz",
  "description": "This is a sample quiz",
  "questions": [
    {
      "questionText": "What is 2 + 2?",
      "options": [
        { "text": "3" },
        { "text": "4" },
        { "text": "5" },
        { "text": "6" }
      ],
      "correctAnswer": 1
    }
  ]
}
```

**Response**:
```json
{
  "message": "Quiz created successfully",
  "quiz": {
    "title": "Sample Quiz",
    "description": "This is a sample quiz",
    "questions": [...]
  }
}
```

#### Get All Quizzes

- **Endpoint**: `api/quiz/quizzes`
- **Method**: `GET`
- **Description**: Retrieve a list of all quizzes.

**Response**:
```json
[
  {
    "title": "Sample Quiz",
    "description": "This is a sample quiz",
    "createdAt": "2024-10-15T12:00:00.000Z"
  }
]
```

#### Get Quiz Details

- **Endpoint**: `api/quiz/quizzes/:quizId`
- **Method**: `GET`
- **Description**: Get the details of a specific quiz without revealing the correct answers.

**Response**:
```json
{
  "title": "Sample Quiz",
  "description": "This is a sample quiz",
  "questions": [
    {
      "questionText": "What is 2 + 2?",
      "options": [
        { "text": "3" },
        { "text": "4" },
        { "text": "5" },
        { "text": "6" }
      ]
    }
  ]
}
```

#### Submit Quiz Attempt

- **Endpoint**: `api/quiz/quizzes/:quizId/attempt`
- **Method**: `POST`
- **Description**: Submit answers for a quiz attempt. (Authenticated users only)

**Request Body**:
```json
{
  "answers": [1]
}
```

**Response**:
```json
{
  "message": "Quiz submitted",
  "score": 1,
  "totalQuestions": 1
}
```

#### View Quiz Results

- **Endpoint**: `api/quiz/quizzes/:quizId/results`
- **Method**: `GET`
- **Description**: View the user's previous attempts and scores for a specific quiz. (Authenticated users only)

**Response**:
```json
[
  {
    "score": 1,
    "attemptDate": "2024-10-15T12:30:00.000Z"
  }
]
```

## Running Tests

Tests are not included in this project at this time. You can add tests using frameworks like Mocha or Jest.

## License

This project is not licensed, made for as a part of assignment.
```

### Project Structure:

.
├── src .
|     ├── controller    # Contains actual route implementation
|     ├── middleware    # Contains middleware like authMiddleware
|     ├── models        # Contains db models
|     └── routes        # Contains actual route implementation
├── .env          # Actual environment variables (not committed)
├── .env.sample   # Example structure for env variables
├── README.md     # Instructions for setting up environment variables
├── package.json
├── database.js   # Contains mongodatabase connection
└── index.js
