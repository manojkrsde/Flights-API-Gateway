# 🌐 Flights API Gateway

✨ **Streamlined Authentication:** This service handles user registration, authentication, and authorization to provide smooth and secure user experiences.

🌐 **Efficient Proxy Handling:** It creates a seamless proxy for both the Flights Service and the Booking Service, ensuring fast and reliable routing and ensure no unathorized access.

🚦 **Smart Rate Limiting:** Integrated rate limiter controls traffic flow and prevents overloading, maintaining optimal performance and service reliability.

🔐 **Secure Access Control:** Users must be authenticated to create bookings, and only authorized individuals (admins or flight company representatives) can modify flight details.

📌 Note: This service is dependent on `flights`✈️ and `bookings` 📅 service for some functionalities.

## 🔍 Exploring the `Folder Structure`

The `src` folder houses all the actual source code of the project, excluding any tests. It's organized into various subfolders to keep the codebase clean and maintainable. Let's take a look inside the `src` folder:

- ⚙️ **`config`**: This folder contains configurations and setups for libraries or modules. For example:

  - **`server-config.js`**: Sets up `dotenv` for using environment variables in a cleaner fashion.

  - **`logger-config.js`**: Configuring a logging library for meaningful logs is also managed here.

  - **`config.json`**: Sets up `database` configuration, contains development, testing and production environment configuration such as
    - "username"
    - "password"
    - "database"
    - "host"
    - "dialect"

- 💼 **`controllers`**: Acts as the intermediary between incoming requests and the business layer:

  - Receives incoming requests and data, then passes them to the business layer.
  - Structures API responses based on the business layer's output before sending them to the client.

- ⚠️ **`errors`**: Contains custom error classes used across the project to handle exceptions.

- 🔍 **`middlewares`**: Intercepts incoming requests and allows for the implementation of:

  - Validators,
  - authenticators,
  - and other request interception logic.

- 🛠️ **`migrations`**: Houses database migration files to manage schema changes over time:

  - Creating new tables, altering existing tables, and adding indexes.

- 🧩 **`models`**: Contains JavaScript representations of database schemas.

- 🗃️ **`repositories`**: Provides logic for interacting with the database:

  - Houses all `raw` queries or `ORM` queries.

- 🌐 **`routes`**: Defines API routes for the application:

  - Registers routes with corresponding middlewares and controllers.

- 📝 **`seeders`**: Populates the database with default values for roles, such as customer, flight_company, and admin.

- 🔧 **`services`**: Manages core application functionality and business logic, communicating with the repository layer for database interaction.

- 🔧 **`utils`**: Contains utility functions, helper methods, enums, and error handlers:
  - These functions provide common support to the rest of the application.

## 🥇 Project Setup

1. ⬇️ **Download**: Grab this project template from GitHub and open it in your favorite text editor.

2. 📥 **Install Dependencies**: Navigate to the project folder and execute the following command to install all necessary dependencies:

   ```
   npm install
   ```

3. 🔌**Environment Configuration**: In the root directory, create a `.env` file and add the following environment variables:

   ```
   PORT=
   SALT_ROUNDS=
   JWT_EXPIRY=
   JWT_SECRET=
   FLIGHT_SERVICE=
   BOOKING_SERVICE=
   ```

   Here's an example configuration:

   ```
   PORT=3001
   SALT_ROUNDS=8
   JWT_EXPIRY="1h"
   JWT_SECRET="<jwt_secret_key>"
   FLIGHT_SERVICE='http://localhost:3000'
   BOOKING_SERVICE='http://localhost:4000'
   ```

4. 🚀 **Initialize Sequelize**: Navigate to the `src` folder and execute the following command to initialize Sequelize:

   ```
   npx sequelize init
   ```

   This will create a `config.json` file inside the `config` folder.

5. 🔌 **Configure Database**: Open `config.json` and update the database configuration:

   - Add your database username, password, and dialect (e.g., `mysql`, `mariadb`, `mssql`, etc.).

6. 💾 **Database Setup**: Populate the database by running the following commands:

   ```
   npx sequelize db:create
   npx sequelize db:migrate
   npx sequelize db:seed:all
   ```

7. ⚡**Start the Server**: Begin running the server using this command:

   ```
   npm start
   ```

   ⚠️ **Note**: Make sure other services, such as flights and booking services, are also running.

## ⚙️ Technologies Used

- **`Node.js`**: A versatile, server-side JavaScript runtime for building scalable and efficient applications.

- **`Express.js`**: A minimalist web framework for Node.js, providing robust routing and middleware capabilities.

- **`Git`**: A version control system for managing code changes and collaboration among team members.

- **`MSSQL`**: A relational database management system that offers robust data storage and querying capabilities.

- **`Sequelize ORM`**: An object-relational mapping tool for Node.js that simplifies database interactions and model management.

- **`Postman`**: A popular API development tool for testing, documenting, and collaborating on APIs.

## 📦 Packages and Their Usage

- **`bcrypt`** 🔒: Used for securely hashing passwords and comparing hashed passwords. It helps protect user credentials by ensuring sensitive data is stored securely.

- **`body-parser`** 📝: A middleware for Express that parses incoming request bodies in various formats such as JSON and URL-encoded data, making the data easily accessible for further processing.

- **`dotenv`** 🔧: Loads environment variables from a `.env` file into `process.env`, allowing you to securely store sensitive information such as API keys and database credentials.

- **`express`** 🚀: A web application framework for Node.js that provides a minimalist structure for building APIs and web applications. It offers routing, middleware, and other essential features for building scalable server-side applications.

- **`express-rate-limit`** 🚦: A middleware for Express that limits repeated requests from the same IP address. It helps protect your application against abusive requests, such as DDoS attacks, by imposing request rate limits.

- **`http-proxy-middleware`** 🔀: A middleware for Express that acts as a reverse proxy, forwarding incoming requests to other backend services based on defined rules. This allows you to efficiently route traffic and manage multiple services through a single entry point.

- **`http-status-codes`** 📜: A package providing easy access to standard HTTP status codes, which makes it convenient to set response statuses and handle different types of API responses.

- **`jsonwebtoken`** 🔑: A library for generating and verifying JSON Web Tokens (JWTs), which are used for authentication and authorization in your application. JWTs enable secure and stateless user sessions.

- **`pluralize`** 🔀: A utility library for transforming singular words into plural and vice versa. This is used mainly to converting models name in plural form, which is a use case in identity reset function.

- **`sequelize`** 💽: An object-relational mapping (ORM) library for Node.js, allowing you to interact with your database using models and associations. It simplifies database operations and offers a high-level abstraction.

- **`sequelize-cli`** 🛠️: A command-line interface for Sequelize that provides commands for managing migrations, models, and other database-related tasks. It facilitates database schema changes and updates.

- **`tedious`** 💾: A Node.js driver for interacting with Microsoft SQL Server databases. It allows you to execute queries, manage transactions, and handle database connections.

- **`winston`** 🛡️: A logging library for Node.js that supports various log levels and transports (such as file or console logging). It helps you track and manage application logs effectively for debugging and monitoring purposes.

## Project Details

### 💾 Database Structure

The project uses a relational database to store data for various entities:

---

- **Users** 👤: Stores user information such as name, email, hashed password, etc.

  ```
      +-------------------------+
      |          USERS          |
      +-------------------------+
      |  id  -> (PK, Identity)  |
      |  name                   |
      |  email                  |
      |  password (hashed)      |
      |  createdAt              |
      |  updatedAt              |
      +-------------------------+

  ```

---

- **Roles** 🎭: Contains information about the different roles a user can have (e.g., customer, admin).

  ```
    +-------------------------+
    |          Roles          |
    +-------------------------+
    |  id  -> (PK, Identity)  |
    |  name -> (Check Const)  |
    |  createdAt              |
    |  updatedAt              |
    +-------------------------+

    name column values : ['admin', 'customer', 'flight_company']
  ```

---

- **User Roles** 🔗: A join table that establishes a many-to-many relationship between **Users** and **Roles**, allowing users to have multiple roles.

  ```
    +-------------------------+
    |        user_roles       |
    +-------------------------+
    |  id  -> (PK, Identity)  |
    |  user_id -> (FK)        |
    |  role_id -> (FK)        |
    |  createdAt              |
    |  updatedAt              |
    +-------------------------+
    user_id : References Users on column id
    role_id : References Roles on column id
  ```

  Foreign keys establish relationships between **Users** & **user_roles** and **Roles** & **user_roles** helping in creating many to many association.

---

### 🌐 API Calls

The API endpoints use different `HTTP` methods(`GET`, `POST`, `PUT`, `DELETE`) and follow `RESTful` design principles.

---

The project provides a variety of API endpoints for different functionalities:

- **API GATEWAY BASE ADDRESS** : `http:localhost:3001/`

- **User Authentication**: Endpoints for user registration, login, and authentication management.

  | HTTP Method | Endpoint                | Middleware              | Controller            |
  | :---------- | :---------------------- | :---------------------- | :-------------------- |
  | GET         | `/api/v1/user/info`     | `checkAuth`             | `PingCheckController` |
  | POST        | `/api/v1/user/register` | `validateCreateRequest` | `register`            |
  | POST        | `/api/v1/user/login`    | `validateLoginRequest`  | `login`               |
  | POST        | `/api/v1/user/role`     | `checkAuth`, `isAdmin`  | `addRoleToUser`       |
  | DELETE      | `/api/v1/user/role`     | `checkAuth`, `isAdmin`  | `revokeUserRole`      |

---

The application employs a 🔀 `proxy middleware` to efficiently manage and route requests for Flights Service and Bookings Service:

- ✈️ **Flights Service API**

  - Requests with the prefix `/flightService` are forwarded by the proxy to the relevant flight service endpoint.

  - This process requires authentication and administrative privileges to ensure secure access.

  - The proxy middleware removes the `/flightService` prefix from the request path and forwards the request to the target service.

  - If necessary, the proxy handles adjustments to the request body for compatibility with the target service.

- 📅 **Bookings Service API**

  - Requests with the prefix `/bookingService` are redirected by the proxy to the corresponding booking service endpoint.

  - These requests require user authentication for secure access.

  - The proxy middleware removes the `/bookingService` prefix from the request path and forwards the request to the target service.

  - It sets the `x-user-data` header using the requester’s user data to facilitate proper handling of the request by the target service.

  - If needed, the proxy adjusts the request body to ensure compatibility with the target service.

---

### ⚠️ Error Handling

Error handling is a crucial aspect of the project, ensuring smooth operation and useful feedback for clients:

- **Custom Error Classes**: The project uses custom error classes like `BaseError`, `BadRequestError`, `InternalServerError`, and `AppError` to manage different types of errors and return appropriate HTTP status codes.

- **Middleware**: The `errorHandler` middleware function intercepts and handles exceptions by identifying the type of error and responding accordingly. It is executed just before express default error handler runs

- **Structured Responses**: Errors are structured as JSON objects with properties such as status code, message, and error explanation. This consistent response format simplifies troubleshooting for clients.

- **Default Handling**: If an unknown error occurs, the middleware throws a custom `InternalServerError` and log the error in `Logger`.

- **Logging**: All errors are logged for monitoring and troubleshooting purposes, enabling quick identification and resolution of problems.

The combination of these features ensures reliable and user-friendly error handling throughout the application.
