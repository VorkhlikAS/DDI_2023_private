# FastAPI Chat Application

This is a simple chat application built with FastAPI. You can run the application in a Docker container.

## Prerequisites

- [Docker](https://www.docker.com/) installed on your system.

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>

1. Navigate to the project directory:

   ```bash
   
   cd fastapi-chat-app
   ```
1. Build the Docker image:

   ```bash
   
   docker build -t fastapi-chat-app .
   ```

   Replace fastapi-chat-app with your preferred image name.

1. Run the Docker container:

   ```bash
   
    docker run -p 3000:3000 fastapi-chat-app
   ```
    This command maps port 3000 from the container to your host machine.

    Your FastAPI chat application should now be accessible at http://localhost:3000.

## API Routes

    GET /messages: Retrieve a list of all messages.
    POST /send: Send a new message by providing a JSON request body with the content field.
    PUT /like/{message_id}: Like or dislike a message by specifying the message_id and the like parameter (defaulting to like).
