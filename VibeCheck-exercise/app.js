 const vibes = [
    {
        id: 'chill',
        image: 'images/chill.jpg',
        description: 'Feeling super chill, just vibing with the universe. No stress, just good energy. Maybe some lo-fi beats in the background.',
        title: 'Chill Vibe'
    },
    {
        id: 'hype',
        image: 'images/hype.jpg',
        description: 'The energy is high, we are ready to slay! Bring on the challenges, we are here for it. Main character energy activated.',
        title: 'Hype Vibe'
    },
    {
        id: 'cozy',
        image: 'images/cozy.jpg',
        description: 'Wrapped in a blanket, hot cocoa in hand, watching my comfort show. Pure cozy vibes, no cap. Self-care is key.',
        title: 'Cozy Vibe'
    },
    {
        id: 'confused',
        image: 'images/confused.jpg',
        description: 'Brain not braining. What is even happening right now? Send help, or at least a meme. This is giving very confused energy.',
        title: 'Confused Vibe'
    },
    {
        id: 'salty',
        image: 'images/salty.jpg',
        description: 'Someone just tested my patience. I am not okay, I am salty. The audacity! Periodt.',
        title: 'Salty Vibe'
    },
    {
        id: 'boujee',
        image: 'images/boujee.jpg',
        description: 'Living my best life, feeling expensive and luxurious. Champagne wishes and caviar dreams. We love to see it.',
        title: 'Boujee Vibe'
    }
 ];

function renderVibes(){
    let imageHtml="";
    vibes.forEach((vibe)=>{
        imageHtml+=`<div class="col-6 col-md-4 col-lg-2 mb-4">
                    <div class="card h-100 shadow-sm vibe-card" data-vibe-id="${vibe.id}" >
                                   <img src="VibeCheck-exercise/${vibe.image}" class="card-img-top" alt="${vibe.title}" width="100px">
                                    <div class="card-body text-center">
                                        <h5 class="card-title">${vibe.title}</h5>
                                    </div>
                    </div>
                    </div>
                    `;
    });
    document.getElementById('image-grid').innerHTML=imageHtml;
}
 

function displayVibe(vibeId) {
    const selectedVibe = vibes.find(vibe => vibe.id === vibeId);
    const vibeDisplay = document.getElementById('vibe-display');
    const vibeTitle = document.getElementById('vibe-title');
    const vibeDescription = document.getElementById('vibe-description');
    if (selectedVibe && vibeDisplay && vibeTitle && vibeDescription) {
        vibeTitle.textContent = selectedVibe.title;
        vibeDescription.textContent = selectedVibe.description;
        vibeDisplay.style.display = 'block';  
    }
 }

document.addEventListener('click', function(event) {
    const vibeCard = event.target.closest('.vibe-card');
    if (vibeCard) {
        const vibeId = vibeCard.dataset.vibeId;
        displayVibe(vibeId);
    }
 });



 const OPENWEATHER_API_KEY ="d7decc07f01daae46eeadbaa1c93e249"; // Replace with your actual 

 const OPENWEATHER_BASE_URL ='https://api.openweathermap.org/data/2.5/weather';
 
 

 async function fetchWeather(zipCode) {
    const weatherDisplay = document.getElementById('weather-display');
    if (!weatherDisplay) return;
    weatherDisplay.style.display = 'none';
    weatherDisplay.innerHTML = '';
    try {
       const url = `${OPENWEATHER_BASE_URL}?zip=${zipCode},us&appid=${OPENWEATHER_API_KEY}&units=imperial`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        renderWeather(data);
    } catch (error) {
        console.error('Fetch error:', error);
        weatherDisplay.style.display = 'block';
        weatherDisplay.innerHTML = `<p class="text-danger">Oops! Couldn't get the weather vibe. Check your zip code or API key. Error: ${error.message}
 </p>`;
    }
 }
 function renderWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    if (!weatherDisplay) return;
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const city = data.name;
    let vibeMessage = '';
    if (temp < 32) {
        vibeMessage = `It's giving arctic chill in ${city}. Bundle up, 
bestie!`;
    } else if (temp < 50) {
        vibeMessage = `Low-key chilly in ${city}. Grab a hoodie, no cap.`;
    } else if (temp < 70) {
        vibeMessage = `The weather in ${city} is pretty mid. Perfect for a 
cozy vibe.`;
    } else if (temp < 85) {
        vibeMessage = `It's a whole vibe in ${city}! Sun's out, good times 
ahead.`;
    } else {
        vibeMessage = `Sizzling hot in ${city}! Stay hydrated, fam.`;
    }
    weatherDisplay.innerHTML = `
        <h3>${city}</h3>
        <p class="lead">${temp}°F - ${description}</p>
        <p>${vibeMessage}</p>
    `;
    weatherDisplay.style.display = 'block';
 }
 
 const getWeatherBtn = document.getElementById('get-weather-btn');
 const zipCodeInput = document.getElementById('zip-code-input');
 if (getWeatherBtn && zipCodeInput) {
    getWeatherBtn.addEventListener('click', () => {
        const zipCode = zipCodeInput.value.trim();
        if (zipCode) {
            fetchWeather(zipCode);
        } else {
            alert('Please enter a valid US Zip Code!');
        }
    });
    zipCodeInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            getWeatherBtn.click();
        }
    });
 }
 renderVibes(); 