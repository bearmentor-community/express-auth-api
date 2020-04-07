# Project Example: Auth with Express

[![Travis CI](https://travis-ci.org/mhaidarh/project-auth-express.svg?branch=master)](https://travis-ci.org/github/mhaidarh/project-auth-express)

Visit the live example: https://api.haidar.dev

## Links

- Production: https://api.haidar.dev
- Heroku: https://api-haidar-dev.herokuapp.com
- App Engine: https://api-haidar-dev.REGION.r.appspot.com

## Stack

- REST API
- Express
  - Body Parser
  - Cookie Parser
  - bcrypt
  - JWT
- Debug
- Morgan
- MongoDB, Mongoose, and mLab
  - Later: MySQL, Sequelize, and MySQL instance
- Heroku
  - Later: Amazon EBS
  - Later: Google App Engine
- Cloudflare
- Swagger

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
- Remove all users

## REST API Specification

| Endpoint               | HTTP     | Description            |
| ---------------------- | -------- | ---------------------- |
| `/users/register/seed` | `POST`   | Seed new users         |
| `/users/register`      | `POST`   | Register new user      |
| `/users/login`         | `POST`   | Login to existing user |
| `/users`               | `GET`    | Get all users          |
| `/users/:id`           | `GET`    | Get one user by id     |
| `/users`               | `DELETE` | Remove all users       |

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

## License

MIT
