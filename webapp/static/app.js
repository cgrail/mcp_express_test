const socket = new WebSocket(`ws://${location.host}`);

socket.onopen = function (event) {
    console.log('WebSocket is open now.');
};

socket.onmessage = function (event) {
    const message = JSON.parse(event.data);
    console.log('Message from server:', event.data);
    socket.send(JSON.stringify({
        correlationId: message.correlationId,
        data: handleMessage(message)
    }));
};

function handleMessage(message) {
    const messageData = JSON.parse(message.data);
    switch (messageData.action) {
        case "getButtons":
            return getButtons();
        case "pressButton":
            return pressButton(messageData.buttonId);
        default:
            return "Action not found" + action;
    }
}

socket.onclose = function (event) {
    console.log('WebSocket is closed now.');
};

socket.onerror = function (error) {
    alert('WebSocket error:', error);
};

function getButtons() {
    const buttons = document.querySelectorAll('#target-app button');
    return Array.from(buttons).map(button => `${button.id}: ${button.textContent}`).join(', ');
}

function pressButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.click();
        return `Button with ID ${buttonId} clicked`;
    } else {
        return `Button with ID '${buttonId}' not found.`;
    }
}

function showToast(message, textColor, backgroundColor) {
    // Show toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = backgroundColor;
    toast.style.color = textColor;
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '1000';
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2000);
}

function showSparkleEffect(button) {
    // Add sparkle effect
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.position = 'absolute';
    sparkle.style.top = `${button.offsetTop + button.offsetHeight / 2}px`;
    sparkle.style.left = `${button.offsetLeft + button.offsetWidth / 2}px`;
    sparkle.style.width = '20px';
    sparkle.style.height = '20px';
    sparkle.style.background = 'gold';
    sparkle.style.borderRadius = '50%';
    sparkle.style.animation = 'sparkle-animation 1s ease-out';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
}
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function () {
        showSparkleEffect(button);
        showToast(button.innerText + " clicked", button.style.color, button.style.backgroundColor);
    });
});