//Dom Query

const chatList = document.querySelector(".chat-list");
const newChartForm = document.querySelector(".new-chat");
const newNameFrom = document.querySelector(".new-name");
const updateMsg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");
newChartForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChartForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => {
      newChartForm.reset();
    })
    .catch((err) => {
      console.log(err);
    });
});

newNameFrom.addEventListener("submit", (e) => {
  e.preventDefault();
  const newName = newNameFrom.name.value.trim();
  chatroom.updateName(newName);
  //
  newNameFrom.reset();
  updateMsg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => (updateMsg.innerText = ""), 3000);
});

rooms.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats((chat) => chatUI.render(chat));
  }
});
const username = localStorage.username ? localStorage.username : "No Name";
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("Gaming", username);

chatroom.getChats((data) => {
  chatUI.render(data);
});

//85,79,75,76,72

//60,54,74,69,69

//80,90,90,90,80
