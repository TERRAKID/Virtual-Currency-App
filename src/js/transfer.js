const baseUrl = window.location.protocol + "//" + window.location.host;
let btnConfirm = document.querySelector('.btn--confirm');

fetch(baseUrl + '/api/v1/currency/transfers', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(result => {})
    .catch(error => {
        logout();
    });

logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
}

btnConfirm.addEventListener('click', () => {
    let to = document.querySelector('#to').value;
    let amount = document.querySelector('#amount').value;
    let reason = document.querySelector('#reason').value;
    let message = document.querySelector('#message').value;

    fetch(baseUrl + '/api/v1/currency/transfers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                'to': to,
                'amount': amount,
                'reason': reason,
                'message': message
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.status === 'success') {
                deductCurrency(to, amount, reason, message);
            }
        })
        .catch(error => {
            logout();
        });
})

addCurrency = (to, amount, reason, message) => {
    fetch(baseUrl + '/api/v1/currency/addcurrency', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                'to': to,
                'amount': amount
            })
        })
        .then(response => response.json())
        .then(result => {
            window.location.href = '/'
        })
        .catch(error => {
            logout();
        });
}

deductCurrency = (to, amount, reason, message) => {
    fetch(baseUrl + '/api/v1/currency/deductcurrency', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                'amount': amount
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.status === 'success') {
                addCurrency(to, amount, reason, message);
            }
        })
        .catch(error => {
            logout();
        });
}