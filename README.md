<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Description

AWS EKS Challenge

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
| DB_HOST                  | database                           |
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
| REDIS_HOST               | redis                              |
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

## Docker

```bash
# up
$ docker-compose up

# start
$ docker-compose start

# stop
$ docker-compose stop

# down
$ docker-compose down
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

One of the top solutions for searches like this is fuzzy search. Or

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

## Part 3: Docker and Kubernetes

A step-by-step guide about containerize and deploy with Kubernetes

### Dockerfile and building a Docker image

We can create an exclusive image for our API. To do that, we need the following `Dockerfile`:

```dockerfile
# specify the desired version of the base image
FROM node:14.16.0
# set the working dir for config permissions
WORKDIR /usr/src/
# define permissions for node user
RUN chown -R node:node /usr/src
# set the working dir for the project
WORKDIR /usr/src/app
# copy files for dependencies
COPY package.json yarn.lock ./
# install dependencies
RUN yarn install
# copy all project files
COPY . /app
# define user
USER node
```

One best practice is defining an exclusive user to run our containerized project. By default, Node.js images run as root, so we needed to set the built-in node user.

Once we have our `Dockerfile` we can build and publish our image following the next steps:

1. Log in to the DockerHub registry with `docker login`
2. Build and tag the image with `docker build -t <username>/krikey-challenge:1.0.0 .`, the `-t` specify the container tag and `.` tells Docker to look for the Dockerfile in the current directory.
3. The tag must follow the format `<username>/<imagename>:<tag o version>` to allow the push to the DockerHub.
4. Push the image with `docker push <username>/krikey-challenge:1.0.0`

Our published image can be found [here](https://hub.docker.com/r/antoniomata07/krikey-challenge)

### Kubernetes

Our project have 3 components: Node.js API, Postgres database and Redis database. So, similarly as we did with docker-compose we need to define config for every resource in Kubernetes. We create a `/kube` directory at the root of our project, with this we keep all of Kubernetes `.yml` files together.

To build a resource in Kubernetes we need to create a Deployment and a Service.

So, let's check a Deployment

```dockerfile
# ... Deployment YAML definition
apiVersion: apps/v1
kind: Deployment    # Define the type of resource
metadata:
  name: krikey-challenge    # Name of the resource
spec:
  replicas: 1   # Number of replicas of our container
  # Here we define our pod, we don't work with container but with pods that wrap them
  selector:
    matchLabels:
      app: krikey-challenge
  template:
    metadata:
      labels:
        app: krikey-challenge
    spec:
      # The container inside our pod
      containers:
        - name: app
          image: antoniomata07/krikey-challenge:1.0.3
          imagePullPolicy: Always
          ports:
            - containerPort: 3000
```

Now we can check one of our services

```dockerfile
apiVersion: v1
kind: Service
metadata:
  name: krikey-challenge
spec:
# We select the pods to be exposed based on their label
  selector:
    app: krikey-challenge
# Our port configuration, our service will listen for requests at port 3000 
# and forward them to our targeted pods
  ports:
    - port: 3000
      targetPort: 3000
# The type of our service. LoadBalancer makes our exposed pods accesible from outside our cluster
  type: LoadBalancer
```

We have the following structure within our files:

#### Node.js API
1. Deployment
2. Service

#### Postgres database
1. Deployment
2. Service
3. Persistent volume

#### Redis database
1. Deployment
2. Service

#### Secret variables

We store our secrets with a `secrets.yml` file. We shouldn't leave our secrets in our repository, but we'll do it for test purposes.
Our secrets are opaque, so we need an encoding to store them.

We can do it with:
```shell
echo -n <string> | base64
```

For example,
```shell
echo -n 'krikeydb' | base64 # We get cmF2bi1kYg==
```

## Into our EKS

Deploying to Amazon Elastic Kubernetes Service is smooth and sweet. We need a AWS account and have [eksctl](https://eksctl.io/) installed in out computer.

1. We need to grab a pair of AWS Access Keys(i.e. access key ID and secret access key) and put them in our `.aws/crendentials`.
2. Create a cluster with `eksctl create cluster --region=<region_name> --name=<cluster_name>`. In our case we use `--region=eu-west-2 --name=krikey` for practical purposes.
3. We need to wait about 15 minutes for the cluster been created. We can verify our nodes with `kubectl get nodes`
4. To deploy our project we need to move to our project root and apply `kubectl apply -f kube`
5. Later we can check our public service address with `kubectl get service krikey-challenge`
6. Now, we only need to seed our database. To achieve this we run `kubectl exec --stdin --tty krikey-challenge -- /bin/bash` and now inside the pod we only need to run `yarn seed:run`

<p align="center"><a href="http://a75c38f8d84824dc085c98e92486e9dc-764529595.eu-west-2.elb.amazonaws.com:3000/api/v1/authors/top">We did it!</a></p>
<p align="center">
    <a href="https://ibb.co/9TkrYyp"><img src="https://i.ibb.co/LtXZp90/krikey.png" alt="krikey" border="0"></a>
</p>

# About the author

Antonio Mata is a backend developer with 2 years of experience. Currently, he's focusing on Node.js, Typescript and NestJs to built backend solutions, REST and GraphQL APIs.

- Github - [DevMata](https://github.com/DevMata)
- LinkedIn - [Antonio Mata](https://www.linkedin.com/in/antoniomatasv/)
