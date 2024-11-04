document.getElementById("wordForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const word = document.getElementById("word").value.trim();
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
                    body: JSON.stringify({ word, sentence })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Word and sentence saved successfully!");
                        document.getElementById("wordForm").reset();
                    }
                });
            }
        });
});
