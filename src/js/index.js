const baseUrl = process.env.url || 'http://localhost:3000';
const btnLogout = document.querySelector('.btn--logout');

fetch(baseUrl + '/api/v1/currency/transfers', {
    headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
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

btnLogout.addEventListener('click', () => {
    logout();
})