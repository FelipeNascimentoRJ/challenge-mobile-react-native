import 'react-native-gesture-handler';
import React from 'react';

import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'column',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Icon name="stars" size={150} color="#1398DE" />
        <Text>Marvel Heroes</Text>
      </View>
    </View>
  );
}
