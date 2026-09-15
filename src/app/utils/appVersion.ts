import {BUNDLE_ID} from '../constant';

export const isProdIntranetBundle = (bundleId: string) =>
  bundleId.toLowerCase() === BUNDLE_ID.toLowerCase();

export const isVersionGreater = (
  storeVersion: string,
  localVersion: string,
): boolean => {
  if (!storeVersion || !localVersion) {
    return false;
  }
  const storeParts = storeVersion.split('.').map(Number);
  const localParts = localVersion.split('.').map(Number);
  for (let i = 0; i < Math.max(storeParts.length, localParts.length); i++) {
    const storeVal = storeParts[i] || 0;
    const localVal = localParts[i] || 0;
    if (storeVal > localVal) {
      return true;
    }
    if (storeVal < localVal) {
      return false;
    }
  }
  return false;
};
