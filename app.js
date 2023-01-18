const form = document.querySelector("form");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const span = document.querySelector("span");
const img = document.querySelector(".img");
const icon = document.querySelector(".icon");
const key = "MsIA4NXGLAGFvWO4xPounW2SYSRT0btz";


// Get the Weather
const getWeather = async (id) => {

  const base = "https://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;
  
  const get = await fetch(base + query);
  const data = await get.json();

  return data[0];
};

// Get the city
const getCity = async (city) => {
  
  const base = "https://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;
  
  const get = await fetch(base + query);
  const data = await get.json();
  
  return data[0];
};


// Submit The form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  getCity(form.city.value.trim())
  .then(e => {
      return getWeather(e.Key);
    })
    .then((e) => {
      h2.textContent = form.city.value.trim();
      h3.textContent = e.WeatherText;
      span.textContent = e.Temperature.Metric.Value;
      
      // Day or Night
      if(e.IsDayTime){
        img.setAttribute("src", "img/day.svg")
      } else if(!e.IsDayTime){
        img.setAttribute("src", "img/night.svg")
      };
      
      // The weather icon
      icon.setAttribute("src",`img/icons/${e.WeatherIcon}.svg`);
      form.reset();
  })
  .catch(err => {
      h2.textContent = ".......";
      h3.textContent = "NOT FOUND";
      span.textContent = "Not Valid";
      form.reset();
    });
    
})