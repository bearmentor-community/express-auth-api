# Project Example: Auth with Express

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

## Scripts

### Setup Environment Variables

Run the `create-env.sh` script first, to copy `.env.schema` into `.env`.

```sh
./create-env.sh
```

Then you fill the `env` variables. Remember to install and make sure MongoDB is running on your machine.

```txt
HOST=localhost
PORT=8000
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=project-auth-express
JWT_SECRET=this_is_your_secret
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

## License

MIT
