const baseUrl = window.location.protocol + "//" + window.location.host;
let placeNumber = 1;

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
        showLeaderboard(currency);
    });
})
.catch(error => {
    logout();
});

let showLeaderboard = (currency) => {
    let container = document.createElement("div");
    let place = document.createElement("p");
    let img = document.createElement("img");
    let name = document.createElement("p");
    let amount = document.createElement("p");

    container.setAttribute("class", "leaderboard__person");
    place.setAttribute("class", "leaderboard__place");
    img.setAttribute("src", "/images/profile.jpeg");
    img.setAttribute("alt", "Profile picture");
    img.setAttribute("class", "leaderboard__img");
    name.setAttribute("class", "leaderboard__name");
    amount.setAttribute("class", "leaderboard__amount");

    place.innerHTML = placeNumber;
    name.innerHTML = currency.firstname + ' ' + currency.lastname;
    amount.innerHTML = currency.amount + ' coins';
    placeNumber++;

    container.append(place);
    container.append(img);
    container.append(name);
    container.append(amount);

    document.querySelector(".leaderboard").append(container);
}

logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
}