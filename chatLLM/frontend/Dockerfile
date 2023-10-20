FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

ADD . .

# Update npm to the latest version
RUN npm install -g npm

# Install npx globally
# RUN npm install

# Expose the port if your application requires it
EXPOSE 3000

# Start a shell to allow interactive use
CMD ["npm", "run", "dev"]

