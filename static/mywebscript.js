document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('emotionForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const text = document.getElementById('text').value;
        
        try {
            const response = await fetch('/emotionDetector', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({ 'text': text })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                document.getElementById('error').innerText = errorData.error;
                document.getElementById('result').innerText = '';
            } else {
                const data = await response.json();
                document.getElementById('result').innerText = JSON.stringify(data, null, 2);
                document.getElementById('error').innerText = '';
            }
        } catch (error) {
            document.getElementById('error').innerText = 'An error occurred while processing your request.';
            document.getElementById('result').innerText = '';
        }
    });
});
