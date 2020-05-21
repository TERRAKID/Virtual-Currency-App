const baseUrl = window.location.protocol + "//" + window.location.host;
const btnLogout = document.querySelector('.btn--logout');

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
})
.catch(error => {
    console.log(error);
});

logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
}

btnLogout.addEventListener('click', () => {
    logout();
})