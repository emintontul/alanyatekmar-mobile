import React from 'react';
import {StyleSheet} from 'react-native';

import {BaseToast, ErrorToast, InfoToast, SuccessToast, ToastProps} from 'react-native-toast-message';

import {AppIcon, Block} from '@/components';
import {COLORS, FONTS} from '@/theme';
import {ICONS} from '@/utils';

const toastConfig = {
  success: (props: ToastProps) => (
    <SuccessToast
      {...props}
      text1Style={styles.title}
      text1NumberOfLines={5}
      text2Style={styles.message}
      text2NumberOfLines={5}
      style={{
        borderRadius: 4,
        borderWidth: 1.5,
        borderLeftWidth: 1.5,
        borderLeftColor: COLORS.success,
        borderColor: COLORS.success,
        backgroundColor: COLORS.successLight,
      }}
      renderLeadingIcon={() => (
        <Block pl-10 middle center>
          <AppIcon name={ICONS.Check2} color={COLORS.success} size={20} />
        </Block>
      )}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      text1Style={styles.title}
      text1NumberOfLines={5}
      text2Style={styles.message}
      text2NumberOfLines={5}
      style={{
        borderRadius: 4,
        borderWidth: 1.5,
        borderLeftWidth: 1.5,
        borderLeftColor: COLORS.error,
        borderColor: COLORS.error,
        backgroundColor: COLORS.errorLight,
      }}
      renderLeadingIcon={() => (
        <Block pl-10 middle center>
          <AppIcon name={ICONS.Error} color={COLORS.error} size={20} />
        </Block>
      )}
    />
  ),
  warning: (props: ToastProps) => (
    <BaseToast
      {...props}
      text1Style={styles.title}
      text1NumberOfLines={2}
      text2Style={styles.message}
      text2NumberOfLines={2}
      renderLeadingIcon={() => (
        <Block pl-10 middle center>
          <AppIcon name={ICONS.Check} color={COLORS.warning} size={26} />
        </Block>
      )}
    />
  ),
  info: (props: ToastProps) => (
    <InfoToast
      {...props}
      text1Style={styles.title}
      text1NumberOfLines={2}
      text2Style={styles.message}
      text2NumberOfLines={2}
      renderLeadingIcon={() => (
        <Block pl-10 middle center>
          <AppIcon name={ICONS.Check} color={COLORS.primary} size={26} />
        </Block>
      )}
    />
  ),
};

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    fontFamily: FONTS.fontFamily,
    paddingTop: 10,
    marginLeft: -15,
    color: COLORS.font,
  },
  message: {
    fontSize: 11,
    fontFamily: FONTS.fontFamily,
    color: COLORS.font,
    paddingBottom: 10,
    marginLeft: -15,
  },
});

export default toastConfig;
