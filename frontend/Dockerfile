# Usa un'immagine base Node.js per il frontend
FROM node:18-alpine

# Imposta la directory di lavoro nel contenitore
WORKDIR /app

# Copia i file dell'app React nel contenitore
COPY . /app

# Installa le dipendenze
RUN npm install

# Avvia l'app React
CMD ["npm", "start"]
