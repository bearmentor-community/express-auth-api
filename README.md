# Project Example: Auth with Express

[![Travis CI](https://travis-ci.org/mhaidarh/project-auth-express.svg?branch=master)](https://travis-ci.org/github/mhaidarh/project-auth-express)

- Visit the live API: https://api.haidar.dev
- Visit the live documentation: https://api.haidar.dev/docs

## Links

- Production: https://api.haidar.dev
  - Docs: https://api.haidar.dev/docs
- Heroku: https://api-haidar-dev.herokuapp.com
  - Dashboard: https://dashboard.heroku.com/apps/api-haidar-dev
- Google App Engine: https://api-haidar-dev.REGION.r.appspot.com
- Amazon EBS: https://api-haidar-dev.example.com

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
- Swagger
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

Swagger URL: https://api.haidar.dev/docs

| Endpoint              | HTTP     | Description                    |
| --------------------- | -------- | ------------------------------ |
| `/users/register`     | `POST`   | Register new user              |
| `/users/login`        | `POST`   | Login to existing user         |
| `/users/validate`     | `GET`    | Validate user with its token   |
| `/users/profile`      | `GET`    | Get authenticated user profile |
| `/users/seed`         | `POST`   | Seed initial users             |
| `/users`              | `GET`    | Get all users                  |
| `/users/:id`          | `GET`    | Get one user by id             |
| `/users/search?name=` | `GET`    | Search user by name            |
| `/users`              | `DELETE` | Delete all users               |
| `/users/:id`          | `DELETE` | Delete one user by id          |

## Scripts

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
MONGODB_DB_NAME=project-auth-express
JWT_SECRET=this_is_your_secret
```

#### Production

```
MONGODB_URI=mongodb://urltomongodb.com:27017
MONGODB_DB_NAME=project-auth-express
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

### Debug Production on Heroku

```sh
heroku logs --tail -a api-haidar-dev
```

## References

- [Swagger: Time to document that Express API you built!](https://levelup.gitconnected.com/swagger-time-to-document-that-express-api-you-built-9b8faaeae563)

## License

MIT
