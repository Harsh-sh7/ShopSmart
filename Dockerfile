FROM node:20

WORKDIR /app

# Copy server package files
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy server source code
COPY server/ ./

# Expose the application port
EXPOSE 5001

# Start the server
CMD ["npm", "start"]
