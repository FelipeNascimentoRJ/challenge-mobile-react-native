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
import ModalSearch from '../../components/search';
import ModalHero from '../../components/hero';

// Styles
import {Screen} from './styles';

export default function Home() {
  // Theme
  const {theme} = useContext(ThemeContext);

  // Local States
  const [showModalSearch, setShowModalSearch] = useState<boolean>(false);
  const [showModalHero, setShowModalHero] = useState<boolean>(false);
  const [character, setCharacter] = useState<ICharacter | null>(null);

  // Dispatch
  const dispatch = useDispatch();

  // Redux States
  const {characters} = useSelector((state: IApplicationState) => state);

  // Search toggle
  const handlePressSearchToggle = () =>
    setShowModalSearch((prevState) => !prevState);

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
      <Header onPressSearch={handlePressSearchToggle} />
      <List onPress={handlePressCharacter} />
    </>
  );

  React.useEffect(() => {
    dispatch(actions.charactersRequest());
  }, [dispatch]);

  return (
    <Screen>
      <StatusBar barStyle={theme.status} backgroundColor={theme.background} />
      {characters.data == null || characters.data.length === 0
        ? renderListEmpty
        : renderHeaderAndList}
      <ModalSearch
        show={showModalSearch}
        onClose={handlePressSearchToggle}
        onPress={handlePressCharacter}
      />
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
