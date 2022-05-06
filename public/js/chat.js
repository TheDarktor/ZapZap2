var socket = io("http://localhost:3000");

function renderMessage(message) {
  if (message.image != "") {
    $(".messages").append(
      '<div class="message">' +
        message.author +
        "<strong></strong>: " +
        message.message +
        "<br>" +
        "<img src=" +
        message.image +
        " width='64px' height='64px'>" +
        "</div>"
    );
  } else {
    $(".messages").append(
      '<div class="message">' +
        message.author +
        "<strong></strong>: " +
        message.message +
        "</div>"
    );
  }
}

socket.on("previousMessages", function (messages) {
  for (message of messages) {
    renderMessage(message);
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

    renderMessage(messageObject);

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
