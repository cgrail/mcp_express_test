const inputField = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
inputField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        sendRequest();
    }
});
const chatHistory = document.getElementById('chatHistory');
window.onload = function () {
    inputField.focus();
};

let requestInProcess = false;
async function sendRequest() {
    if (requestInProcess) {
        return;
    }
    setBusy(true);
    const question = inputField.value;
    inputField.value = "";
    const questionElement = document.createElement("div");
    questionElement.classList.add('chat-entry');
    questionElement.classList.add('user');
    questionElement.innerText = question;
    chatHistory.appendChild(questionElement);

    const answerElement = document.createElement("div");
    answerElement.classList.add('chat-entry');
    answerElement.classList.add('bot');
    answerElement.innerText = "Loading";
    chatHistory.appendChild(answerElement);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Scroll to the bottom

    try {
        const response = await fetch('/api/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: question })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        answerElement.innerText = result.content;
    } catch (error) {
        answerElement.innerText = 'Error: ' + error.message;
    } finally {
        setBusy(false);
        chatHistory.scrollTop = chatHistory.scrollHeight;
        inputField.focus();
    }
}
function setBusy(busy) {
    inputField.disabled = busy;
    sendButton.disabled = busy;
    if (busy) {
        sendButton.classList.add('disabled');
    } else {
        sendButton.classList.remove('disabled');
    }
    requestInProcess = busy;
}

