import {useColorScheme} from 'react-native';

import {useAppSelector} from '@/hooks';
import {COLORS, themeColors} from '@/theme';
import {getStyleShortcuts, getTextStyleShortcuts, UseThemeType} from '@/utils';

interface ITheme {
  colors: typeof COLORS;
  styles?: never;
  textStyles?: never;
}

const useTheme = <T,>(props?: UseThemeType | T): ITheme => {
  const phoneTheme = useColorScheme();
  const theme = useAppSelector(state => state.settings.theme);
  const colors = themeColors[theme || phoneTheme] as never;

  return {
    colors,
    styles: getStyleShortcuts({...props} || {}, theme) as never,
    textStyles: getTextStyleShortcuts({...props} || {}, theme) as never,
  };
};

export default useTheme;
