<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Description

Krikey Backend Challenge

## Installation

```bash
$ volta install node
$ volta install yarn
$ yarn install
```

## Required env variables

| Environment Variable Key | Environment Variable Value         |
| ------------------------ | ---------------------------------- |
| DB_CONNECTION            | postgres                           |
| DB_HOST                  | localhost                          |
| DB_USERNAME              | your username                      |
| DB_PASSWORD              | your password                      |
| DB_PORT                  | 5432                               |
| DB_NAME                  | postgres                           |
| DB_SCHEMA                | public                             |
| DB_MIGRATIONS_TABLE_NAME | migrations                         |
| DB_MIGRATIONS            | dist/migrations/\*.js              |
| DB_MIGRATIONS_DIR        | migrations                         |
| DB_MIGRATIONS_RUN        | true                               |
| DB_SEEDS                 | src/seeds/\*_/_{.ts,.js}           |
| DB_FACTORIES             | src/seeds/factories/\*_/_{.ts,.js} |
| PORT                     | 3000                               |
| PREFIX                   | api/v1                             |
| REDIS_HOST               | localhost                          |
| REDIS_PORT               | 6379                               |
| REDIS_TTL                | 300                                |

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

# Solution

## Documentation

Open API(Swagger) documentation can be found at `/api/v1/reference`

## Health checks

Health check for the API and the database can be found at `api/v1/health`

## Part 1: SQL Challenge

1. Who are the first 10 authors ordered by date_of_birth?

```sql
SELECT * FROM authors ORDER BY date_of_birth ASC LIMIT 10
```

We used an ascending order in this case. If we need to use the inverse order we need to pass `DESC` to our query.

2. What is the sales total for the author named “Lorelai Gilmore”?

```sql
SELECT a.name AS author_name, SUM(si.item_price*si.quantity) AS sales_total FROM sales_items si
INNER JOIN books b ON si.book_id = b.id
INNER JOIN authors a ON b.author_id = a.id
WHERE a.name = 'Lorelai Gilmore'
```

In this case we searched for an explicit coincidence. In many cases we should use at least a `like` or `ilike` clauses for improving user experience.

One of the top solutions for searches like this is fuzzy search.

3. What are the top 10 performing authors, ranked by sales revenue?

```sql
SELECT a.id AS author_id, a.name AS author_name, SUM(si.item_price*quantity) AS revenue FROM sales_items si
INNER JOIN books b ON si.book_id = b.id
INNER JOIN authors a ON b.author_id = a.id
GROUP BY a.id
ORDER BY revenue DESC
LIMIT 10
```

## Part 2A: API Endpoint to get top performing authors

One endpoint was designed to solve this part of the challenge

```http request
GET /authors/top?{author_name=<name>}
```

By default, this endpoint will retrieve the top 10 authors by revenue. If an author name is passed as query parameter the API will make a more specific search.

The API will return appropriate errors if an author_name param is passed wrongly or if the searched author does not exist.

## Part 2B: API Performance

One way to improve API performance is adding a caching layer. NestJs provides us a great built-in module for adding cache.

We can use a good variety of stores, including an in-memory store. For practical purposes we added a Redis store, and we set a TTL of 300 seconds(i.e. 5 minutes).

# About the author

Antonio Mata is a backend developer with 2 years of experience. Currently, he's focusing on Node.js, Typescript and NestJs to built backend solutions, REST and GraphQL APIs.

- Github - [DevMata](https://github.com/DevMata)
- LinkedIn - [Antonio Mata](https://www.linkedin.com/in/antoniomatasv/)
