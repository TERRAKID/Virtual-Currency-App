const baseUrl="http://localhost:3000",subString="@student.thomasmore.be",btnSignup=document.querySelector(".btn--signup"),alert=document.querySelector(".alert"),alertText=document.querySelector(".alert__text");btnSignup.addEventListener("click",()=>{let e=document.querySelector("#firstname").value,t=document.querySelector("#lastname").value,n=document.querySelector("#email").value,o=document.querySelector("#password").value;n.endsWith(subString)?fetch(baseUrl+"/users/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,firstname:e,lastname:t,amount:100,password:o})}).then(e=>e.json()).then(e=>{if("success"===e.status){let t=e.data.token;localStorage.setItem("token",t),window.location.href="/"}else alertText.textContent="Whoops, something went wrong. We couldn't create an account.",alert.classList.remove("hidden")}).catch(e=>{alertText.textContent="Whoops, something went wrong. We couldn't create an account.",alert.classList.remove("hidden")}):(alertText.textContent="Your mail should end with '@student.thomasmore.be'.",alert.classList.remove("hidden"))});