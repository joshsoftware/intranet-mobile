import {Text, ScrollView} from 'react-native';

import DetailsCard from '../../components/cards/detailsCard';
import DetailsView from '../../components/views/detailsView';
import DescriptionView from '../../components/views/descriptionView';

const data = 'skofoka odkvsp dvksp svokps svoksov';
const Skills = () => {
  return (
    <ScrollView>
      <DetailsCard title="Details">
        <DetailsView />
      </DetailsCard>
      <DetailsCard title="Other Skills">
        <DescriptionView data={data} />
      </DetailsCard>
    </ScrollView>
  );
};

export default Skills;
