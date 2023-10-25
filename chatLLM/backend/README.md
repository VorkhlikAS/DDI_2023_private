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
Routes:

    GET /dialogues
        Description: Retrieve the list of all user dialogues.

    POST /create
        Description: Create a new user dialogue.
        Request Body: JSON object with the dialogue_name field.

    PUT /change/{dialogue_name}
        Description: Change the name of a dialogue by its name.
        Path Parameter: dialogue_name - the name of the dialogue to be changed.
        Request Body: JSON object with the new_name field.

    POST /send/{dialogue_name}
        Description: Send a message to a specific dialogue.
        Path Parameter: dialogue_name - the name of the dialogue to which the message should be sent.
        Request Body: JSON object with the content field.

    PUT /like/{dialogue_name}/{message_id}
        Description: Like or dislike a message in a specific dialogue.
        Path Parameter: dialogue_name - the name of the dialogue where the message is located.
        Path Parameter: message_id - the index of the message in the dialogue.
        Request Body: JSON object with the like field (defaulting to like).

    GET /dialogues/{dialogue_name}
        Description: Retrieve messages in a specific dialogue.
        Path Parameter: dialogue_name - the name of the dialogue for which messages are retrieved.
