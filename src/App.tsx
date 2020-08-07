import 'react-native-gesture-handler';
import React from 'react';

import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// API Marvel
import config from '../marvel.config.json';
import Marvel from './services/marvel';

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
  React.useEffect(() => {
    (async () => {
      const marvel = new Marvel(config.privateKey, config.publicKey);

      const {data} = await marvel.getCharacters();

      console.log(data);
    })();
  });

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Icon name="stars" size={150} color="#1398DE" />
        <Text>Marvel Heroes</Text>
      </View>
    </View>
  );
}
