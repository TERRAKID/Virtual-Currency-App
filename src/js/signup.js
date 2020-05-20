const baseUrl = window.location.protocol + "//" + window.location.host;
const subString = '@student.thomasmore.be';
const btnSignup = document.querySelector('.btn--signup');
const alert = document.querySelector('.alert');
const alertText = document.querySelector('.alert__text');

btnSignup.addEventListener("click", () => {
    let firstName = document.querySelector('#firstname').value;
    let lastName = document.querySelector('#lastname').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    if (email.endsWith(subString)) {
        fetch(baseUrl + '/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': email,
                    'firstname': firstName,
                    'lastname': lastName,
                    'amount': 100,
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
                    alertText.textContent = `Whoops, something went wrong. We couldn't create an account.`;
                    alert.classList.remove('hidden');
                }
            })
            .catch(error => {
                alertText.textContent = `Whoops, something went wrong. We couldn't create an account.`;
                alert.classList.remove('hidden');
            });
    } else {
        alertText.textContent = `Your mail should end with '@student.thomasmore.be'.`;
        alert.classList.remove('hidden');
    }
});