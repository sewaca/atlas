# Backend microservice

it's the Java part of ATLAS project

## Running Locally

Make sure you have Java and Maven installed.

1. Duplicate .env.example -> .env and fill it up with your values
2. Put in terminal `./localstart.sh`

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Docker runtime: 

### Start service:
```sh 
$ docker-compose up --build -d
```

### Stop service:
```sh
$ docker-compose down
```