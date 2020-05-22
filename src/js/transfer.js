const baseUrl = window.location.protocol + "//" + window.location.host;
let btnConfirm = document.querySelector('.btn--confirm');
const alert = document.querySelector('.alert');
const alertText = document.querySelector('.alert__text');
let users = [];

primus = Primus.connect(baseUrl, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
  });

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

    let to;

    if (users.find(x => x.label === document.querySelector('#to').value).label === document.querySelector('#to').value) {
        to = users.find(x => x.label === document.querySelector('#to').value).value;
    }

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
                primus.write({
                    "action": "showCurrency",
                    "data": result.data
                  });
                deductCurrency(to, amount, reason, message);
            } else {
                alertText.textContent = `Whoops, something went wrong. We were unable to transfer the coins.`;
                alert.classList.remove('hidden');
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

fetch(baseUrl + '/api/v1/currency/leaderboard', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
    }
})
.then(response => response.json())
.then(result => {
    result.data.currency.forEach(currency => {
        user = { label: currency.firstname + ' ' + currency.lastname, value: currency.username}
        users.push(user);
    });
})
.catch(error => {
    logout();
});
 
var input = document.getElementById("to");
 
autocomplete({
    input: input,
    minLength: 2,
    fetch: function(text, update) {
        text = text.toLowerCase();
        var suggestions = users.filter(n => n.label.toLowerCase().startsWith(text))
        update(suggestions);
    },
    onSelect: function(item) {
        input.value = item.label;
    },
    emptyMsg: "No user found",
});