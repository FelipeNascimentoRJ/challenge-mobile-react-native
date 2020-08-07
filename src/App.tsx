import 'react-native-gesture-handler';
import React from 'react';

import {StyleSheet, View, ScrollView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// API Marvel
import config from '../marvel.config.json';
import Marvel from './services/marvel';

// Types
import {
  ICharacterParameters,
  ICharacter,
} from './services/marvel/types/characters';

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
  // Characters per page
  const CHAR_PER_PAGE = 30;

  // States
  const [characters, setCharacters] = React.useState<Array<ICharacter>>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number>(1);

  const loadCharacters = async () => {
    if (currentPage >= totalPages) {
      return;
    }

    // Instance
    const marvel = new Marvel(config.privateKey, config.publicKey);

    // Request params
    const params: ICharacterParameters = {
      orderBy: 'name',
      offset: CHAR_PER_PAGE * currentPage,
      limit: CHAR_PER_PAGE,
    };

    // Result data
    const {
      data: {data},
    } = await marvel.getCharacters(params);

    setCurrentPage((prevState) => prevState + 1);

    if (data && data.results && data.results.length >= 1) {
      setCharacters(data.results);

      if (data.total) {
        setTotalPages(Math.floor(data.total / CHAR_PER_PAGE));
      }
    }
  };

  React.useEffect(() => {
    (async () => {
      await loadCharacters();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Icon name="stars" size={150} color="#1398DE" />
        <Text>Marvel Heroes</Text>
        <ScrollView>
          {characters.length >= 1
            ? characters.map((character) => {
                return <Text key={character.id}>{character.name}</Text>;
              })
            : null}
        </ScrollView>
      </View>
    </View>
  );
}
