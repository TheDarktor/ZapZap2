function openImageUploadModal() {
  m = document.querySelector("#uploadImageModal");
  uploadImageModal = new bootstrap.Modal(m);
  uploadImageModal.show();
}

function closeUploadImageModal() {
  document.querySelector("#uploadImageButton").value = "";
  uploadedImage = "";
}
