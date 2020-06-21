const weather = document.querySelector(".js-weather");

const API_KEY = "f3bb79c814e5ec573d8193f49aaef20d";
const COORDS = 'coords';

//존나 중요 
// 어떻게 Javascript 를 이용해서 특정 URL을 호출하는지??
// Javascript는 웹사이트로 Request를 보내고 응답을 통해서 데이터를 얻을 수 있다. 
// 가져온 데이터를 Refresh 없어도 나의 웹사이트에 적용 시킬 수 있다. 
// 데이터를 얻는 방법은 간단 : fetch 를 사용하면 된다. 


//then 은 함수를 하나 호출할건데 언제 할것이냐?
//데이터가 우리에게 넘어왔을때!!
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).
        then(function (response) {
            return response.json();
        }).then(function (json) {
            const temperature = json.main.temp;
            const place = json.name;
            const humidity = json.main.humidity;
            weather.innerText = `${temperature}℃ @ ${place}, 습도 : ${humidity}`;

        });
}

//

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("GEOLocation에 접근하지 못했습니다.");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }

}

function init() {
    loadCoords();
}

init();