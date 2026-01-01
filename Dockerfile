# Use the same Node version as your local setup
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy dependency files first to leverage Docker caching
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for 'npm run dev')
RUN npm install

# Copy the rest of your application code
COPY . .

# Back4App requires the application to listen on a port (usually 3000 or 80)
# You must expose this port in the Dockerfile
EXPOSE 3000

# Set development environment variable
ENV NODE_ENV=development

# Start the development server
# Note: Hot reloading via volumes will NOT work on Back4App
CMD ["npm", "run", "dev"]
