const container = document.querySelector('.container');
const signupButton = document.querySelector('.signupButton');
const loginButton = document.querySelector('.loginButton');

signupButton.addEventListener('click', () => {
    container.classList.add('active');
});

loginButton.addEventListener('click', () => {
    container.classList.remove('active');
});