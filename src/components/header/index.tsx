import React, {memo, useContext} from 'react';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// Redux
import {useSelector, useDispatch} from 'react-redux';

// Store
import {IApplicationState} from '../../store';

// Actions
import * as actions from '../../store/ducks/rootActions';

// Utils
import Shadow from '../../utils/shadow';

// Styles
import {Container, Logo, Actions} from './styles';

// Theme
import {ThemeContext} from '../../themes';

// Logo
import logo from '../../assets/logo.png';

export interface IHeader {
  onPressSearch: () => void;
}

function Header({onPressSearch}: IHeader) {
  // Theme
  const {theme, themeToggle} = useContext(ThemeContext);

  // Dispatch
  const dispatch = useDispatch();

  // Redux States
  const {favorite} = useSelector((state: IApplicationState) => state);

  const handleClickFavorite = () => {
    if (favorite.enabled) {
      dispatch(actions.favoriteDisabled());
    } else {
      dispatch(actions.favoriteEnabled());
    }
  };

  // Style
  const iconStyles = {height: 30};

  return (
    <Container style={Shadow}>
      <Logo source={logo} />
      <Actions>
        <Icon.Button
          name="brightness-4"
          size={30}
          color={theme.icon}
          backgroundColor={theme.background}
          iconStyle={iconStyles}
          borderRadius={200}
          onPress={themeToggle}
        />
        <Icon.Button
          name={favorite.enabled ? 'favorite' : 'favorite-border'}
          size={30}
          color={favorite.enabled ? theme.primary : theme.icon}
          backgroundColor={theme.background}
          iconStyle={iconStyles}
          borderRadius={200}
          onPress={handleClickFavorite}
        />
        <Icon.Button
          name="search"
          size={30}
          color={theme.icon}
          backgroundColor={theme.background}
          iconStyle={iconStyles}
          borderRadius={200}
          onPress={onPressSearch}
        />
      </Actions>
    </Container>
  );
}

export default memo(Header);
