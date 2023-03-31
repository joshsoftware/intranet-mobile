import {StyleSheet, Text, View} from 'react-native';
import {
  CURRENT_ASSET_CARD,
  DETAILS_CARD,
  OTHER_SKILLS_CARD,
  PREVIOUS_ASSET_CARD,
  PROFILE_DETAILS_CARD,
  SOCIAL_MEDIA_LINKS_CARD,
} from '../../constant/cardNames';
import colors from '../../constant/colors';
import fonts from '../../constant/fonts';

import AssetView from '../views/assetView';
import DescriptionView from '../views/descriptionView';
import DetailsView from '../views/detailsView';
import ProfileView from '../views/profileView';
import {AssetType} from '../types';
import Typography from '../typography';

type Props = {
  title: string;
  labels: string[];
  data?: string;
  assets: AssetType[];
};
const renderItem = (
  title: string,
  labels: string[],
  assets: AssetType[],
  data?: string,
) => {
  switch (title) {
    case PROFILE_DETAILS_CARD:
      return <DetailsView />;

    case SOCIAL_MEDIA_LINKS_CARD:
      return <ProfileView />;

    case CURRENT_ASSET_CARD:
    case PREVIOUS_ASSET_CARD:
      return <AssetView labels={labels} assets={assets} />;
    case OTHER_SKILLS_CARD:
      return <DescriptionView data={data} />;
    case DETAILS_CARD:
      return <DetailsView />;
  }
};
const DetailsCard = ({title, labels, data, assets}: Props) => {
  return (
    <View style={styles.detailContainer}>
      <Typography
        style={styles.titlePadding}
        type="header"
        fontFamily={fonts.ARIAL_AND_BOLD}>
        {title}
      </Typography>
      {renderItem(title, labels, assets, data)}
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    borderRadius: 3,
    width: '100%',
    marginBottom: 16,
    backgroundColor: colors.TERNARY_BACKGROUND,
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: 16,
    shadowColor: colors.SHADOW_COLOR,
    shadowRadius: 6,
    elevation: 6,
  },
  titlePadding: {
    paddingBottom: 21.5,
  },
});

export default DetailsCard;
