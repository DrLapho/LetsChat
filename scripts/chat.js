// adding new chat
// setting up a real-time listener to get new chats
// updating the username
// updating the room

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.Chats = db.collection("Chats");
    this.unsub;
  }

  async addChat(message) {
    //format a chat object
    const now = new Date();
    const chat = {
      message, //ES6 message:message === message
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };
    const response = await this.Chats.add(chat);
    return response;
  }
  //Real time listener
  getChats(callback) {
    this.unsub = this.Chats.where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            callback(change.doc.data());
          }
        });
      });
  }
  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }
  updateRoom(room) {
    this.room = room;
    console.log("Room :)");
    if (this.unsub) {
      this.unsub();
    }
  }
}
