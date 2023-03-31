import {Text, View} from 'react-native';
import DetailsCard from '../components/cards/detailsCard';

const data = 'skofoka odkvsp dvksp svokps svoksov';
const Skills = () => {
  return (
    <View>
      <DetailsCard title="Details" />
      <DetailsCard title="Other Skills" data={data} />
    </View>
  );
};

export default Skills;
