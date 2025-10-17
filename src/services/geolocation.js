// This file provides functions to interact with the browser's Geolocation API.
// Note: This API only works in a secure context (HTTPS) or localhost.
// Browser will prompt user for permission.

export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          });
        },
        (error) => {
          let errorMessage;
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Permission denied to access location.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "The request to get user location timed out.";
              break;
            default:
              errorMessage = "An unknown error occurred.";
              break;
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

// You can add other functions here, like watchPosition for real-time tracking
// For a physical task tracker, this would be a great way to check if a user is
// near a specific location.