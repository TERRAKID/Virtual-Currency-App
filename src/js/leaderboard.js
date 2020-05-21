const baseUrl = window.location.protocol + "//" + window.location.host;

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