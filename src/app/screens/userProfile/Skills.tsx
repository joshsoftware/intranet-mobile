import {ScrollView} from 'react-native';

import CardDetails from '../../components/profile/cardDetails';
import DetailsView from '../../components/profile/cardDetails/detailsView';
import Typography from '../../components/typography';

const data = 'skofoka,odkvsp,dvksp,svokps,svoksov';

const Skills = () => {
  return (
    <ScrollView>
      <CardDetails title="Details">
        <DetailsView />
      </CardDetails>
      <CardDetails title="Other Skills">
        <Typography type="header">{data}</Typography>
      </CardDetails>
    </ScrollView>
  );
};

export default Skills;
