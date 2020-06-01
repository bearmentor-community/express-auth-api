# Example Auth Express

Example Auth API with Express.

## Links

- Production: https://example-auth-express.azobu.app
- Heroku: https://azobu-example-auth-express.herokuapp.com
  - Dashboard: https://dashboard.heroku.com/apps/azobu-example-auth-express
- Google App Engine: https://azobu-example-auth-express.REGION.r.appspot.com
- Amazon EBS: https://azobu-example-auth-express.example.com

## Stack

- REST API
- Express
  - Body Parser
  - Cookie Parser
  - bcrypt
  - JWT
- Debug
- Morgan
- Postman
- MongoDB, Mongoose, and mLab
  - Later: MySQL, Sequelize, and MySQL instance
- Heroku
  - Later: Amazon EBS
  - Later: Google App Engine
- Cloudflare
- Uniregistry

## Features

- Seed new users
- Register new user
  - Name
  - Email
  - Password encrypted using bcrypt
- Login to existing user
  - Email
  - Password
  - Authorization token with JWT
- Get all users
  - Don't show the password
- Get user by id
  - Don't show the password
- Search users by name
- Remove all users

## REST API Specification

### Auth

| Endpoint         | HTTP   | Description               |
| ---------------- | ------ | ------------------------- |
| `/auth/register` | `POST` | Register new user         |
| `/auth/login`    | `POST` | Login to existing user    |
| `/auth/logout`   | `POST` | Logout the logged in user |

### Users

| Endpoint              | HTTP     | Description                    |
| --------------------- | -------- | ------------------------------ |
| `/`                   | `GET`    | Get index                      |
| `/users/seed`         | `POST`   | Seed initial users             |
| `/users/validate`     | `GET`    | Validate user with its token   |
| `/users/profile`      | `GET`    | Get authenticated user profile |
| `/users/search?name=` | `GET`    | Search user by name            |
| `/users`              | `GET`    | Get all users                  |
| `/users`              | `DELETE` | Delete all users               |
| `/users/:id`          | `GET`    | Get one user by id             |
| `/users/:id`          | `DELETE` | Delete one user by id          |

## Usage

### Setup Environment Variables

#### Development

Run the `setup.sh` script first, to copy `.env.schema` into `.env`.

```sh
./setup.sh
```

Then you fill the variables in `.env` file.
Remember to install and make sure MongoDB is running on your machine.

```txt
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET=this_is_your_secret
```

#### Production

```
MONGODB_URI=mongodb://urltomongodb.com:27017
JWT_SECRET=this_is_your_other_secret
```

### Install Dependencies

```sh
yarn
```

### Run Development Server

```sh
yarn dev
```

### Run Production Server

```sh
yarn start
```

### Run Test Suite

```sh
yarn test
```

### Seed Initial Data

Run Postman collection.

```sh

```

### Debug Production on Heroku

```sh
heroku logs --tail -a api-haidar-dev
```

## License

MIT
