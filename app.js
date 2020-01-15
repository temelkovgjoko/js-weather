window.addEventListener("load", () => {
  let long;
  let lat;
  let tempreatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/86b3a7de133af7286e0b116f47013790/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          // Set Dom Elements from the API
          temperatureDegree.textContent = temperature;
          tempreatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // FORMULA FOR CELSIUS
          let celsius = (temperature - 32) * (5 / 9);
          // Set Icon
          setIcons(icon, document.querySelector(".icon"));

          // Change temeprature to C/F
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }
  function setIcons(icon, iconID) {
    const skyCons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skyCons.play();
    return skyCons.set(iconID, Skycons[currentIcon]);
  }
});
