var socket = io("http://localhost:3000");

function renderMessage(message, authorname) {
  if (message.author == authorname) {
    if (message.image != "") {
      $(".chat-messages").append(
        '<div class="speech half-l">' +
          "<h6><strong>" +
          message.author +
          "</strong></h6>" +
          message.message +
          "<br><br>" +
          "<img src=" +
          message.image +
          " width='auto' height='64px'>" +
          "</div>"
      );
    } else {
      $(".chat-messages").append(
        '<div class="speech half-l">' +
          "<h6><strong>" +
          message.author +
          "</strong></h6>" +
          message.message +
          "</div>"
      );
    }
  } else {
    if (message.image != "") {
      $(".chat-messages").append(
        '<div class="speech half-r" style="margin-left:50%">' +
          "<h6><strong>" +
          message.author +
          "</strong></h6>" +
          message.message +
          "<br><br>" +
          "<img src=" +
          message.image +
          " width='auto' height='64px'>" +
          "</div>"
      );
    } else {
      $(".chat-messages").append(
        '<div class="speech half-r" style="margin-left:50%">' +
          "<h6><strong>" +
          message.author +
          "</strong></h6>" +
          message.message +
          "</div>"
      );
    }
  }

  let chatMessages = document.querySelector(".chat-messages");
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

socket.on("previousMessages", function (messages) {
  for (message of messages) {
    var actualAuthor = $("input[name=username]").val();
    renderMessage(message, actualAuthor);
  }
});

socket.on("receivedMessage", function (message) {
  renderMessage(message);
});

$("#chat").submit(function (event) {
  event.preventDefault();

  var author = $("input[name=username]").val();
  var message = $("input[name=message]").val();

  if (author.length && (message.length || uploadedImage.length)) {
    var messageObject = {
      author: author,
      message: message,
      image: uploadedImage,
    };

    renderMessage(messageObject, author);

    socket.emit("sendMessage", messageObject);

    uploadedImage = "";
    imageInput.value = "";
    document.querySelector("#messageInput").value = "";
    document.querySelector("#uploadImageButton").value = "";
  }
});

const imageInput = document.querySelector("#uploadImageButton");
var uploadedImage = "";

imageInput.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploadedImage = reader.result;
    uploadImageModal.hide();
  });
  reader.readAsDataURL(this.files[0]);
});

usernameInput = document.getElementById("userInput");
usernameInputTimeout = null;

usernameInput.addEventListener("keyup", function () {
  clearTimeout(usernameInputTimeout);
  usernameInputTimeout = setTimeout(function () {
    $(".chat-messages").empty();
    socket.emit("returnUpdatedMessages", true);
  }, 1000);
});
