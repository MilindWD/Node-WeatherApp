
const form = document.querySelector('form');
const search = document.querySelector('input');
const forecast = document.querySelector('#forecast');
const error = document.querySelector('#error');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then( (response) => {
        response.json().then((data) => {
            if(data.error){
                forecast.textContent = '';
                error.textContent = data.error;
            } else {
                error.textContent = '';
                forecast.textContent = `${data.forecast} in ${data.location}`;
            }
        });
    });
});

