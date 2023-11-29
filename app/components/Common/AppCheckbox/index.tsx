import React from 'react';
import {TextStyle, ViewStyle} from 'react-native';

import AppIcon from '../AppIcon';
import Block from '../Block';

import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {ICONS, widthPixel} from '@/utils';

interface ICheckBox {
  checked?: boolean | undefined;
  onPress?: () => void;
  style?: ViewStyle | TextStyle;
  radio?: boolean;
}

const AppCheckbox = (props: ICheckBox) => {
  const {checked, onPress, radio} = props;

  const Checkbox = useStyledTag(Block, 'center middle border ', () => ({
    borderWidth: 1.5,
    borderColor: checked ? COLORS.primary : COLORS.gray,
    backgroundColor: checked ? COLORS.primary : '',
    width: widthPixel(18),
    height: widthPixel(18),
    borderRadius: radio ? 50 : 4,
  }));

  return (
    <Block pressable onPress={onPress} {...props}>
      <Checkbox>{checked && <AppIcon name={ICONS.check} size={14} color={COLORS.bgWhite} />}</Checkbox>
    </Block>
  );
};

export default AppCheckbox;
