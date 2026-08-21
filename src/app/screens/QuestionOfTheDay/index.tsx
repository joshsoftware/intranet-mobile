import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import OptionRow, {OptionVisualState} from './components/OptionRow';
import {useSubmitAnswer} from './questionOfTheDay.hooks';
import {mapApiOptions} from './utils/mapQuestionResponse';

import {JoshLogo, QuizIcon} from '../../constant/icons';
import colors from '../../constant/colors';
import fonts from '../../constant/fonts';
import {
  QuestionOption,
  SubmitAnswerData,
  TodayQuestionData,
} from '../../services/fintechQuestions/types';

type Props = {
  question: TodayQuestionData;
  onCompleted: () => void;
};

type Phase = 'answering' | 'submitted';

const QuestionOfTheDayScreen = ({question, onCompleted}: Props) => {
  const options = useMemo(() => mapApiOptions(question), [question]);

  const [selectedOptionId, setSelectedOptionId] =
    useState<QuestionOption | null>(null);
  const [phase, setPhase] = useState<Phase>('answering');
  const [submitResult, setSubmitResult] = useState<SubmitAnswerData | null>(
    null,
  );

  const {mutate: submit, isPending: isSubmitting} = useSubmitAnswer(onCompleted);

  const isSubmitted = phase === 'submitted';
  const isCorrect = submitResult?.is_correct ?? false;
  const correctOptionId = submitResult?.correct_option;

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => subscription.remove();
  }, []);

  const getOptionState = useCallback(
    (optionId: QuestionOption): OptionVisualState => {
      if (!isSubmitted) {
        return selectedOptionId === optionId ? 'selected' : 'default';
      }
      if (optionId === correctOptionId) {
        return 'correct';
      }
      if (optionId === selectedOptionId) {
        return 'incorrect';
      }
      return 'muted';
    },
    [correctOptionId, isSubmitted, selectedOptionId],
  );

  const handleSubmit = () => {
    if (!selectedOptionId || isSubmitting) {
      return;
    }

    submit(
      {
        question_id: question.question_id,
        selected_option: selectedOptionId,
      },
      {
        onSuccess: response => {
          if (response.data.data) {
            setSubmitResult(response.data.data);
            setPhase('submitted');
          }
        },
      },
    );
  };

  const handleContinue = () => {
    onCompleted();
  };

  const subtitle = !isSubmitted
    ? 'Answering is required before you can use the app today.'
    : isCorrect
      ? "Nice work. You're all set for today."
      : 'Answering is required before you can use the app today.';

  const canSubmit =
    Boolean(selectedOptionId) && !isSubmitted && !isSubmitting;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={isSubmitted}
          keyboardShouldPersistTaps="handled">
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
            {question.coe ? (
              <Text style={styles.coeLabel}>{question.coe.toUpperCase()}</Text>
            ) : null}
            <Text style={styles.questionLabel}>QUESTION</Text>
            <Text style={styles.questionText}>{question.question}</Text>

            <View style={styles.options}>
              {options.map(option => (
                <OptionRow
                  key={option.id}
                  label={option.text}
                  state={getOptionState(option.id)}
                  disabled={isSubmitted || isSubmitting}
                  onPress={() => setSelectedOptionId(option.id)}
                />
              ))}
            </View>

            {isSubmitted && submitResult && (
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
                <Text style={styles.explanation}>
                  {submitResult.explanation}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.85}
          disabled={isSubmitted ? false : !canSubmit}
          onPress={isSubmitted ? handleContinue : handleSubmit}
          style={[
            styles.actionButton,
            !isSubmitted && !canSubmit && styles.actionButtonDisabled,
          ]}>
          {isSubmitting ? (
            <ActivityIndicator color={colors.PRIMARY} />
          ) : (
            <Text
              style={[
                styles.actionButtonText,
                !isSubmitted && !canSubmit && styles.actionButtonTextDisabled,
              ]}>
              {isSubmitted ? 'Continue' : 'Submit'}
            </Text>
          )}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 8,
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
    paddingBottom: 22,
    gap: 14,
  },
  coeLabel: {
    color: colors.PRIMARY,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    fontFamily: fonts.ARIAL,
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
    marginTop: 4,
    marginBottom: 8,
    backgroundColor: colors.WHITE,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
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
