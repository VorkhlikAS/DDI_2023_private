# Frontend Chat App

## Prerequisites

- [Docker](https://www.docker.com/) installed on your system.

## Run app with Docker
Build container

```bash
docker build -t my-next-app .
```
Run container

```bash
docker run --rm -p 3000:3000 my-next-app  
```
Open app at your browser
```bash
http://localhost:3000
```
Enjoy!

# PS:

* I used chatGPT3.5 to develop this frontend app.
* I used different types of prompts to complete this task: mainly prompts to generate new code based on my pre existing code; prompts that describe the structure of my project directory and ask for tips and instructions on how to achieve desirable working environment; prompts regarding working with docker containers for development, mainly because I didn't want to install all the dependencies locally, so I had to work with the interactive shell container mapping my working directory with the directory inside a container; prompts that ask general question about the Next.js framework and as it seems chatGPT3.5 is not very familiar with the technology.
* From my experience I can tell that chatGPT is not very usefull when you are trying to work with the frameworks that he's not very familiar with, but when you find the right approach to the task it becomes much less tedious to work with him. I had lots of problems at the start generating the project, for some reason I couldn't move files from one container to another so that they'd work without errors. Finally could achieve optimal workflow when developing this app interactively inside a container, printing the contents of my scripts with the desirable outcome as a working prompt.
