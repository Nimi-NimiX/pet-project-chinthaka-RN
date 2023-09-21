import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

const CardComponent = ({ title, amount, editable, onEdit }) => {
  return (
    <Card>
      <Card.Title style={styles.title} title={title} />
      <Card.Content>
        <Text style={styles.cardContent}>
          {amount && amount.toLocaleString()}
        </Text>
        {editable && (
          <Button onPress={onEdit} style={styles.editBtn}>
            Edit
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  cardContent: {
    textAlign: 'right',
    fontSize: 17,
  },
  editBtn: {
    position: 'absolute',
  },
});
