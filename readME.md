# 📲 Flights API Gateway

- This service is responsible for user registration, authentication and authorizations

## 📂 Folder Structure

`src` -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests. (You might want to make separate tests folder)

Lets take a look inside the `src` folder

- `config` -> In this folder anything and everything regarding any configurations or setup of a library or module will be done. For example: setting up `dotenv` so that we can use the environment variables anywhere in a cleaner fashion, this is done in the `server-config.js`. One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here.

- `controllers` -> they are kind of the last middlewares as post them we call you business layer to execute the budiness logic. In controllers we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output.

- `errors` -> contains error classes.

- `middlewares` -> they are just going to intercept the incoming requests where we can write our validators, authenticators etc.

- `migrations` -> contains database migration files, these migration files contain logic to manage changes to the database schema over time, such as creating new tables, altering existing tables, or adding indexes.

- `models` -> contains database schema's. It is on javascript level but not on database level

- `repositories` -> this folder contains all the logic using which we interact the DB by writing queries, all the raw queries or ORM queries will go here.

- `routes` -> In the routes folder, we register a route and the corresponding middleware and controllers to it.

- `seeds` -> Not required in this project and can be used to feed some initial values in database.

- `services` -> contains the buiness logic and interacts with repositories for data from the database

- `utils` -> contains helper methods, utility functions etc.

## 🥇 Setup the project

- Download this template from github and open it in your favourite text editor.
- Go inside the folder path and execute the following command:

```
npm install
```

- In the root directory create a `.env` file and add the following env variables
  ```
      PORT=
      SALT_ROUNDS=
      JWT_EXPIRY=
      JWT_SECRET=
  ```
  example:
  ```
      PORT=<PORT_NUMBER eg 3000>
      SALT_ROUNDS="<salt_round_count eg : 8>"
      JWT_EXPIRY="<jwt_expriy_time eg 1h, 1d,etc>"
      JWT_SECRET="<jwt_secret_key>"
  ```
- go inside the `src` folder and execute the following command:
  ```
    npx sequelize init --force
  ```
- By executing the above command you will get `migrations`,`models` and `seeders` folder along with a `config.json` inside the `config` folder.
- Inside `config.json`, write the username of your db, password of your db and dialect, in dialect mention whatever db you are using for ex: mysql, mariadb etc

- To run the server execute

  ```
  npm start
  ```
