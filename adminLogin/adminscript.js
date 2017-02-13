let text = document.getElementsByTagName('p')
    , settings = document.getElementsByClassName('settings')
    , loggedOut = document.getElementsByClassName('loggedOut')
    , updateButton = document.getElementsByClassName('updateButton')
    , usernameInput = document.getElementById('usernameInput')
    , passwordInput = document.getElementById('passwordInput')
    , loginButton = document.getElementById('loginButton');
if (localStorage.adminInput != undefined) {
    text[0].innerHTML = localStorage.adminInput;
}
loginButton.addEventListener('click', () => {
    if (usernameInput.value == "admin" && passwordInput.value == "password") {
        settingsOn();
    }
});

function settingsOn() {
    showAdminSettings();
    for (let i = 0; i < settings.length; i++) {
        settings[i].value = text[i].innerHTML;
        updateButton[i].addEventListener('click', () => {
            text[i].innerHTML = settings[i].value;
            localStorage.setItem('adminInput', settings[i].value)
        });
    }
}

function showAdminSettings() {
    for (let i = 0; i < loggedOut.length; i++) {
        loggedOut[i].classList.toggle('loggedIn');
    }
}
document.getElementById('resetDataButton').addEventListener('click', () => {
    localStorage.removeItem('adminInput');
    location.reload();
});