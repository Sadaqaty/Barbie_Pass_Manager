document.addEventListener("DOMContentLoaded", function () {
  const passwordList = document.getElementById("passwords");
  const addButton = document.getElementById("add-btn");
  const websiteInput = document.getElementById("website");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const toggleMusicButton = document.getElementById("toggle-music");
  const backgroundMusic = document.getElementById("background-music");

  // Load saved passwords from localStorage
  let savedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];

  function renderPasswords() {
    passwordList.innerHTML = "";
    savedPasswords.forEach((entry, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <span>${entry.website}: ${entry.username} - ${entry.password}</span>
                <button onclick="removePassword(${index})">Remove</button>
            `;
      passwordList.appendChild(li);
    });
  }

  function addPassword() {
    const website = websiteInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (website && username && password) {
      savedPasswords.push({ website, username, password });
      localStorage.setItem("passwords", JSON.stringify(savedPasswords));
      renderPasswords();
      websiteInput.value = "";
      usernameInput.value = "";
      passwordInput.value = "";
    } else {
      alert("Please fill in all fields");
    }
  }

  window.removePassword = function (index) {
    savedPasswords.splice(index, 1);
    localStorage.setItem("passwords", JSON.stringify(savedPasswords));
    renderPasswords();
  };

  addButton.addEventListener("click", addPassword);

  toggleMusicButton.addEventListener("click", function () {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      toggleMusicButton.textContent = "Turn Off Music";
    } else {
      backgroundMusic.pause();
      toggleMusicButton.textContent = "Turn On Music";
    }
  });

  // Initially render saved passwords
  renderPasswords();
});
