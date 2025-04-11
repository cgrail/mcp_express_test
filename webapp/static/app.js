const socket = new WebSocket(`ws://${location.host}`);

socket.onopen = function (event) {
    console.log('WebSocket is open now.');
};

socket.onmessage = function (event) {
    const message = JSON.parse(event.data);
    console.log('Message from server:', JSON.stringify(message));
};

socket.onclose = function (event) {
    console.log('WebSocket is closed now.');
};

socket.onerror = function (error) {
    alert('WebSocket error:', error);
};

function getButtons() {
    const buttons = document.querySelectorAll('#target-app button');
    return Array.from(buttons).map(button => button.id);
}

function pressButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.click();
    } else {
        alert(`Button with ID '${buttonId}' not found.`);
    }
}

// Add click handler for target-app buttons
document.querySelectorAll('#target-app button').forEach(button => {
    button.addEventListener('click', () => {
        const color = button.style.backgroundColor;
        alert(`You clicked the button with color: ${color}`);
    });
});