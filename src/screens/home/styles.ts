import styled from 'styled-components/native';

import {IThemeExport} from '../../themes/type';
import {themeProps} from '../../themes';

export const Screen = styled.SafeAreaView<IThemeExport>`
  flex: 1;
  background-color: ${themeProps('background')};
`;
