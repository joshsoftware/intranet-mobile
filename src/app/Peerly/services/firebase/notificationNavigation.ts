import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

import {navigate, navigationRef} from '../../../navigation';
import AsyncStore from '../../../services/asyncStorage';
import {
  APPRECIATION_DETAILS_SCREEN,
  HOME_SCREEN,
} from '../../constants/screenNames';
import {loginPeerly} from '../api/login';
import {getAppreciationById} from '../appreciationDetails';
import {getAppreciationList} from '../home';
import PeerlyAsyncStore from '../peerlyAsyncStorage';

type NotificationData = Record<string, string | undefined> | undefined;

const NAV_READY_TIMEOUT_MS = 20000;
const NAV_POLL_MS = 150;

let isHandlingNotification = false;

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

  return Object.entries(data).reduce<Record<string, string>>((acc, [key, value]) => {
    if (value == null) {
      return acc;
    }
    acc[key] = typeof value === 'string' ? value : String(value);
    return acc;
  }, {});
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

const openAppreciationDetail = async (cardId: number) => {
  const appreciation = await getAppreciationById(cardId);
  navigate(APPRECIATION_DETAILS_SCREEN, {
    cardId,
    appriciationList: [appreciation],
  });
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
  if (isHandlingNotification) {
    return;
  }

  isHandlingNotification = true;

  try {
    const authToken = await AsyncStore.getItem(AsyncStore.AUTH_TOKEN_KEY);
    if (!authToken) {
      return;
    }

    const isNavReady = await waitForNavigationReady();
    if (!isNavReady) {
      return;
    }

    const hasPeerlyAuth = await ensurePeerlyAuth();
    if (!hasPeerlyAuth) {
      return;
    }

    const appreciationId = getAppreciationIdFromData(data);

    if (appreciationId) {
      await openAppreciationDetail(appreciationId);
      return;
    }

    // Current Peerly backend sends title/body only (no data payload).
    // Fall back to the latest appreciation so the tap still lands in Peerly.
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
