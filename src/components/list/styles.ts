import styled from 'styled-components/native';

// Component
import {FlatList} from 'react-native';
import {IThemeExport} from '../../themes/type';
import {themeProps} from '../../themes';

export const List = styled(FlatList as new () => FlatList)<IThemeExport>`
  background-color: ${themeProps('background')};
`;
