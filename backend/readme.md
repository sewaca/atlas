# Backend microservice

it's the Java part of ATLAS project

## Running Locally

Make sure you have Java and Maven installed.

```sh
$ mvn install
$ java -jar target/atlas-0.0.1.jar
```

To startup with [Heroku CLI](https://cli.heroku.com/) change last command to: 
```sh
$ heroku local:start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Docker runtime: 
```sh 
$ docker build . -t aurora-backend-app:0.0.0
$ docker run -dit -p 5000:5000 aurora-backend-app:0.0.0
```