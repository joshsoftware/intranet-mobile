import React, {useCallback, useEffect, useState} from 'react';
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import OptionRow, {OptionVisualState} from './components/OptionRow';
import {MOCK_DAILY_QUIZ} from './mockData';
import {markDailyQuizCompletedToday} from './dailyQuizStorage';

import {JoshLogo, QuizIcon} from '../../constant/icons';
import colors from '../../constant/colors';
import fonts from '../../constant/fonts';
import UserContext from '../../context/user.context';

type Props = {
  onCompleted: () => void;
};

type Phase = 'answering' | 'submitted';

const QuestionOfTheDayScreen = ({onCompleted}: Props) => {
  const [userContextData] = React.useContext(UserContext);
  const quiz = MOCK_DAILY_QUIZ;

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('answering');

  const isSubmitted = phase === 'submitted';
  const isCorrect = isSubmitted && selectedOptionId === quiz.correctOptionId;

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => subscription.remove();
  }, []);

  const getOptionState = useCallback(
    (optionId: string): OptionVisualState => {
      if (!isSubmitted) {
        return selectedOptionId === optionId ? 'selected' : 'default';
      }
      if (optionId === quiz.correctOptionId) {
        return 'correct';
      }
      if (optionId === selectedOptionId) {
        return 'incorrect';
      }
      return 'muted';
    },
    [isSubmitted, quiz.correctOptionId, selectedOptionId],
  );

  const handleSubmit = () => {
    if (!selectedOptionId) {
      return;
    }
    setPhase('submitted');
  };

  const handleContinue = async () => {
    const userId = userContextData?.userData?.userId ?? 'anonymous';
    await markDailyQuizCompletedToday(userId);
    onCompleted();
  };

  const subtitle = !isSubmitted
    ? 'Answering is required before you can use the app today.'
    : isCorrect
      ? "Nice work. You're all set for today."
      : 'Answering is required before you can use the app today.';

  const canSubmit = Boolean(selectedOptionId) && !isSubmitted;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.hero}>
          <View style={styles.logoWrap}>
            <JoshLogo height={18} width={85} fill={colors.WHITE} />
          </View>
          <View style={styles.iconBadge}>
            <QuizIcon width={28} height={28} />
          </View>
          <Text style={styles.title}>Question of the Day</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <View style={styles.card}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.cardContent}>
            <Text style={styles.questionLabel}>QUESTION</Text>
            <Text style={styles.questionText}>{quiz.question}</Text>

            <View style={styles.options}>
              {quiz.options.map(option => (
                <OptionRow
                  key={option.id}
                  label={option.text}
                  state={getOptionState(option.id)}
                  disabled={isSubmitted}
                  onPress={() => setSelectedOptionId(option.id)}
                />
              ))}
            </View>

            {isSubmitted && (
              <View style={styles.feedback}>
                <View style={styles.feedbackTitleRow}>
                  <View
                    style={[
                      styles.feedbackIcon,
                      isCorrect
                        ? styles.feedbackIconCorrect
                        : styles.feedbackIconIncorrect,
                    ]}>
                    <Text style={styles.feedbackIconMark}>
                      {isCorrect ? '✓' : '✕'}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.feedbackTitle,
                      isCorrect
                        ? styles.feedbackTitleCorrect
                        : styles.feedbackTitleIncorrect,
                    ]}>
                    {isCorrect ? 'Correct answer' : 'Incorrect answer'}
                  </Text>
                </View>
                <Text style={styles.explanation}>{quiz.explanation}</Text>
              </View>
            )}
          </ScrollView>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          disabled={isSubmitted ? false : !canSubmit}
          onPress={isSubmitted ? handleContinue : handleSubmit}
          style={[
            styles.actionButton,
            !isSubmitted && !canSubmit && styles.actionButtonDisabled,
          ]}>
          <Text
            style={[
              styles.actionButtonText,
              !isSubmitted && !canSubmit && styles.actionButtonTextDisabled,
            ]}>
            {isSubmitted ? 'Continue' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    paddingTop: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  hero: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    gap: 8,
  },
  logoWrap: {
    marginBottom: 8,
  },
  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#5B8AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  title: {
    color: colors.WHITE,
    fontSize: 26,
    fontWeight: '700',
    fontFamily: fonts.ARIAL,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.WHITE,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    opacity: 0.95,
    paddingHorizontal: 12,
    fontFamily: fonts.ARIAL,
  },
  card: {
    backgroundColor: colors.WHITE,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 10,
    marginBottom: 16,
  },
  cardContent: {
    paddingBottom: 12,
    gap: 14,
  },
  questionLabel: {
    color: colors.PRIMARY,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontFamily: fonts.ARIAL,
  },
  questionText: {
    color: colors.SECONDARY,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '700',
    fontFamily: fonts.ARIAL,
    marginTop: -4,
  },
  options: {
    gap: 10,
    marginTop: 4,
  },
  feedback: {
    marginTop: 8,
    gap: 8,
  },
  feedbackTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  feedbackIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackIconCorrect: {
    backgroundColor: '#22C55E',
  },
  feedbackIconIncorrect: {
    backgroundColor: '#EF4444',
  },
  feedbackIconMark: {
    color: colors.WHITE,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 14,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: fonts.ARIAL,
  },
  feedbackTitleCorrect: {
    color: '#22C55E',
  },
  feedbackTitleIncorrect: {
    color: '#EF4444',
  },
  explanation: {
    color: colors.QUATERNARY_TEXT,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: fonts.ARIAL,
  },
  actionButton: {
    marginTop: 'auto',
    marginBottom: 20,
    backgroundColor: colors.WHITE,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonDisabled: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  actionButtonText: {
    color: colors.PRIMARY,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: fonts.POPPINS,
  },
  actionButtonTextDisabled: {
    color: colors.SECONDARY_TEXT,
  },
});

export default QuestionOfTheDayScreen;
