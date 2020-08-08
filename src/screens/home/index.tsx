import React, {useState, useCallback} from 'react';

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

// Components
import Header from '../../components/header';
import List from '../../components/list';
import ListEmpty from '../../components/list-empty';

// Modals
import ModalSearch from '../../components/search';

// Styles
import {Screen} from './styles';

export default function Home() {
  // Local States
  const [showModalSearch, setShowModalSearch] = useState<boolean>(false);
  // Dispatch
  const dispatch = useDispatch();

  // Redux States
  const characters = useSelector(
    (state: IApplicationState) => state.characters,
  );

  // Favorite button changes
  const handleChangeFavorite = useCallback((enabled: boolean) => {
    console.log('Favorite Enabled: ', enabled);
  }, []);

  // Search toggle
  const handlePressSearchToggle = () =>
    setShowModalSearch((prevState) => !prevState);

  // List item press
  const handlePressCharacter = useCallback((character: ICharacter) => {
    console.log(character);
  }, []);

  // List empty
  const renderListEmpty = <ListEmpty />;

  // Header and list
  const renderHeaderAndList = (
    <>
      <Header
        onChangeFavorite={handleChangeFavorite}
        onPressSearch={handlePressSearchToggle}
      />
      <List onPress={handlePressCharacter} />
    </>
  );

  React.useEffect(() => {
    dispatch(actions.charactersRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {characters.data == null || characters.data.length === 0
        ? renderListEmpty
        : renderHeaderAndList}
      <ModalSearch
        show={showModalSearch}
        onClose={handlePressSearchToggle}
        onPress={handlePressCharacter}
      />
    </Screen>
  );
}
