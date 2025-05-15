# Use official Node image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy all other backend files
COPY . .

# Expose port
EXPOSE 3000

# Run the compiled app
CMD ["npm", "start"]
