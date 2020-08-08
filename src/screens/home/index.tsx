import React, {useState} from 'react';

// Components
import {StatusBar, Text, ActivityIndicator} from 'react-native';

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

// Utils
import TextLimit from '../../utils/text-limit';

// Styles
import {
  Screen,
  Center,
  Header,
  HeaderLogo,
  HeaderActions,
  CharacterList,
  CharacterContainer,
  CharacterImage,
  CharacterContent,
  CharacterTitle,
  CharacterDescription,
  CharacterFooter,
  CharacterText,
} from './styles';

// Logo
import logo from '../../assets/logo.png';

export default function Home() {
  const dispatch = useDispatch();
  const characters = useSelector(
    (state: IApplicationState) => state.characters,
  );

  // States
  const [favoriteEnabled, setFavoriteEnabled] = useState<boolean>(false);

  // Shadow
  const shadow = {
    elevation: 5,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1,
    shadowRadius: 3,
  };

  const {data} = characters;

  const handleLoadMore = () => dispatch(actions.charactersRequest());

  const handleClickFavorite = () =>
    setFavoriteEnabled((prevState) => !prevState);

  const handleClickSearch = () => console.log('search');

  const handleCharacterPress = (character: ICharacter) =>
    console.log(character);

  const renderHeader = (
    <Header style={shadow}>
      <HeaderLogo source={logo} />
      <HeaderActions>
        <Icon.Button
          name={favoriteEnabled ? 'favorite' : 'favorite-border'}
          size={30}
          color={favoriteEnabled ? '#ff0000' : '#666'}
          backgroundColor="#fff"
          iconStyle={{height: 30}}
          borderRadius={200}
          onPress={handleClickFavorite}
        />
        <Icon.Button
          name="search"
          size={30}
          color="#666"
          backgroundColor="#fff"
          iconStyle={{height: 30}}
          borderRadius={200}
          onPress={handleClickSearch}
        />
      </HeaderActions>
    </Header>
  );

  const renderEmpty = (
    <Center>
      <Icon name="stars" size={150} color="#1398DE" />
      <Text>Marvel Heroes</Text>
    </Center>
  );

  const renderCharacter = (character: ICharacter) => {
    const {id, thumbnail, name, description, events, series} = character;

    const icon = id && id % 2 === 0 ? 'favorite' : 'favorite-border';
    const color = id && id % 2 === 0 ? '#ff0000' : '#666';

    return (
      <CharacterContainer
        onPress={() => handleCharacterPress(character)}
        style={shadow}>
        <CharacterImage
          source={{
            uri: `${thumbnail?.path}.${thumbnail?.extension}`,
          }}
        />
        <CharacterContent>
          {name ? (
            <CharacterTitle>{TextLimit.limit(name, 18)}</CharacterTitle>
          ) : null}
          {description ? (
            <CharacterDescription>
              {TextLimit.limit(description, 60)}
            </CharacterDescription>
          ) : null}
          <CharacterFooter>
            {events ? (
              <CharacterText
                color={events?.items?.length ? '#000' : '#666'}
                bold={
                  events?.items?.length !== 0
                }>{`Events ${events?.items?.length}`}</CharacterText>
            ) : null}
            {series ? (
              <CharacterText
                color={series?.items?.length ? '#000' : '#666'}
                bold={
                  series?.items?.length !== 0
                }>{`Series ${series?.items?.length}`}</CharacterText>
            ) : null}
            <CharacterText
              color={icon === 'favorite' ? '#000' : '#666'}
              bold={icon === 'favorite'}>
              Favorite <Icon name={icon} size={11} color={color} />
            </CharacterText>
          </CharacterFooter>
        </CharacterContent>
      </CharacterContainer>
    );
  };

  const renderFooter = () => {
    if (!characters.loading) {
      return null;
    }

    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  };

  const renderList = (
    <>
      {renderHeader}
      <CharacterList
        data={data}
        renderItem={({item}) => renderCharacter(item)}
        keyExtractor={(character) => `${character.id}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </>
  );

  React.useEffect(() => {
    dispatch(actions.charactersRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {data == null || data.length === 0 ? renderEmpty : renderList}
    </Screen>
  );
}
