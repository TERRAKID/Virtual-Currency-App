const baseUrl="http://localhost:3000";fetch(baseUrl+"/api/v1/currency/transfers",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(e=>e.json()).then(e=>{}).catch(e=>{logout()}),logout=()=>{localStorage.removeItem("token"),window.location.href="/login"};