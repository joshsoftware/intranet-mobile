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

let cachedCoordinates: Coordinates | null = null;
let prefetchPromise: Promise<Coordinates> | null = null;

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

const isGranted = (status: LocationPermissionStatus) => status === 'granted';

export const checkLocationPermission =
  async (): Promise<LocationPermissionStatus> => {
    const fineStatus = mapPermissionResult(await check(LOCATION_PERMISSION));
    if (isGranted(fineStatus)) {
      return 'granted';
    }

    if (Platform.OS === 'android') {
      const coarseStatus = mapPermissionResult(
        await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION),
      );
      if (isGranted(coarseStatus)) {
        return 'granted';
      }
      return coarseStatus === 'blocked' ? 'blocked' : fineStatus;
    }

    return fineStatus;
  };

export const requestLocationPermission =
  async (): Promise<LocationPermissionStatus> => {
    const fineStatus = mapPermissionResult(await request(LOCATION_PERMISSION));
    if (isGranted(fineStatus)) {
      return 'granted';
    }

    if (Platform.OS === 'android') {
      const coarseStatus = mapPermissionResult(
        await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION),
      );
      if (isGranted(coarseStatus)) {
        return 'granted';
      }
      return coarseStatus === 'blocked' ? 'blocked' : fineStatus;
    }

    return fineStatus;
  };

export const openLocationSettings = async () => {
  try {
    await openSettings();
  } catch {
    await Linking.openSettings();
  }
};

const rememberCoordinates = (coordinates: Coordinates) => {
  cachedCoordinates = coordinates;
  return coordinates;
};

const requestPosition = (
  enableHighAccuracy: boolean,
  timeout: number,
  maximumAge: number,
): Promise<Coordinates> => {
  const Geolocation = getGeolocation();

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position: {coords: {latitude: number; longitude: number}}) => {
        resolve(
          rememberCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        );
      },
      (error: unknown) => {
        reject(error);
      },
      {
        enableHighAccuracy,
        timeout,
        maximumAge,
      },
    );
  });
};

export const getCachedCoordinates = (): Coordinates | null => cachedCoordinates;

export const getCurrentCoordinates = async (): Promise<Coordinates> => {
  try {
    return await requestPosition(true, 12000, 60000);
  } catch {
    try {
      return await requestPosition(false, 12000, 300000);
    } catch (error) {
      if (cachedCoordinates) {
        return cachedCoordinates;
      }
      throw error;
    }
  }
};

export const prefetchCurrentCoordinates = (): Promise<Coordinates> => {
  if (!prefetchPromise) {
    prefetchPromise = getCurrentCoordinates().finally(() => {
      prefetchPromise = null;
    });
  }
  return prefetchPromise;
};
