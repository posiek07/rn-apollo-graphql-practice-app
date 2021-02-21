import React, { Fragment } from 'react';
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  Text,
  TouchableRipple
} from 'react-native-paper';

const CardView = ({ title, description, imageUrl, onPress, user }) => {
  return (
    <Card onPress={() => onPress && onPress()}>
      {!!user && (
        <Card.Title
          title={user.username}
          subtitle={user.email}
          left={props => (
            <Avatar.Icon
              {...props}
              icon={'image'}
              style={{ backgroundColor: 'lightblue' }}
              color="#fff"
              size={42}
            />
          )}
        />
      )}
      <Card.Cover
        source={{ uri: imageUrl || 'http://picsum.photos/704.jpg' }}
      />
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{description}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default CardView;
