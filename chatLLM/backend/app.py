from fastapi import FastAPI

app = FastAPI()

# Store messages in a list (for demonstration purposes).
messages = []

# Model for a chat message
class Message:
    def __init__(self, content):
        self.content = content
        self.likes = 0

# GET request to retrieve messages
@app.get("/messages")
def get_messages():
    return messages

# POST request to send a message
@app.post("/send")
def send_message(content: str):
    message = Message(content)
    messages.append(message)
    return {"message": "Message sent successfully"}

# PUT request to like or dislike a message
@app.put("/like/{message_id}")
def like_message(message_id: int, like: bool = True):
    if 0 <= message_id < len(messages):
        message = messages[message_id]
        if like:
            message.likes += 1
        else:
            message.likes -= 1
        return {"message": "Message liked or disliked successfully"}
    else:
        return {"error": "Message not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=3000)

