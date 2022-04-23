const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app); //Define o protocolo HTTP
const io = require("socket.io")(server); //Define o protocolo do WebSocket com base no HTTP

app.use(express.static(path.join(__dirname, "public"))); //Aqui ficarão todos os arquivos publicos utilizados pela aplicação
app.set("views", path.join(__dirname, "public")); //Aqui é definido para o node utilizar as views como HTML e não como EJS
app.engine("html", require("ejs").renderFile); //Aqui a engine é definida como HTML
app.set("view engine", "html");

app.use("/", (req, res) => {
  res.render("index.html");
}); //Aqui é definido que quando o cliente acessar a raiz, será então chamada a view "index.html"

let messages = []; //Array responsável por armazenar todas as mensagens

io.on("connection", (socket) => {
  socket.emit("previousMessages", messages);

  socket.on("sendMessage", (data) => {
    messages.push(data);
    socket.broadcast.emit("receivedMessage", data);
  });
}); //Sempre que alguém conectar ao socket, a seguinte função é executada

server.listen(3000); //Aqui é definido para o servidor ficar ouvindo a porta 3000
