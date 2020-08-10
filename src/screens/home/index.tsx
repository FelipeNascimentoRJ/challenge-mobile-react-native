import React, {useState, useCallback, useContext} from 'react';

// Components
import {StatusBar} from 'react-native';

// Redux
import {useSelector, useDispatch} from 'react-redux';

// Store
import {IApplicationState} from '../../store';

// Actions
import * as actions from '../../store/ducks/rootActions';

// Types
import {ICharacter} from '../../services/marvel/types/characters';

// Theme
import {ThemeContext} from '../../themes';

// Components
import Header from '../../components/header';
import List from '../../components/list';
import ListEmpty from '../../components/list-empty';

// Modals
import ModalHero from '../../components/hero';

// Styles
import {Screen} from './styles';

export default function HomeSreen() {
  // Theme
  const {theme} = useContext(ThemeContext);

  // Local States
  const [showModalHero, setShowModalHero] = useState<boolean>(false);
  const [character, setCharacter] = useState<ICharacter | null>(null);

  // Dispatch
  const dispatch = useDispatch();

  // Redux States
  const {characters, favorite} = useSelector(
    (state: IApplicationState) => state,
  );

  let data: Array<ICharacter> = characters.data !== null ? characters.data : [];

  if (favorite.enabled) {
    data = data.filter((char) => char.favorite === true);
  }

  // Hero close
  const handlePressHeroClose = () => {
    setShowModalHero(false);
    setCharacter(null);
  };

  // List item press
  const handlePressCharacter = useCallback((characterSelected: ICharacter) => {
    setShowModalHero(true);
    setCharacter(characterSelected);
  }, []);

  // List empty
  const renderListEmpty = <ListEmpty />;

  // Header and list
  const renderHeaderAndList = (
    <>
      <Header />
      <List
        data={data}
        onLoadMore={() => {
          dispatch(actions.charactersRequest());
        }}
        onPress={handlePressCharacter}
      />
    </>
  );

  React.useEffect(() => {
    if (favorite.enabled === false) {
      dispatch(actions.charactersRequest());
    }
  }, [dispatch, favorite.enabled]);

  return (
    <Screen>
      <StatusBar barStyle={theme.status} backgroundColor={theme.background} />
      {characters.data == null || characters.data.length === 0
        ? renderListEmpty
        : renderHeaderAndList}
      {character !== null ? (
        <ModalHero
          show={showModalHero}
          character={character}
          onClose={handlePressHeroClose}
        />
      ) : null}
    </Screen>
  );
}
