# URL Shortener

## Requisites

You need this softwares and libraries instaled in your machine to run this application:

- [Git](https://git-scm.com/download)
- [Docker](https://docs.docker.com/)
- [Node.js + npm](https://nodejs.org/en/)

## Instalation

After cloning this repository, run the following command:

```bash
$ cp .env.example .env
```

Set up the configuration for `.env` file. As follows:

**APP_NAME:** Name of the API
**DEFAULT_PORT:** Default port used by API
**EXPIRATION_PERIOD:** Period that an URL gets expired. This value must be a valid [postgres interval type](https://www.postgresql.org/docs/9.1/datatype-datetime.html).
**CRON_TIMER:** Timer when the API deletes old URLs that already expired. This value must be a valid [cron pattern](https://docs.nestjs.com/techniques/task-scheduling).
**DB_CONNECTION, DB_HOST, DB_DATABASE, DB_USERNAME, DB_PORT, DB_PASSWORD:** The configuration of the connection with database

After that, run the command:

```bash
$ docker-compose up
```

## Test

Inside the container you can run the following commands for testing:

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Docs

List of documentations and libraries used to create this application:

- [NestJS](https://docs.nestjs.com/)
- [TypeORM](https://typeorm.io/#/)
- [Jest](https://jestjs.io/)
