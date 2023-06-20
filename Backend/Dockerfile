# Use an official OpenJDK runtime as the base image
FROM openjdk:8-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the executable JAR file into the container
COPY target/HospitalManagementSystem-0.0.1-SNAPSHOT.jar ./app.jar

# Specify the command to run the application
CMD ["java", "-jar", "app.jar"]

EXPOSE 8080