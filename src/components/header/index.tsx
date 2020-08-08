import React, {useState} from 'react';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// Utils
import Shadow from '../../utils/shadow';

// Styles
import {Container, Logo, Actions} from './styles';

// Logo
import logo from '../../assets/logo.png';

export interface IHeader {
  onChangeFavorite: (enabled: boolean) => void;
  onPressSearch: () => void;
}

export default function Header({onChangeFavorite, onPressSearch}: IHeader) {
  // States
  const [favoriteEnabled, setFavoriteEnabled] = useState<boolean>(false);

  const handleClickFavorite = () => {
    setFavoriteEnabled((prevState) => {
      onChangeFavorite(!prevState);
      return !prevState;
    });
  };

  // Style
  const iconStyles = {height: 30};

  return (
    <Container style={Shadow}>
      <Logo source={logo} />
      <Actions>
        <Icon.Button
          name={favoriteEnabled ? 'favorite' : 'favorite-border'}
          size={30}
          color={favoriteEnabled ? '#ff0000' : '#666'}
          backgroundColor="#fff"
          iconStyle={iconStyles}
          borderRadius={200}
          onPress={handleClickFavorite}
        />
        <Icon.Button
          name="search"
          size={30}
          color="#666"
          backgroundColor="#fff"
          iconStyle={iconStyles}
          borderRadius={200}
          onPress={onPressSearch}
        />
      </Actions>
    </Container>
  );
}
