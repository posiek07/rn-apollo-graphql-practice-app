import React from 'react';
import { SafeAreaView } from 'react-native';
import { CardView } from '../components';
import { Button } from 'react-native-paper'

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
      <Button style={{marginTop: 20}} onPress={() => {navigation.navigate("Form", {item: params.item})}}>Edit Place</Button>
    </SafeAreaView>
  );
};

export default PlaceDetail;
