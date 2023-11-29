import React, {memo, ReactNode} from 'react';
import {ActivityIndicator, GestureResponderEvent} from 'react-native';

import {useTranslation} from 'react-i18next';

import {EnumButtonType} from './app-button';
import styles from './style';
import useTheme from '../../../hooks/useTheme';
import Block from '../Block';
import Text from '../Text';

import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {UseThemeType} from '@/utils';

interface AppButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  type: EnumButtonType;
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  icon?: ReactNode;
  children?: ReactNode;
  titleColor?: string;
  width?: number | string;
  loadingTitle?: string;
  style?: ReactNode;
}

const AppButton = (props: AppButtonProps | never) => {
  const {disabled, type, title, titleColor = COLORS.white, icon, width = '100%', loading, loadingTitle = 'common.please_wait', style} = props;

  const theme = useTheme(props as UseThemeType);

  const {t} = useTranslation();

  const PrimaryButton = useStyledTag(Block, 'bg-primary center middle rounded-4 h-56', () => ({
    opacity: disabled ? 0.4 : 1,
  }));
  const SecondaryButton = useStyledTag(Block, 'border center middle rounded-4 h-56');
  const IconButton = useStyledTag(Block, 'center middle');
  const SuccessButton = useStyledTag(Block, 'center middle bg-success rounded-4');
  const TransparentButton = useStyledTag(Block, 'bg-transparent center middle rounded-4 h-56');

  const buttonElements = {
    primary: PrimaryButton,
    secondary: SecondaryButton,
    outline: SecondaryButton,
    icon: IconButton,
    success: SuccessButton,
    transparent: TransparentButton
  };

  const Element = buttonElements[type];

  return (
    <Element {...props} pressable style={[styles.container, disabled && styles.disabled, style]} width={width}>
      <React.Fragment>
        {loading && (
          <Block row middle center>
            <Block>
              <ActivityIndicator color={theme.colors.white} style={styles.activityIndicator} />
            </Block>
            <Block>
              <Text medium md style={[styles.text, {color: titleColor}]}>
                {loadingTitle || t('loading').toString()}
              </Text>
            </Block>
          </Block>
        )}

        {!loading && (
          <>
            {title && <Text style={[styles.text, {color: titleColor}]}>{title}</Text>}
            {type === 'icon' && icon}
          </>
        )}
      </React.Fragment>
    </Element>
  );
};

export default memo(AppButton);
