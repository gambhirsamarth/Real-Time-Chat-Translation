document.addEventListener("DOMContentLoaded", function () {
    const chat = document.getElementById("chat");
    const messageInput = document.getElementById("message-input");
    const senderButton = document.getElementById("sender-button");
    const receiverButton = document.getElementById("receiver-button");
    const translateButton = document.getElementById("translate-button");
    const languageSelect = document.getElementById("language-select");

    senderButton.addEventListener("click", function () {
        sendMessage("Sender");
    });

    receiverButton.addEventListener("click", function () {
        sendMessage("Receiver");
    });

    translateButton.addEventListener("click", function () {
        const selectedLanguage = languageSelect.value;
        translateMessages(selectedLanguage);
    });

    async function translateMessages(targetLanguage) {
        const messages = Array.from(document.querySelectorAll(".message"));
        const textToTranslate = messages.map(message => message.textContent);

        const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
        const translatedMessages = [];

        for (let i = 0; i < messages.length; i++) {
            const encodedParams = new URLSearchParams();
            encodedParams.set('q', textToTranslate[i]);
            encodedParams.set('target', targetLanguage);
            encodedParams.set('source', 'en');

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept-Encoding': 'application/gzip',
                    'X-RapidAPI-Key': 'bb97bb9ae8msh043d17a51ff020bp13a3fcjsnd69bfc6f06d1',
                    'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
                },
                body: encodedParams
            };

            try {
                const response = await fetch(url, options);
                const data = await response.json();

                if (data && data.data && data.data.translations) {
                    const translation = data.data.translations[0].translatedText;
                    translatedMessages.push(translation);
                }
            } catch (error) {
                console.error("Translation failed:", error);
            }
        }

        messages.forEach((message, index) => {
            message.textContent = translatedMessages[index];
        });
    }

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
});
