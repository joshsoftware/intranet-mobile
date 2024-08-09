import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

import {
  TrustIcon,
  TechnicalIcon,
  RespectIcon,
  EthicsIcon,
  CustFocusIcon,
} from '../constants/icons';

import {CoreValue} from '../services/giveAppreciation/types';
import colors from '../constants/colors';

const coreValuesMeta = [
  {
    id: 1,
    icon: TrustIcon,
    backgroundColor: '#F5E6D6',
  },
  {
    id: 2,
    icon: TechnicalIcon,
    backgroundColor: '#E5E1EA',
  },
  {
    id: 3,
    icon: EthicsIcon,
    backgroundColor: '#E5EDDC',
  },
  {
    id: 4,
    icon: CustFocusIcon,
    backgroundColor: '#FBE8F8',
  },
  {
    id: 5,
    icon: RespectIcon,
    backgroundColor: '#D8D6F5',
  },
];

interface CoreValueInfoModalProp {
  visible: boolean;
  onClose?: () => void;
  coreValuesDetails: CoreValue[];
}

const CoreValueInfoModal: React.FC<CoreValueInfoModalProp> = ({
  visible,
  onClose,
  coreValuesDetails,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.scrollView}>
              {coreValuesDetails.map((item, key) => {
                const IconComponent = coreValuesMeta[key].icon;
                return (
                  <View
                    key={item.id}
                    style={[
                      styles.card,
                      {backgroundColor: coreValuesMeta[key].backgroundColor},
                    ]}>
                    <View style={styles.iconWrapper}>
                      <IconComponent />
                    </View>

                    <View style={styles.cardContent}>
                      <Text style={styles.cardTitle}>{item.name}</Text>
                      <Text style={styles.cardDescription}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: colors.WHITE,
    borderRadius: 12,
    padding: 10,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
  },
  card: {
    flexGrow: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  cardContent: {
    paddingLeft: 10,
    flex: 3,
  },
  iconWrapper: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    maxHeight: 100,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.BLACK,
    paddingBottom: 10,
  },
  cardDescription: {
    fontSize: 12,
    color: colors.BLACK,
  },
});

export default CoreValueInfoModal;
