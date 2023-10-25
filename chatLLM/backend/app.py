from fastapi import FastAPI

app = FastAPI()

# Store dialogues and messages in dictionaries (for demonstration purposes).
dialogues = {}
message_id_counter = 1

# Model for a chat message
class Message:
    def __init__(self, content):
        self.content = content
        self.likes = 0

# Model for a dialogue
class Dialogue:
    def __init__(self, name):
        self.name = name
        self.messages = []

# GET request to retrieve the list of all user dialogues
@app.get("/dialogues")
def get_dialogues():
    return list(dialogues.values())

# POST request to create a new user dialogue
@app.post("/create")
def create_dialogue(dialogue_name: str):
    dialogue = Dialogue(dialogue_name)
    dialogues[dialogue_name] = dialogue
    return {"message": "Dialogue created successfully"}

# PUT request to change the name of a dialogue by its ID
@app.put("/change/{dialogue_name}")
def change_dialogue_name(dialogue_name: str, new_name: str):
    if dialogue_name in dialogues:
        dialogue = dialogues.pop(dialogue_name)  # Remove the old entry
        dialogue.name = new_name
        dialogues[new_name] = dialogue  # Add with the new name as the key
        return {"message": "Dialogue name changed successfully"}
    else:
        return {"error": "Dialogue not found"}

# GET request to retrieve messages in a specific dialogue
@app.get("/dialogues/{dialogue_name}")
def get_dialogue_messages(dialogue_name: str):
    if dialogue_name in dialogues:
        return dialogues[dialogue_name].messages
    else:
        return {"error": "Dialogue not found"}

# POST request to send a message to a specific dialogue
@app.post("/send/{dialogue_name}")
def send_message(dialogue_name: str, content: str):
    if dialogue_name in dialogues:
        dialogue = dialogues[dialogue_name]
        message = Message(content)
        dialogue.messages.append(message)
        return {"message": "Message sent successfully"}
    else:
        return {"error": "Dialogue not found"}

# PUT request to like or dislike a message in a specific dialogue
@app.put("/like/{dialogue_name}/{message_id}")
def like_message(dialogue_name: str, message_id: int, like: bool = True):
    if dialogue_name in dialogues and 0 <= message_id < len(dialogues[dialogue_name].messages):
        message = dialogues[dialogue_name].messages[message_id]
        if like:
            message.likes += 1
        else:
            message.likes -= 1
        return {"message": "Message liked or disliked successfully"}
    else:
        return {"error": "Dialogue or message not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=3000)
