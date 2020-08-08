import React, {useState, useCallback} from 'react';

// Components
import {StatusBar} from 'react-native';

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

// Components
import List from '../../components/list';
import ListEmpty from '../../components/list-empty';

// Styles
import {Screen, Header, HeaderLogo, HeaderActions} from './styles';

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

  const handleClickFavorite = () =>
    setFavoriteEnabled((prevState) => !prevState);

  const handleClickSearch = () => console.log('search');

  const handleCharacterPress = useCallback((character: ICharacter) => {
    console.log(character);
  }, []);

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

  const renderListEmpty = <ListEmpty />;

  const renderList = (
    <>
      {renderHeader}
      <List onPress={handleCharacterPress} />
    </>
  );

  React.useEffect(() => {
    dispatch(actions.charactersRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {data == null || data.length === 0 ? renderListEmpty : renderList}
    </Screen>
  );
}
