const container = document.querySelector('.container');
const signupButton = document.querySelector('.signupButton');
const loginButton = document.querySelector('.loginButton');

signupButton.addEventListener('click', () => {
    container.classList.add('active');
});

loginButton.addEventListener('click', () => {
    container.classList.remove('active');
});

// Send the login form to the backend (nginx forwards /api/* to the backend container)
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('loginMessage');
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: document.getElementById('loginUsername').value,
                password: document.getElementById('loginPassword').value
            })
        });
        const data = await res.json();
        msg.textContent = res.ok ? data.message : data.error;
        msg.style.color = res.ok ? 'green' : 'red';
    } catch (err) {
        msg.textContent = 'Cannot reach the backend';
        msg.style.color = 'red';
    }
});
