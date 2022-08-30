
const getIpAddress = async () => {
    let ip = document.getElementById("ip").value;
    let request = `https://geo.ipify.org/api/v2/country,city?apiKey=at_lyEpJjRAahG87s8BMrWadFehAGIyg&ipAddress=${ip || '8.8.8.8'}`;
    
    let response = await fetch(request);
    if (!response.ok) {
        throw Error(`There is an error with status ${response.status}`);
    }
    let ipAddress = await response.json();
    console.log(ipAddress);
    return ipAddress;
};

const displayIpAddress = async () => {
    const addressElement = document.getElementById("address");
    const locationElement = document.getElementById("location");
    const timezoneElement = document.getElementById("timezone");
    const ispElement = document.getElementById("isp");
    
    let ipResult = await getIpAddress();
    addressElement.innerText = ipResult.ip;
    console.log(`ip: ${ipResult.ip}`);
    let region = ipResult.location.region;
    console.log(`region: ${region}`);
    let country = ipResult.location.country;
    console.log(`country: ${country}`);
    locationElement.innerText = region + ", " + country;
    timezoneElement.innerText = ipResult.location.timezone;
    ispElement.innerText = ipResult.isp;

    // for map
    const lat = ipResult.location.lat;
    const lng = ipResult.location.lng;
    console.log(`lat: ${lat} and lng: ${lng}`);
    return [lat, lng];
}

let formBtn = document.querySelector(".submit-btn");
formBtn.addEventListener("click", displayIpAddress);

const form = document.querySelector("form");
form.addEventListener("keypress", function (e) {
 e.preventDefault();
  if (e.key === "Enter") {
    displayIpAddress();
  }
});


const displayMap = () => {
    const displayAddress = displayIpAddress();
    console.log(displayAddress);
//    displayIpAddress();

    const map = L.map('map').setView(displayAddress || [51.505, -0.09], 13);
    // const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker(displayAddress).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();

}

// const map = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// L.marker([51.505, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();

displayMap();