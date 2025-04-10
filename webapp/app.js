window.onload = function () {
    document.getElementById('llmInput').focus();
};
const inputField = document.getElementById('llmInput');
const submitButton = document.querySelector('button[type="submit"]');
const loadingIndicator = document.getElementById('loadingIndicator');
const responseArea = document.getElementById('responseArea');
responseArea.style.display = 'none'; // Hide response area initially

async function sendRequest() {
    responseArea.innerHTML = '';
    setBusy(true);

    try {
        const response = await fetch('/api/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: inputField.value })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        responseArea.innerHTML = result.content;
        if (result.content.trim()) {
            responseArea.style.display = 'block'; // Show response area if content exists
        }
    } catch (error) {
        responseArea.textContent = 'Error: ' + error.message;
        responseArea.style.display = 'block'; // Show response area for error messages
    } finally {
        setBusy(false);
    }
}
function setBusy(busy) {
    loadingIndicator.style.display = busy ? 'block' : 'none';
    inputField.disabled = busy;
    submitButton.disabled = busy;
}

// Add click handler for target-app buttons
document.querySelectorAll('#target-app button').forEach(button => {
    button.addEventListener('click', () => {
        const color = button.style.backgroundColor;
        alert(`You clicked the button with color: ${color}`);
    });
});