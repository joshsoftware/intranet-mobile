import {useCallback, useEffect, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

import {
  checkLocationPermission,
  LocationPermissionStatus,
  openLocationSettings,
  requestLocationPermission,
} from '../../utils/location';

export type LocationGate = 'loading' | 'required' | 'granted';

export const useLocationGate = (enabled: boolean) => {
  const [permissionStatus, setPermissionStatus] =
    useState<LocationPermissionStatus | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);

  const refresh = useCallback(async () => {
    if (!enabled) {
      setPermissionStatus(null);
      return;
    }

    const status = await checkLocationPermission();
    setPermissionStatus(status);
  }, [enabled]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const onAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === 'active') {
        refresh();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      onAppStateChange,
    );
    return () => subscription.remove();
  }, [enabled, refresh]);

  const requestPermission = useCallback(async () => {
    setIsRequesting(true);
    try {
      const status = await requestLocationPermission();
      setPermissionStatus(status);
      return status;
    } finally {
      setIsRequesting(false);
    }
  }, []);

  const openSettings = useCallback(async () => {
    await openLocationSettings();
  }, []);

  const gate: LocationGate = !enabled
    ? 'granted'
    : permissionStatus === null
      ? 'loading'
      : permissionStatus === 'granted'
        ? 'granted'
        : 'required';

  return {
    gate,
    permissionStatus,
    isRequesting,
    requestPermission,
    openSettings,
    refresh,
  };
};
