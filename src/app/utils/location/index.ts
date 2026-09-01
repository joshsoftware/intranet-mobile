import {Linking, Platform} from 'react-native';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';

export type LocationPermissionStatus =
  | 'granted'
  | 'denied'
  | 'blocked'
  | 'unavailable';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

const LOCATION_PERMISSION = Platform.select({
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  default: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
});

const mapPermissionResult = (
  result: string,
): LocationPermissionStatus => {
  switch (result) {
    case RESULTS.GRANTED:
    case RESULTS.LIMITED:
      return 'granted';
    case RESULTS.BLOCKED:
      return 'blocked';
    case RESULTS.UNAVAILABLE:
      return 'unavailable';
    case RESULTS.DENIED:
    default:
      return 'denied';
  }
};

const getGeolocation = () => {
  // Lazy require so a missing native binary fails only when GPS is used,
  // not at app startup import time.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Geolocation =
    require('@react-native-community/geolocation').default;

  Geolocation.setRNConfiguration({
    skipPermissionRequests: true,
    authorizationLevel: 'whenInUse',
    locationProvider: 'auto',
  });

  return Geolocation;
};

export const checkLocationPermission =
  async (): Promise<LocationPermissionStatus> => {
    const result = await check(LOCATION_PERMISSION);
    return mapPermissionResult(result);
  };

export const requestLocationPermission =
  async (): Promise<LocationPermissionStatus> => {
    const result = await request(LOCATION_PERMISSION);
    return mapPermissionResult(result);
  };

export const openLocationSettings = async () => {
  try {
    await openSettings();
  } catch {
    await Linking.openSettings();
  }
};

export const getCurrentCoordinates = (): Promise<Coordinates> => {
  const Geolocation = getGeolocation();

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position: {
        coords: {latitude: number; longitude: number};
      }) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error: unknown) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  });
};
