import React from 'react';

// Components
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';

// Redux
import {useSelector, useDispatch} from 'react-redux';

// Store
import {IApplicationState} from '../../store';

// Actions
import * as actions from '../../store/ducks/rootActions';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// Types
import {ICharacter} from '../../services/marvel/types/characters';

const styles = StyleSheet.create({
  areview: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    backgroundColor: 'red',
  },
  listFooter: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  character: {
    paddingTop: 30,
    paddingBottom: 30,
  },
});

export default function Home() {
  const dispatch = useDispatch();
  const characters = useSelector(
    (state: IApplicationState) => state.characters,
  );

  const {data} = characters;

  console.log(data);

  const handleLoadMore = () => dispatch(actions.charactersRequest());

  const renderEmpty = (
    <View style={styles.content}>
      <Icon name="stars" size={150} color="#1398DE" />
      <Text>Marvel Heroes</Text>
    </View>
  );

  const renderCharacter = (character: ICharacter) => (
    <View key={Math.random()} style={styles.character}>
      <Text>{character.name}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!characters.loading) {
      return null;
    }

    return (
      <View style={styles.content}>
        <ActivityIndicator size="small" />
      </View>
    );
  };

  const renderList = (
    <FlatList
      data={data}
      contentContainerStyle={styles.list}
      renderItem={({item}) => renderCharacter(item)}
      keyExtractor={(note) => `${note.id}`}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );

  React.useEffect(() => {
    dispatch(actions.charactersRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.areview}>
      <View style={styles.container}>
        {data == null || data.length === 0 ? renderEmpty : renderList}
      </View>
    </SafeAreaView>
  );
}
