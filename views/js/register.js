const nameInput = document.getElementById('nameInput')
const emailInput = document.getElementById('emailInput')
const passwordInput = document.getElementById('passwordInput')
const registerBtn = document.getElementById('registerBtn')

//REGISTER USER
registerBtn.addEventListener('click', (e) => {
    e.preventDefault()
    fetch ('http://localhost:3000/register', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        })
    }).then((res) => {
        location.href=res.url
    }).catch((err) => {
        console.log(err)
    })
})


