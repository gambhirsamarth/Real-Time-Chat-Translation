document.addEventListener("DOMContentLoaded", function () {
    const chat = document.getElementById("chat");
    const messageInput = document.getElementById("message-input");
    const senderButton = document.getElementById("sender-button");
    const receiverButton = document.getElementById("receiver-button");
    const translateButton = document.getElementById("translate-button");

    senderButton.addEventListener("click", function () {
        sendMessage("Sender");
    });

    receiverButton.addEventListener("click", function () {
        sendMessage("Receiver");
    });

    translateButton.addEventListener("click", function () {
        translateMessage(messageInput.value);
    });

    function sendMessage(sender) {
        const messageText = messageInput.value.trim();
        if (messageText !== "") {
            appendMessage(messageText, sender.toLowerCase());
            messageInput.value = "";
        }
    }

    function appendMessage(text, senderClass) {
        const message = document.createElement("div");
        message.classList.add("message", senderClass);
        message.textContent = text;
        chat.appendChild(message);
        chat.scrollTop = chat.scrollHeight;
    }

    function translateMessage(text) {
        // Placeholder translation function (replace with your actual translation logic)
        alert("Translation functionality will be added here.");
    }
});
