const baseUrl = process.env.url || 'http://localhost:3000';
const btnLogin = document.querySelector('.btn--login');
const alert = document.querySelector('.alert');
const alertText = document.querySelector('.alert__text');

btnLogin.addEventListener("click", () => {
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    fetch(baseUrl + '/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': email,
                'password': password
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.status === 'success') {
                let token = result.data.token;
                localStorage.setItem('token', token);
                window.location.href = '/';

            } else {
                alertText.textContent = `Whoops, something went wrong. We couldn't log you in.`;
                alert.classList.remove('hidden');
            }
        })
        .catch(error => {
            alertText.textContent = `Whoops, something went wrong. We couldn't log you in.`;
            alert.classList.remove('hidden');
        });
});