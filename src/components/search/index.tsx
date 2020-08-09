import React, {memo, useState, useCallback, useContext} from 'react';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// Components
import List from '../list';

// Types
import {ICharacter} from '../../services/marvel/types/characters';

// Theme
import {ThemeContext} from '../../themes';

// Styles
import {Modal, Container, Header, Search, Input} from './styles';

export interface IModalSearch {
  show: boolean;
  onPress: (character: ICharacter) => void;
  onClose: () => void;
}

function ModalSearch({show, onPress, onClose}: IModalSearch) {
  // Theme
  const {theme} = useContext(ThemeContext);

  // Local States
  const [search, setSearch] = useState<string>('');

  const handlePressCharacter = useCallback(
    (character: ICharacter) => {
      onClose();
      onPress(character);
    },
    [onClose, onPress],
  );

  const handleClear = useCallback(() => setSearch(''), []);

  // Style
  const iconStyles = {height: 30};

  return (
    <Modal
      animationType="slide"
      visible={show}
      statusBarTranslucent={true}
      transparent={true}>
      <Container>
        <Header>
          <Search>
            <Icon.Button
              name="arrow-back"
              size={30}
              color={theme.icon}
              backgroundColor="transparent"
              iconStyle={iconStyles}
              borderRadius={20}
              onPress={onClose}
            />
            <Input
              autoFocus={false}
              keyboardType="default"
              placeholder="Search..."
              placeholderTextColor={theme.text}
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
            {search !== '' ? (
              <Icon.Button
                name="close"
                size={30}
                color={theme.icon}
                backgroundColor="transparent"
                iconStyle={iconStyles}
                borderRadius={20}
                onPress={handleClear}
              />
            ) : null}
          </Search>
        </Header>
        <List search={search} onPress={handlePressCharacter} />
      </Container>
    </Modal>
  );
}

export default memo(ModalSearch);
