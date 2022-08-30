
const getIpAddress = async () => {
    let ip = document.getElementById("ip").value;
    let request = `https://geo.ipify.org/api/v2/country,city?apiKey=at_lyEpJjRAahG87s8BMrWadFehAGIyg&ipAddress=${ip}`;

    let response = await fetch(request);
    if (!response.ok) {
        throw Error(`There is an error with status ${response.status}`);
    }
    let ipAddress = await response.json();
    return ipAddress;
};

const displayIpAddress = async () => {
    const addressElement = document.getElementById("address");
    const locationElement = document.getElementById("location");
    const timezoneElement = document.getElementById("timezone");
    const ispElement = document.getElementById("isp");

    let ipResult = await getIpAddress();
    addressElement.innerText = ipResult.ip
    let city = ipResult.location.city;
    let region = ipResult.location.region;
    let country = ipResult.location.country;
    locationElement.innerText = city + ", " + region + ", " + country;
    timezoneElement.innerText = ipResult.location.timezone;
    ispElement.innerText = ipResult.isp;

    // for map
    let lat = ipResult.location.lat;
    let lng = ipResult.location.lng;
    return [lat, lng];
}

const formBtn = document.querySelector(".submit-btn");
formBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    await displayMap();
});

const form = document.querySelector("form");
form.addEventListener("keypress", async function (e) {
    if (e.key === "Enter") {
    e.preventDefault();
    await displayMap();
  }
});


const displayMap = async () => {
    const displayAddress = await displayIpAddress();
    console.log(displayAddress);
    const example =  [51.505, -0.09];

    if (displayAddress) {
        let map = L.map('map').setView(displayAddress, 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker(displayAddress).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
    } else {
        let map = L.map('map').setView(example, 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker(example).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
    }
}

displayMap();
