export type QuizOption = {
  id: string;
  text: string;
};

export type DailyQuiz = {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
};

/** Mock question matching Figma copy. */
export const MOCK_DAILY_QUIZ: DailyQuiz = {
  id: 'casa-acronym',
  question: 'In a core banking system, what does the CASA acronym stand for?',
  options: [
    {id: '1', text: 'Cash And Savings Account'},
    {id: '2', text: 'Current Account Savings Account'},
    {id: '3', text: 'Credit And Settlement Authority'},
    {id: '4', text: 'Customer Account Service Agreement'},
  ],
  correctOptionId: '2',
  explanation:
    'CASA means Current Account and Savings Account deposits — a higher ratio lowers funding cost.',
};
