const pollutionScale = [
    {
      scale: [0, 50],
      quality: "Good",
      src: "happy",
      background: "linear-gradient(to right, #45B649, #DCE35B)",
    },
    {
      scale: [51, 100],
      quality: "Moderate",
      src: "thinking",
      background: "linear-gradient(to right, #F3F9A7, #CAC531)",
    },
    {
      scale: [101, 150],
      quality: "Unhealthy",
      src: "unhealthy",
      background: "linear-gradient(to right, #F16529, #E44D26)",
    },
    {
      scale: [151, 200],
      quality: "Bad",
      src: "bad",
      background: "linear-gradient(to right, #ef473a, #cb2d3e)",
    },
    {
      scale: [201, 300],
      quality: "Very bad",
      src: "mask",
      background: "linear-gradient(to right, #8E54E9, #4776E6)",
    },
    {
      scale: [301, 500],
      quality: "Terrible",
      src: "terrible",
      background: "linear-gradient(to right, #7a2828, #a73737)",
    },
  ];

  const loader = document.querySelector(".loader");
  const emojiLogo = document.querySelector(".emoji-logo");
  const userInformation = document.querySelector(".user-information");

  async function getPollutionData() {
    try {
        const response = await fetch("http://api.airvisual.com/v2/nearest_city?key=8efa5bd4-66d9-49a5-af97-3ddc5dc77e58").
        catch(error => {
          throw new Error(error); 
        })
        if(!response.ok){
          throw new Error(`Error ${response.status}, ${response.statusText}`) 
        }
        else {
          const responseData = await response.json();
          const aqi = responseData.data.current.pollution.aqius;
          console.log(responseData);
          const sortedData = {
          city: responseData.data.city,
          aqi,
          ...pollutionScale.find(obj => aqi >= obj.scale[0] && aqi <= obj.scale[1])
        }

        populateUI(sortedData);
        } 
    }
    catch(error){
      loader.classList.remove("active");
      emojiLogo.src = "./img/browser.svg";
      userInformation.textContent = error.message;
    }
  }

  getPollutionData();

  const backgroundLayer = document.querySelector(".background-layer");
  const cityName = document.querySelector(".city-name");
  const pollutionInfo = document.querySelector(".pollution-info");
  const pollutionValue = document.querySelector(".pollution-value");

  function populateUI(data) {
    emojiLogo.src = `./img/${data.src}.svg`;
    userInformation.textContent = `Here is the ${data.city} situation`;
    cityName.textContent = `${data.city}`;
    pollutionInfo.textContent = data.quality;
    pollutionValue.textContent = data.aqi;
    backgroundLayer.style.backgroundImage = data.background;
    loader.classList.remove("active");
    pointerPlacement(data.aqi);
  }
  const locationPointer = document.querySelector(".location-pointer");

  function pointerPlacement(AQIValue) {
    const parentWidth = locationPointer.parentElement.scrollWidth;
    // console.log(parentWidth);
    // console.log(AQIValue / 500);
    console.log(AQIValue / 500 * parentWidth);
    locationPointer.style.transform = `translateX(${AQIValue / 500 * parentWidth}px) rotate(180deg)`;
  }

  