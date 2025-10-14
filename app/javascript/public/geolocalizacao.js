if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      (error) => {
        console.error("Erro ao obter localização: ", error);
      }
    );
  } else {
    console.log("Geolocalização não é suportada pelo seu navegador.");
  }