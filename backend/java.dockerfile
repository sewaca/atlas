FROM openjdk:17-jdk-slim

ADD . /backend
WORKDIR /backend
RUN chmod +x ./mvnw
# clean up crlf endings:
RUN sed -i 's/\r$//' mvnw
# TODO: cache dependencies for faster dev builds. but no need to do it in prod (i guess)
RUN ./mvnw package -DskipTests

# entrypoint.sh is used to wait until database is ready to get connections
COPY ./entrypoint.sh /usr/bin/entrypoint.sh
RUN apt-get update -q -y && apt-get install -q -y netcat

# backend server port:
EXPOSE 5000

# entrypoint waiting for database is ready for connection
ENTRYPOINT [ "entrypoint.sh" ]
# cmd used to run spring application
CMD ["java","-jar","target/atlas-0.0.1.jar"]