# Use the official Node.js image
FROM node:14

# Set the working directory to /app
WORKDIR /app/client

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React application
RUN npm run build

# Install serve to serve the build directory
RUN npm install -g serve

# Expose the port serve runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
