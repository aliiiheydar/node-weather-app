const weatherForm = document.querySelector('form')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''

    fetch(`/weather?address=${e.target.elements.address.value}`).then((res) => {
        res.json().then((data) => {
            if (data.error) return msgOne.textContent = data.error
            e.target.elements.address.value = ''
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast
        })
    })  
})