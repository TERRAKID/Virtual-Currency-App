const baseUrl=window.location.protocol+"//"+window.location.host,btnLogout=document.querySelector(".btn--logout");let user;primus=Primus.connect(baseUrl,{reconnect:{max:1/0,min:500,retries:10}}),primus.on("data",e=>{"showCurrency"===e.action&&(prependCurrency(e.data.currency),updateAmount(e.data.currency))}),fetch(baseUrl+"/api/v1/currency/current",{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}}).then(e=>e.json()).then(e=>{document.querySelector(".card__name").innerHTML=e.data.user.firstname+" "+e.data.user.lastname,document.querySelector(".card__amount").innerHTML=e.data.user.amount,user=e.data.user.username}).catch(e=>{console.log(e),logout()}),fetch(baseUrl+"/api/v1/currency/transfers",{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}}).then(e=>e.json()).then(e=>{e.data.currency.forEach(e=>{showCurrency(e)})}).catch(e=>{console.log(e),logout()}),fetchUser=(e,t)=>{fetch(baseUrl+"/api/v1/currency/current/"+e,{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}}).then(e=>e.json()).then(e=>{let r=e.data.user.firstname+" "+e.data.user.lastname;t.innerHTML=r}).catch(e=>{logout()})};let showCurrency=e=>{let t=document.createElement("div"),r=document.createElement("img"),n=document.createElement("p"),a=document.createElement("p"),o=document.createElement("p");switch(t.setAttribute("class","history__transfer"),r.setAttribute("src","/images/profile.jpeg"),r.setAttribute("alt","Profile picture"),r.setAttribute("class","history__img"),n.setAttribute("class","history__name"),a.setAttribute("class","history__reason"),user!==e.to?(o.setAttribute("class","history__amount history__amount--neg"),o.innerHTML="-"+e.amount,fetchUser(e.to,n)):(o.setAttribute("class","history__amount history__amount--pos"),o.innerHTML="+"+e.amount,fetchUser(e.from,n)),e.reason){case 1:a.innerHTML="Development help";break;case 2:a.innerHTML="Design help";break;case 3:a.innerHTML="Feedback";break;case 4:a.innerHTML="Meeting deadlines";break;default:a.innerHTML="Other"}t.append(r),t.append(n),t.append(a),t.append(o),document.querySelector(".history").append(t)};prependCurrency=e=>{let t=document.createElement("div"),r=document.createElement("img"),n=document.createElement("p"),a=document.createElement("p"),o=document.createElement("p");switch(t.setAttribute("class","history__transfer"),r.setAttribute("src","/images/profile.jpeg"),r.setAttribute("alt","Profile picture"),r.setAttribute("class","history__img"),n.setAttribute("class","history__name"),a.setAttribute("class","history__reason"),user!==e.to?(o.setAttribute("class","history__amount history__amount--neg"),o.innerHTML="-"+e.amount,fetchUser(e.to,n)):(o.setAttribute("class","history__amount history__amount--pos"),o.innerHTML="+"+e.amount,fetchUser(e.from,n)),e.reason){case 1:a.innerHTML="Development help";break;case 2:a.innerHTML="Design help";break;case 3:a.innerHTML="Feedback";break;case 4:a.innerHTML="Meeting deadlines";break;default:a.innerHTML="Other"}t.append(r),t.append(n),t.append(a),t.append(o),document.querySelector(".history").prepend(t)},updateAmount=e=>{document.querySelector(".card__amount").innerHTML=parseInt(document.querySelector(".card__amount").innerHTML)+e.amount},logout=()=>{localStorage.removeItem("token"),window.location.href="/login"},btnLogout.addEventListener("click",()=>{logout()});