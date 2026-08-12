import AsyncStore from '../../services/asyncStorage';

const getTodayKey = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const storageKeyForUser = (userId: string) =>
  `${AsyncStore.DAILY_QUIZ_COMPLETED_KEY}:${userId}`;

export const hasCompletedDailyQuizToday = async (
  userId: string,
): Promise<boolean> => {
  const stored = await AsyncStore.getItem(storageKeyForUser(userId));
  return stored === getTodayKey();
};

export const markDailyQuizCompletedToday = async (
  userId: string,
): Promise<void> => {
  await AsyncStore.setItem(storageKeyForUser(userId), getTodayKey());
};
