document.getElementById("wordForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const word = document.getElementById("word").value.trim();
    const voice = document.getElementById("voice").value;  // Capture the selected voice
    const sentence = document.getElementById("sentence").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    // Check if the word already exists
    fetch(`/check-word?word=${word}`)
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                errorMessage.style.display = "block"; // Show error if word exists
            } else {
                errorMessage.style.display = "none";

                // Submit data to server to save in CSV
                fetch('/save-word', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ word, voice, sentence })  // Include voice in the data sent
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Word, voice, and sentence saved successfully!");
                        document.getElementById("wordForm").reset();
                    }
                });
            }
        })
        .catch(error => console.error("Error:", error));
});