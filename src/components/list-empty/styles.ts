import styled from 'styled-components/native';

import {IThemeExport} from '../../themes/type';
import {themeProps} from '../../themes';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text<IThemeExport>`
  font-size: 16px;
  font-weight: bold;
  color: ${themeProps('text')};
`;
