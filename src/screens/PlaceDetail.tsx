import React from 'react';
import { SafeAreaView } from 'react-native';
import { CardView } from '../components';

interface Props {
  navigation;
  route;
}

const PlaceDetail: React.FC<Props> = props => {
  const { navigation, route } = props;
  const { params } = route;
  return (
    <SafeAreaView>
      <CardView {...(params.item as any)} />
    </SafeAreaView>
  );
};

export default PlaceDetail;
