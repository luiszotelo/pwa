
export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          resolve({ latitud: latitude, longitud: longitude });
        },
        error => {
          reject(error);
        }
      );
    } else {
      reject(new Error('La geolocalización no es compatible con este navegador.'));
    }
  });
}
