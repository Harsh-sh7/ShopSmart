# Stage 1: Build stage
FROM node:20 AS builder

WORKDIR /app

# Copy server package files
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy server source code
COPY server/ ./

# Stage 2: Production stage
FROM node:20-alpine

WORKDIR /app

# Copy dependencies and source code from builder with correct permissions
COPY --chown=node:node --from=builder /app ./

# Expose the application port
EXPOSE 5001

# Add a healthcheck to verify service is running
# Increased start-period to 15s to give the app more time to boot
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5001/api/health || exit 1

# Switch to non-root user
USER node

# Start the server
CMD ["npm", "start"]


