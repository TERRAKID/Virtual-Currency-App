const baseUrl="http://localhost:3000",btnLogout=document.querySelector(".btn--logout");fetch(baseUrl+"/api/v1/currency/transfers",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(t=>t.json()).then(t=>{}).catch(t=>{logout()}),logout=()=>{localStorage.removeItem("token"),window.location.href="/login"},btnLogout.addEventListener("click",()=>{logout()});