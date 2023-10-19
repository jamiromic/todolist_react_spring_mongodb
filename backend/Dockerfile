# Usa un'immagine base per Java e Spring Boot
FROM openjdk:17

# Imposta la directory di lavoro nel contenitore
WORKDIR /app

# Copia il file JAR del tuo backend Spring Boot nell'immagine
COPY target/backend-0.0.1-SNAPSHOT.jar /app/app.jar

# Avvia il backend Spring Boot
CMD ["java", "-jar", "app.jar"]