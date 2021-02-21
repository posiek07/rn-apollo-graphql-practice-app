import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { useCurrentUserQuery } from '../../graphql';
import { CardView } from '../components';

interface Props {
  navigation: {
    navigate: any;
  };
}

const ProfileScreen: React.FC<Props> = props => {
  const { navigation } = props;
  const { data, loading, refetch, networkStatus } = useCurrentUserQuery({
    fetchPolicy: 'cache-and-network'
  });
  if (loading) {
    return <ActivityIndicator style={{ ...StyleSheet.absoluteFillObject }} />;
  }

  console.log(networkStatus);

  return (
    <View>
      <Card>
        <Card.Title
          title={(data.currentUser && data.currentUser.username) || ''}
          subtitle={(data.currentUser && data.currentUser.email) || ''}
          left={props => <Avatar.Icon {...props} icon="account" />}
        />
      </Card>
      <FlatList
        refreshing={networkStatus !== 7}
        onRefresh={() => refetch()}
        data={
          data.currentUser && data.currentUser.places
            ? data.currentUser.places
            : []
        }
        keyExtractor={item => item.id.toString()}
        renderItem={item => {
          return (
            <CardView
              {...(item.item as any)}
              onPress={() =>
                navigation.navigate('Detail', {
                  item: { ...item.item, user: data.currentUser }
                })
              }
            />
          );
        }}
      />
    </View>
  );
};

export default ProfileScreen;
