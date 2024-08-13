import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import colors from '../../constants/colors';
import RatingBar from '../../components/RatingBar';
import ObjectionModal from '../../components/ObjectionModal';
import {usePostReward, usePostObjection} from './appreciationDetails.hooks';
import CenteredModal from '../../components/Modal';
import {
  FlagIcon,
  InfoIcon,
  RewardSuccessIcon,
  SuccessIcon,
} from '../../constants/icons';
import InitialAvatar from '../../components/InitialAvatar';
import Typography from '../../components/typography';
import InfoModal from '../../components/InfoModal';
import RewardAcknowledgementModal from '../../components/RewardAcknowledgementModal';
import {useGetProfileDetails} from '../ProfileDetailScreen/profileDetail.hooks';
import toast from '../../../utils/toast';
import message from '../../constants/message';
import ImageWithFallback from '../../components/imageWithFallback/ImageWithFallback';
import LoadingSpinner from '../../components/LoadingSpinner';

const AppreciationDetailsComponent = ({
  currentIndex,
  appriciationList,
}: any) => {
  const cardDetails = appriciationList[currentIndex];

  const [reward, setReward] = useState(0);
  const [reason, setReason] = useState('');
  const [isObjectionModalVisible, setObjectionModalVisible] = useState(false);
  const [isInfoModalVisible, setInfoModal] = useState(false);
  const [isOpenRewardAckModal, setOpenAckRewardModal] = useState(false);
  const [isRewardAlreadyGiven, setRewardAlreadyGivenStatus] = useState(false);
  const {data: profileDetails} = useGetProfileDetails();

  const {
    mutate: postReward,
    isLoading: isLoadingPostReward,
    isSuccess: isSuccessPostReward,
    isError: isErrorPostReward,
    reset: resetPostReward,
  } = usePostReward();

  const {
    mutate: postObjection,
    isLoading: isLoadingPostObjection,
    isSuccess: isSuccessPostObjection,
    reset: resetPostObjection,
  } = usePostObjection();

  const selfAppreciations = useMemo(() => {
    if (
      profileDetails?.user_id === cardDetails?.sender_id ||
      profileDetails?.user_id === cardDetails?.receiver_id
    ) {
      return true;
    } else {
      return false;
    }
  }, [
    cardDetails?.receiver_id,
    cardDetails?.sender_id,
    profileDetails?.user_id,
  ]);

  const getRewardConversion = useMemo(() => {
    if (cardDetails?.given_reward_point === 5) {
      return 3;
    }
    if (cardDetails?.given_reward_point === 3) {
      return 2;
    }
    if (cardDetails?.given_reward_point === 1) {
      return 1;
    } else {
      return 0;
    }
  }, [cardDetails?.given_reward_point]);

  const getRewardConversionForAPI = useMemo(() => {
    if (reward === 3) {
      return 5;
    }
    if (reward === 2) {
      return 3;
    } else {
      return 1;
    }
  }, [reward]);

  const rewardLabel = useMemo(() => {
    if (reward === 3) {
      return 'love';
    }
    if (reward === 2) {
      return 'nice';
    } else {
      return 'good';
    }
  }, [reward]);

  useEffect(() => {
    if (cardDetails?.given_reward_point) {
      setReward(getRewardConversion);
    }
  }, [cardDetails?.given_reward_point, getRewardConversion]);

  useEffect(() => {
    if (isSuccessPostReward) {
      setRewardAlreadyGivenStatus(true);
    }
  }, [isSuccessPostReward]);

  useEffect(() => {
    if (isErrorPostReward) {
      setReward(0);
      resetPostReward();
    }
  }, [getRewardConversion, isErrorPostReward, resetPostReward]);

  useEffect(() => {
    if (isSuccessPostObjection && isObjectionModalVisible) {
      setObjectionModalVisible(false);
    }
  }, [isSuccessPostObjection, isObjectionModalVisible]);

  const handleReward = (point: number) => {
    setOpenAckRewardModal(true);
    setReward(point);
  };

  const handleRewardAckReset = () => {
    setOpenAckRewardModal(false);
    setReward(0);
  };

  const handleRewardAckSubmit = () => {
    if (cardDetails) {
      const payload = {
        params: {
          id: cardDetails.id,
        },
        body: {point: getRewardConversionForAPI},
      };
      postReward(payload);
    }
    setOpenAckRewardModal(false);
  };

  const handleObjectionReason = () => {
    if (cardDetails) {
      const payload = {
        params: {
          id: cardDetails.id,
        },
        body: {reporting_comment: reason},
      };
      postObjection(payload);
    }
  };

  if (!cardDetails) {
    return (
      <View>
        <Text>No Card Details Found</Text>
      </View>
    );
  }

  const receiverName = `${cardDetails?.receiver_first_name || ''} ${
    cardDetails?.receiver_last_name || ''
  } `;

  const senderName = `${cardDetails?.sender_first_name || ''} ${
    cardDetails?.sender_last_name || ''
  }`;

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.receiverImageBox}>
          {cardDetails?.receiver_image_url ? (
            <ImageWithFallback
              imageUrl={cardDetails.receiver_image_url}
              imageStyle={styles.receiverImage}
              initials={
                <View style={styles.receiverImageAvatar}>
                  <InitialAvatar name={receiverName} size={95} />
                </View>
              }
            />
          ) : (
            <View style={styles.receiverImageAvatar}>
              <InitialAvatar name={receiverName} size={95} />
            </View>
          )}
        </View>
        <View style={styles.senderImageBox}>
          {cardDetails?.sender_image_url ? (
            <ImageWithFallback
              imageUrl={cardDetails.sender_image_url}
              imageStyle={styles.senderImage}
              initials={
                <View style={styles.senderImageAvatar}>
                  <InitialAvatar name={senderName} size={66} />
                </View>
              }
            />
          ) : (
            <View style={styles.senderImageAvatar}>
              <InitialAvatar name={senderName} size={66} />
            </View>
          )}
        </View>
        <View style={styles.cardDetailsBox}>
          <View style={styles.senderInfo}>
            <Typography type="h3" style={styles.receiverName}>
              {receiverName}
            </Typography>
            <Typography type="h5" style={styles.designation}>
              {cardDetails.receiver_designation}
            </Typography>
          </View>

          <View style={styles.coreValueView}>
            <Typography type="h4" style={styles.coreValue}>
              {cardDetails.core_value_name}
            </Typography>
          </View>

          <View style={styles.descriptionView}>
            <Text style={styles.description}>
              {cardDetails.core_value_description}
            </Text>
          </View>
          <View style={styles.senderNameWrap}>
            <Text style={styles.authorByText}>Words by </Text>
            <Text style={styles.author}>{senderName}</Text>
          </View>
          <View style={styles.appreciationDescriptionBox}>
            <ScrollView>
              <Text style={styles.appreciationDescription}>
                {cardDetails.description}
              </Text>
            </ScrollView>
          </View>
        </View>
        <View>
          <View style={styles.ratingCountContainer}>
            <Text style={styles.label}>Rewards</Text>
            <Pressable
              onPress={() => setInfoModal(true)}
              style={styles.infoWrapper}>
              <InfoIcon width={16} height={16} />
            </Pressable>
            <Text style={styles.info}>
              Rewards given by {cardDetails?.total_rewards} people
            </Text>
          </View>

          {!selfAppreciations && (
            <View style={styles.rewardAndReportWrapper}>
              <Pressable
                onPress={() =>
                  selfAppreciations
                    ? toast(
                        'For self appreciations you are not allowed to give rating',
                        'success',
                      )
                    : setObjectionModalVisible(true)
                }>
                <View style={styles.flagIcon}>
                  <FlagIcon />
                </View>
              </Pressable>
              <RatingBar
                reward={reward}
                setReward={handleReward}
                disabled={getRewardConversion > 0 || isRewardAlreadyGiven}
              />
            </View>
          )}
        </View>
        <InfoModal
          message={message.REWARD_INFO}
          visible={isInfoModalVisible}
          closeModal={() => setInfoModal(false)}
        />
        <ObjectionModal
          visible={isObjectionModalVisible}
          onClose={() => setObjectionModalVisible(false)}
          onConfirm={handleObjectionReason}
          setReason={setReason}
          reason={reason}
          isLoading={isLoadingPostObjection}
        />
        <CenteredModal
          visible={isSuccessPostObjection}
          message={
            'Your objection reason has been submitted successfully. We appreciate your feedback.'
          }
          svgImage={SuccessIcon}
          btnTitle="Okay"
          onClose={() => {
            setReason('');
            resetPostObjection();
          }}
        />
        <View>
          <RewardAcknowledgementModal
            visible={isOpenRewardAckModal}
            resetModal={() => handleRewardAckReset()}
            handleConfirm={() => handleRewardAckSubmit()}
            isLoading={isLoadingPostReward}
            rewardLabel={rewardLabel}
          />
        </View>
        <View>
          <CenteredModal
            visible={isSuccessPostReward}
            message={
              'Your rewards has been submitted successfully. We appreciate your feedback.'
            }
            svgImage={RewardSuccessIcon}
            btnTitle="Okay"
            onClose={() => {
              resetPostReward();
            }}
          />
        </View>
      </View>
      {isLoadingPostReward && <LoadingSpinner />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.WHITE,
    maxHeight: 1000,
    minHeight: 670,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 35,
    marginBottom: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  receiverImageBox: {
    alignItems: 'center',
  },
  senderImageBox: {
    alignItems: 'center',
    position: 'absolute',
    right: Dimensions.get('window').width <= 400 ? 70 : 90,
  },
  receiverImageAvatar: {
    marginTop: -60,
  },
  receiverImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -60,
  },
  senderImageAvatar: {
    marginTop: -10,
  },
  senderImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginTop: -10,
    borderColor: colors.PRIMARY,
    borderWidth: 1,
  },
  avatarContainer: {
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
  },
  cardDetailsBox: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  senderInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  receiverName: {
    lineHeight: 21,
    fontWeight: 'bold',
  },
  designation: {
    fontWeight: '300',
    lineHeight: 15,
    textAlign: 'center',
  },
  coreValue: {
    fontWeight: '400',
    padding: 10,
    lineHeight: 18,
    textAlign: 'center',
    minWidth: 80,
  },
  descriptionView: {
    backgroundColor: colors.WARM_CREAM,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 15,
  },
  coreValueView: {
    backgroundColor: colors.WARM_CREAM,
    borderRadius: 999,
    marginTop: 15,
  },
  description: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.BLACK,
    padding: 10,
    lineHeight: 15,
  },
  senderNameWrap: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  author: {
    fontSize: 12,
    color: colors.SECONDARY,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  authorByText: {
    fontSize: 12,
    color: colors.SECONDARY,
    marginBottom: 10,
  },

  appreciationDescriptionBox: {
    minHeight: 200,
    maxHeight: 200,
    width: '100%',
    marginBottom: 15,
    backgroundColor: colors.WHITE,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.25,
  },
  appreciationDescription: {
    fontSize: 14,
  },
  ratingCountContainer: {flexDirection: 'row', alignItems: 'center'},
  label: {
    margin: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
    margin: 2,
    marginBottom: 5,
    paddingTop: 7,
  },
  infoWrapper: {
    marginTop: 4,
    marginLeft: 15,
    marginRight: 5,
  },
  rewardAndReportWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  flagIcon: {
    marginTop: 7,
    backgroundColor: '#EE3E54',
    height: 25,
    width: 25,
    borderRadius: 5,
    padding: 5,
  },
});

export default AppreciationDetailsComponent;
