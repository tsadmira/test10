const elements = {
    searchForm: document.querySelector('.js-search-form'),
    list: document.querySelector('.js-list'),
    
}
elements.searchForm.addEventListener('submit', handlerSearch);

function handlerSearch(evt) {
    evt.preventDefault();
    
    const { city, days } = evt.currentTarget.elements;

    serviceWeather(city.value, days.value)
        .then(data => elements.list.innerHTML = createMarkup(data.forecast.forecastday))
        .catch(err => console.error(err))
        .finally(() => evt.target.reset())
}

function serviceWeather(city, days) { 
    const BASE_URL = 'https://api.weatherapi.com/v1';
    const END_POINT = '/forecast.json';
    const API_KEY = '24d0d47e36e14b9b9f9124454242102';

    const params = new URLSearchParams({
        key: API_KEY,
        q: city,
        days: days,
        lang: 'uk'
    })
    return fetch(`${BASE_URL}${END_POINT}?${params}`)
        .then(resp => {

            if (!resp.ok) {
            throw new Error(resp.statusText);
            }

            return resp.json()
    })
}
function createMarkup(arr) {
    return arr.map(({ date, day: { avgtemp_c, condition: { icon, text } } }) => `<li>
            <img src="${icon}" alt="${text}">
            <h2>${date}</h2>
            <h3>${text}</h3>
            <h3>${avgtemp_c} </h3>
        </li>`)
        .join('');
}