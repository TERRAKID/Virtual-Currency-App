const baseUrl = window.location.protocol + "//" + window.location.host;
const btnLogout = document.querySelector('.btn--logout');
let user;
let userId;
let placeNumber = 1;

primus = Primus.connect(baseUrl, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
  });

primus.on('data', (json) => {
    if (json.action === "showCurrency") {
        prependCurrency(json.data.currency);
        updateAmount(json.data.currency);
    }
})

fetch(baseUrl + '/api/v1/currency/current', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
    }
})
.then(response => {
    return response.json();
}).then(result => {
    document.querySelector(".card__name").innerHTML = result.data.user.firstname + ' ' + result.data.user.lastname;
    document.querySelector(".card__amount").innerHTML = result.data.user.amount;

    user = result.data.user.username;
    userId = result.data.user._id;
})
.catch(error => {
    console.log(error);
    logout();
});

fetch(baseUrl + '/api/v1/currency/transfers', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
    }
    }).then(result => {
    return result.json();
}).then(json => {
    json.data.currency.slice(0, 5).forEach(currency => {
        showCurrency(currency);
    });
}).catch(error => {
    console.log(error);
    logout();
});

fetchUser = (username, name) => {
    fetch(baseUrl + '/api/v1/currency/current/' + username, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => {
        return response.json();
    }).then(result => {
        let currentUsername = result.data.user.firstname + ' ' + result.data.user.lastname;
        name.innerHTML = currentUsername;
    })
    .catch(error => {
        logout();
    });
}

let showCurrency = (currency) => {
    let container = document.createElement("div");
    let img = document.createElement("img");
    let name = document.createElement("p");
    let reason = document.createElement("p");
    let amount = document.createElement("p");

    container.setAttribute("class", "history__transfer");
    img.setAttribute("src", "/images/profile.jpeg");
    img.setAttribute("alt", "Profile picture");
    img.setAttribute("class", "history__img");
    name.setAttribute("class", "history__name");
    reason.setAttribute("class", "history__reason");

    if (user !== currency.to) {
        amount.setAttribute("class", "history__amount history__amount--neg");
        amount.innerHTML = '-' + currency.amount;
        fetchUser(currency.to, name);
    } else {
        amount.setAttribute("class", "history__amount history__amount--pos");
        amount.innerHTML = '+'+ currency.amount;
        fetchUser(currency.from, name);
    }

    switch(currency.reason) {
        case 1:
            reason.innerHTML = 'Development help';
            break;
        case 2:
            reason.innerHTML = 'Design help';
            break;
        case 3:
            reason.innerHTML = 'Feedback';
            break;
        case 4:
            reason.innerHTML = 'Meeting deadlines';
            break;
        default:
            reason.innerHTML = 'Other';
    }

    container.append(img);
    container.append(name);
    container.append(reason);
    container.append(amount);

    document.querySelector(".history").append(container);
}

prependCurrency = (currency) => {
    let container = document.createElement("div");
    let img = document.createElement("img");
    let name = document.createElement("p");
    let reason = document.createElement("p");
    let amount = document.createElement("p");

    container.setAttribute("class", "history__transfer");
    img.setAttribute("src", "/images/profile.jpeg");
    img.setAttribute("alt", "Profile picture");
    img.setAttribute("class", "history__img");
    name.setAttribute("class", "history__name");
    reason.setAttribute("class", "history__reason");

    if (user !== currency.to) {
        amount.setAttribute("class", "history__amount history__amount--neg");
        amount.innerHTML = '-' + currency.amount;
        fetchUser(currency.to, name);
    } else {
        amount.setAttribute("class", "history__amount history__amount--pos");
        amount.innerHTML = '+'+ currency.amount;
        fetchUser(currency.from, name);
    }

    switch(currency.reason) {
        case 1:
            reason.innerHTML = 'Development help';
            break;
        case 2:
            reason.innerHTML = 'Design help';
            break;
        case 3:
            reason.innerHTML = 'Feedback';
            break;
        case 4:
            reason.innerHTML = 'Meeting deadlines';
            break;
        default:
            reason.innerHTML = 'Other';
    }

    container.append(img);
    container.append(name);
    container.append(reason);
    container.append(amount);

    document.querySelector(".history").prepend(container);
    let transferLength = document.querySelectorAll(".history__transfer").length;
    if (transferLength > 5) {
        document.querySelector(".history").removeChild(document.querySelector(".history").lastChild);
    }
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
        showRank(currency);
    });
})
.catch(error => {
    logout();
});

let showRank = (currency) => {
    if (currency._id === userId) {
        document.querySelector('.card__rank').innerHTML = placeNumber;
    }
    placeNumber++;
}

updateAmount = (currency) => {
    document.querySelector(".card__amount").innerHTML = parseInt(document.querySelector(".card__amount").innerHTML) + currency.amount;
}

logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
}

btnLogout.addEventListener('click', () => {
    logout();
})