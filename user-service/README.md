# User Service API Documentation

## Overview
This document covers the backend API services for user management including registration, login, and user profile management.

## API Endpoints

### Register
- **Description**: This endpoint is used for registering a new user.
- **URL**: `/register`
- **Method**: `POST`
- **Data Params**
  - `username`: A unique username for the user.
  - `password`: The user's password.
  - `email`: The user's email, which must be unique.
- **Success Response**:
  - **Code**: 201
  - **Content**: `{ message: "User registered successfully", userId: 12 }`
- **Error Response**:
  - **Code**: 400 BAD REQUEST
  - **Content**: `{ message: "Username or email already exists" }`
- **Sample Call**:
  ```bash
  curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe", "password":"s3cr3t", "email":"john@example.com"}'
