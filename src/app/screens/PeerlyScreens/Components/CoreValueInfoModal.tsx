import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

import TrustIcon from '../../../../assets/peerly/svg/trust.svg';
import TechnicalIcon from '../../../../assets/peerly/svg/technical.svg';
import RespectIcon from '../../../../assets/peerly/svg/respect.svg';
import EthicsIcon from '../../../../assets/peerly/svg/ethics.svg';
import CustFocusIcon from '../../../../assets/peerly/svg/custfocus.svg';
import {CoreValue} from '../../../services/PeerlyServices/appreciation/types';

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
          <TouchableWithoutFeedback>
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
          </TouchableWithoutFeedback>
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
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
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
    padding: 10,
    marginVertical: 10,
  },
  cardContent: {
    marginLeft: 10,
    flex: 1,
  },
  iconWrapper: {
    width: 75,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    paddingBottom: 10,
  },
  cardDescription: {
    fontSize: 12,
    color: '#000000',
  },
});

export default CoreValueInfoModal;
