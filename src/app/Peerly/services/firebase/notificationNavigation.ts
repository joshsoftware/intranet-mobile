import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

import {navigate, navigationRef} from '../../../navigation';
import AsyncStore from '../../../services/asyncStorage';
import {
  APPRECIATION_DETAILS_SCREEN,
  HOME_SCREEN,
} from '../../constants/screenNames';
import {loginPeerly} from '../api/login';
import {getAppreciationList} from '../home';
import PeerlyAsyncStore from '../peerlyAsyncStorage';

type NotificationData = Record<string, string | undefined> | undefined;

const NAV_READY_TIMEOUT_MS = 25000;
const NAV_POLL_MS = 200;
const AUTH_RETRY_MS = 300;
const AUTH_RETRY_COUNT = 20;

let isHandlingNotification = false;
let pendingNotificationData: NotificationData | undefined;

const waitForNavigationReady = (timeoutMs = NAV_READY_TIMEOUT_MS) =>
  new Promise<boolean>(resolve => {
    const startedAt = Date.now();

    const check = () => {
      if (navigationRef.current?.isReady()) {
        resolve(true);
        return;
      }

      if (Date.now() - startedAt >= timeoutMs) {
        resolve(false);
        return;
      }

      setTimeout(check, NAV_POLL_MS);
    };

    check();
  });

const waitForIntranetAuth = async () => {
  for (let attempt = 0; attempt < AUTH_RETRY_COUNT; attempt += 1) {
    const authToken = await AsyncStore.getItem(AsyncStore.AUTH_TOKEN_KEY);
    if (authToken) {
      return authToken;
    }
    await new Promise<void>(resolve => setTimeout(resolve, AUTH_RETRY_MS));
  }
  return null;
};

const routeExistsInState = (name: string) => {
  const state = navigationRef.current?.getRootState();
  if (!state?.routeNames) {
    return false;
  }
  return state.routeNames.includes(name);
};

const waitForAppreciationRoute = (timeoutMs = NAV_READY_TIMEOUT_MS) =>
  new Promise<boolean>(resolve => {
    const startedAt = Date.now();

    const check = () => {
      if (
        navigationRef.current?.isReady() &&
        routeExistsInState(APPRECIATION_DETAILS_SCREEN)
      ) {
        resolve(true);
        return;
      }

      if (Date.now() - startedAt >= timeoutMs) {
        resolve(false);
        return;
      }

      setTimeout(check, NAV_POLL_MS);
    };

    check();
  });

export const getAppreciationIdFromData = (data?: NotificationData) => {
  if (!data) {
    return null;
  }

  const rawId =
    data.appreciation_id ??
    data.appreciationId ??
    data.cardId ??
    data.card_id ??
    data.id;

  if (rawId == null || rawId === '') {
    return null;
  }

  const id = Number(rawId);
  return Number.isFinite(id) && id > 0 ? id : null;
};

export const normalizeNotificationData = (
  data?: NotificationData | {[key: string]: string | object},
): Record<string, string> | undefined => {
  if (!data) {
    return undefined;
  }

  return Object.entries(data).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      if (value == null) {
        return acc;
      }
      acc[key] = typeof value === 'string' ? value : String(value);
      return acc;
    },
    {},
  );
};

const ensurePeerlyAuth = async () => {
  const existingToken = await PeerlyAsyncStore.getItem(
    PeerlyAsyncStore.PEERLY_AUTH_TOKEN_KEY,
  );

  if (existingToken) {
    return true;
  }

  const response = await loginPeerly();
  const authToken = response?.data?.AuthToken;

  if (!authToken) {
    return false;
  }

  await PeerlyAsyncStore.setItem(
    PeerlyAsyncStore.PEERLY_AUTH_TOKEN_KEY,
    authToken,
  );
  return true;
};

const openAppreciationDetail = (cardId: number) => {
  // Screen can load by cardId alone — avoid blocking on a prefetch that can fail.
  navigate(APPRECIATION_DETAILS_SCREEN, {cardId});
};

const openLatestAppreciation = async () => {
  const response = await getAppreciationList({
    page: 1,
    page_size: 1,
    sort_order: 'desc',
  });
  const latest = response?.data?.appreciations?.[0];

  if (!latest?.id) {
    navigate(HOME_SCREEN);
    return;
  }

  navigate(APPRECIATION_DETAILS_SCREEN, {
    cardId: latest.id,
    appriciationList: [latest],
  });
};

export const handlePeerlyNotificationOpen = async (
  data?: NotificationData,
) => {
  // Keep latest tap if a previous open is still in progress (cold start races).
  pendingNotificationData = data ?? pendingNotificationData;

  if (isHandlingNotification) {
    return;
  }

  isHandlingNotification = true;

  try {
    const authToken = await waitForIntranetAuth();
    if (!authToken) {
      console.warn('Peerly notification open skipped: missing intranet auth');
      return;
    }

    const isNavReady = await waitForNavigationReady();
    if (!isNavReady) {
      console.warn('Peerly notification open skipped: navigation not ready');
      return;
    }

    const hasAppreciationRoute = await waitForAppreciationRoute();
    if (!hasAppreciationRoute) {
      console.warn(
        'Peerly notification open skipped: AppreciationDetail route unavailable',
      );
      return;
    }

    const hasPeerlyAuth = await ensurePeerlyAuth();
    if (!hasPeerlyAuth) {
      console.warn('Peerly notification open skipped: peerly auth failed');
      return;
    }

    const notificationData = pendingNotificationData;
    pendingNotificationData = undefined;

    const appreciationId = getAppreciationIdFromData(notificationData);

    if (appreciationId) {
      openAppreciationDetail(appreciationId);
      return;
    }

    // Older backend payloads may still be title/body only.
    await openLatestAppreciation();
  } catch (error) {
    console.warn('Failed to open Peerly notification target:', error);
    try {
      navigate(HOME_SCREEN);
    } catch {
      // no-op
    }
  } finally {
    isHandlingNotification = false;

    // Process a newer tap that arrived while we were handling the previous one.
    if (pendingNotificationData) {
      const queued = pendingNotificationData;
      pendingNotificationData = undefined;
      setTimeout(() => {
        handlePeerlyNotificationOpen(queued);
      }, 0);
    }
  }
};

export const handleRemoteMessageOpen = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage | null,
) => {
  if (!remoteMessage) {
    return;
  }

  await handlePeerlyNotificationOpen(
    normalizeNotificationData(remoteMessage.data),
  );
};
