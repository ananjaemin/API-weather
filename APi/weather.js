const COORDS = 'coords'
const apikey = 'dc8f14666440cbe2df4e89860aaf008f';
const wea = document.querySelector(".js-wea");

function getweather(lat, long) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}&units=metric`
    ).then(function(res) {
        return res.json();
    }).then(function(json) {
        console.log(json);
        const temp = json.main.temp;
        const temp2 = json.weather[0].main;
        const place = json.name;
        wea.innerText = `${temp2} / ${temp} / ${place}`;
    });
}

function savecoord(obj) {
    localStorage.setItem(COORDS, JSON.stringify(obj));
}

function handelsucces(position) {
    console.log("handle Geo Success!!");
    console.log(position.coords.latitude);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsobj = {
        latitude,
        longitude
    };
    savecoord(coordsobj);
    getweather(latitude, longitude)
}

function handleerror() {
    console.log("handle Geo Error!!!");
}

function askcall() {
    navigator.geolocation.getCurrentPosition(handelsucces, handleerror);

}

function loadcoords() {
    const loadCoords = localStorage.getItem(COORDS);
    if (loadCoords === null) {
        askcall();
    } else {
        const parseCoords = JSON.parse(loadCoords);
        console.log(parseCoords);
        getweather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadcoords();
}

init();