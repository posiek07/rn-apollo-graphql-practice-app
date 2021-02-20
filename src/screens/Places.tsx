import React from 'react';
import { FlatList, Button, Text, SafeAreaView, StyleSheet } from 'react-native';
import { usePlacesQuery, useCreatePlaceMutation } from '../../graphql';
import CardView from '../components/CardView';

class Props {}

const Places: React.FC<Props> = () => {
  const { loading, data, error, refetch } = usePlacesQuery();
  const [createPlace] = useCreatePlaceMutation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!loading && (
        <FlatList
          ListFooterComponent={() => {
            return (
              <Button
                title="Add New Place"
                onPress={() => {
                  createPlace({
                    variables: {
                      title: `Place #${data.places.length + 1}`,
                      description: '',
                      imageUrl: ''
                    }
                  })
                    .then(() => {
                      refetch();
                    })
                    .catch(err => console.log(err));
                }}
              />
            );
          }}
          data={data && data.places ? data.places : []}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <CardView {...(item as any)} />}
        />
      )}
    </SafeAreaView>
  );
};

export default Places;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingVertical: 40
  },
  text: {
    fontSize: 30
  }
});
