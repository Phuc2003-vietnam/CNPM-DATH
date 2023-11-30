// const socket=io("http://localhost:3000",{auth:{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MSwiaWF0IjoxNjk2MDYxNjI5LCJleHAiOjE2OTY2NjY0Mjl9.1vcPWce_RMgFqKA7XXcuLBZB_4XiEU7ybOa3aJb61rA"}})
const socket=io("http://localhost:8000")   // ket noi toi socket server
// const userIo=io.of("/user")
socket.on("connect",()=>{
    const h1=document.querySelector("h1")
    h1.textContent=`you connected with id: ${socket.id}` 
})
socket.on("all-message",(message)=>{
    const messagesContainer = document.getElementById("messages");
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    console.log(message);
    messagesContainer.appendChild(messageElement);
})
socket.on("connect_error",error=>{
    console.log(error);
})
socket.on("test",(msg)=>{
    console.log("msg");
})
function ale(){
    alert("dmm")
}
function sendMessage(){
    const msg=document.querySelector("#message")
    const message=msg.value
    const room=document.querySelector("#room").value
    console.log(message,"---",room);
    socket.emit("send-message",message,room)
    // socket.to(room).emit(`${socket.id} said ${message}`)
    msg.value=""
}
socket.on ("happy2",()=>{
    console.log("dmm");
})
function joinChat(){
    const msg=document.querySelector("#roomChat")
    const roomChat=msg.value
    console.log(roomChat);
    // socket.emit("join-room",roomChat,ale)
    socket.emit("join-room",roomChat)

    socket.emit("happy")
}
var count =0
// setInterval(()=>{
//     socket.volatile.emit("ping",++count)
// },1000)
// document.addEventListener("keydown",e=>{
//     if(e.target.matches("input")) return
//     if (e.key === "c") socket.connect()
//     if (e.key === "d") socket.disconnect()
// })