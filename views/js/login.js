const emailInput = document.getElementById('emailInput')
const passwordInput = document.getElementById('passwordInput')
const loginBtn = document.getElementById('loginBtn')

loginBtn.addEventListener('click', (e) => {
    e.preventDefault()
    fetch ('http://localhost:3000/login', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value
        })
    }).then((res) => {
        location.href=res.url
    }).then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log(err)
    })
})