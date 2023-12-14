// Récupérer le formulaire et la div
var cityForm = document.getElementById('cityForm');
var weatherInfoDiv = document.getElementById('weatherInfo');

// Fonction appelée lors de la soumission du formulaire
function handleSubmit(event) {
    // Empêcher la soumission automatique du formulaire
    event.preventDefault();

    // Récupérer la valeur du champ de saisie
    var cityInputValue = document.getElementById('cityInput').value;

    // Appeler la fonction pour obtenir les informations météorologiques
    getWeather(cityInputValue);
}

// Ajouter un écouteur d'événements sur le formulaire
cityForm.addEventListener('submit', handleSubmit);

// Fonction pour obtenir les informations météorologiques
function getWeather(city) {
    const apiKey = '986a28fd9dec4ee198290445231312'; // Remplacez par votre propre clé API
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            displayError(error);
        });
}

// Fonction pour afficher les informations météorologiques dans la div
function displayWeather(data) {
    const weatherInfo = document.getElementById("weatherInfo");
    weatherInfo.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p>Heure locale: ${data.location.localtime}</p>
        <p>${data.current.condition.text}</p>
        <p>Température : ${data.current.temp_c}°C</p>
        <p>Humidité : ${data.current.humidity}%</p>
    `;
}

// Fonction pour afficher les erreurs dans la div
function displayError(error) {
    // Afficher l'erreur de manière plus descriptive
    weatherInfoDiv.innerText = 'Erreur lors de la récupération des données météorologiques : ' + error.message;
}
