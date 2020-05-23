import * as React from "react";
import { Card, Title, Paragraph, TouchableRipple } from "react-native-paper";

const CardList = ({ title, description, onPress, image }) => {
  if (image) {
    return (
      <TouchableRipple onPress={onPress} rippleColor="rgba(0, 0, 0, .32)">
        <Card style={styles.card}>
          <Card.Cover source={{ uri: image }} />
          <Card.Content>
            <Title>{title}</Title>
            <Paragraph>{description}</Paragraph>
          </Card.Content>
        </Card>
      </TouchableRipple>
    );
  } else {
    return (
      <TouchableRipple onPress={onPress} rippleColor="rgba(0, 0, 0, .32)">
        <Card style={styles.card}>
          <Card.Content>
            <Title>{title}</Title>
          </Card.Content>
        </Card>
      </TouchableRipple>
    );
  }
};

const styles = {
  card: {
    margin: 5
  }
};

export { CardList };
