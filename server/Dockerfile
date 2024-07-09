# Dockerfile for the Express server

# Use the official Node.js image
FROM node:14

# Create and set the working directory
WORKDIR /app/server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the server
CMD ["node", "index.js"]
