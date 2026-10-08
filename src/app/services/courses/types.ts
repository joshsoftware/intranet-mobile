export type Course = {
  id: string | number;
  title: string;
  badge_text?: string;
  badgeText?: string;
  badgeBg?: string;
  badgeTextColor?: string;
  iconBg?: string;
  progress: number;
  progressColor?: string;
  due_date?: string;
  dueDate?: string;
  uploaded_date?: string;
  uploadedDate?: string;
  status: 'pending' | 'completed';
};

export type GetCoursesResponse = {
  status: string;
  message: string;
  data: Course[];
};
