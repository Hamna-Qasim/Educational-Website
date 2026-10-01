const container = document.querySelector('.container');
const signupButton = document.querySelector('.signupButton');
const loginButton = document.querySelector('.loginButton');

signupButton.addEventListener('click', () => {
    container.classList.add('active');
});

loginButton.addEventListener('click', () => {
    container.classList.remove('active');
});

// ---- Talking to the backend (/api is forwarded to the API container by nginx) ----

function showMessage(el, text, ok) {
    el.textContent = text;
    el.style.color = ok ? '#1a7f37' : '#c62828';
}

async function postJSON(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const body = await res.json().catch(() => ({}));
    return { ok: res.ok, body };
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('loginMessage');
    try {
        const { ok, body } = await postJSON('/api/login', {
            username: document.getElementById('loginUsername').value,
            password: document.getElementById('loginPassword').value
        });
        if (!ok) return showMessage(msg, body.error || 'Login failed', false);
        localStorage.setItem('token', body.token);
        showMessage(msg, body.message, true);
        setTimeout(() => { window.location.href = 'landingpage.html'; }, 1000);
    } catch (err) {
        showMessage(msg, 'Cannot reach the server', false);
    }
});

document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('signupMessage');
    try {
        const { ok, body } = await postJSON('/api/signup', {
            email: document.getElementById('signupEmail').value,
            username: document.getElementById('signupUsername').value,
            password: document.getElementById('signupPassword').value
        });
        if (!ok) return showMessage(msg, body.error || 'Signup failed', false);
        showMessage(msg, body.message, true);
        e.target.reset();
        setTimeout(() => container.classList.remove('active'), 1200); // slide to the login form
    } catch (err) {
        showMessage(msg, 'Cannot reach the server', false);
    }
});
