import { useState, useEffect } from 'react';

interface LocationState {
  coordinates: [number, number]; // [lat, lng]
  accuracy: number | null;
  speed: number | null;
  heading: number | null;
  error: string | null;
  isLoading: boolean;
  gpsStatus: 'seeking' | 'locked' | 'error' | 'disabled';
}

// Default to Delhi Connaught Place
const DEFAULT_COORDINATES: [number, number] = [28.6304, 77.2177];

export const useLocation = () => {
  const [state, setState] = useState<LocationState>({
    coordinates: DEFAULT_COORDINATES,
    accuracy: null,
    speed: null,
    heading: null,
    error: null,
    isLoading: true,
    gpsStatus: 'seeking',
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: 'Geolocation is not supported by your browser.',
        isLoading: false,
        gpsStatus: 'disabled',
      }));
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy, speed, heading } = position.coords;
      setState({
        coordinates: [latitude, longitude],
        accuracy,
        speed: speed || 0,
        heading: heading || 0,
        error: null,
        isLoading: false,
        gpsStatus: 'locked',
      });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      let errorMsg = 'Unknown geolocation error.';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMsg = 'Location permission denied by user.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMsg = 'GPS location position unavailable.';
          break;
        case error.TIMEOUT:
          errorMsg = 'GPS position seeking timeout.';
          break;
      }

      setState((prev) => ({
        ...prev,
        error: errorMsg,
        isLoading: false,
        gpsStatus: error.code === error.PERMISSION_DENIED ? 'disabled' : 'error',
      }));
    };

    const watchId = navigator.geolocation.watchPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000,
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return state;
};

export default useLocation;
