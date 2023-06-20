# Use an OpenJDK base image
FROM openjdk:8-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the executable JAR file into the container
COPY target/HospitalManagementSystem-0.0.1-SNAPSHOT.jar app.jar

# Expose the port that your Spring Boot application listens on (change the port number if needed)
EXPOSE 8080

# Set the command to run your Spring Boot application
CMD ["java", "-jar", "app.jar"]
