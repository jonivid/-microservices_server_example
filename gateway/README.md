# Node.js Gateway

This Node.js gateway serves as the entry point for handling user-related functionalities among other services.


## Features
- **JWT Authentication**: Secures endpoints by requiring a valid JWT token for access.
- **Logging**: Utilizes Winston for comprehensive logging of requests and errors.
- **User Microservice**: (Upcoming) Will manage user data through CRUD operations interfacing with a MySQL database.


## Getting Started

### Prerequisites

- Node.js installed on your machine.
- Basic knowledge of JavaScript and Node.js.

### Installing

Clone the repository to your local machine:

git clone git@github.com:jonivid/microservices_server_example.git

Navigate to the project directory: cd gateway

Install the necessary dependencies: npm install

### Running the Application

Start the server with: npm run start-gateway


This will start the server on `http://localhost:3000`.

### API Endpoints

- **GET /users** - Retrieve a list of all users.
- **GET /users/:id** - Retrieve a user by their ID.
- **POST /users** - Create a new user.
- **PUT /users/:id** - Update an existing user.
- **DELETE /users/:id** - Delete a user.

## Contributing

Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.




