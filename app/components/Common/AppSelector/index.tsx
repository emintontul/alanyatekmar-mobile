import React, {memo} from 'react';
import {Pressable, SafeAreaView, StyleProp, ViewStyle} from 'react-native';

import {useTranslation} from 'react-i18next';

import AppBottomSheet from '../AppBottomSheet';
import AppFlatList from '../AppFlatList';

import {AppButton, AppIcon, Block, Text} from '@/components';
import {useTheme} from '@/hooks';
import {ICONS} from '@/utils';

export interface ItemProp {
  title: string;
  value: string | number;
  icon?: React.ReactNode | React.ReactElement | null;
  isIcon?: boolean;
  iconColor?: string;
  iconName?: string;
}

interface Props {
  headerTitle?: string;
  isVisible: boolean;
  onClose?: () => void;
  onSelect?: (_value: ItemProp) => void;
  itemsList: ItemProp[];
  selectedItem?: ItemProp;
  containerStyle?: StyleProp<ViewStyle>;
}

const AppSelector = ({headerTitle = '', isVisible = false, onClose, onSelect, itemsList, selectedItem, containerStyle}: Props) => {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const RenderItem = ({item}: {item: ItemProp}) => (
    <Pressable
      onPress={() => {
        onSelect && onSelect(item.value);
        onClose && onClose();
      }}>
      <Block flex row middle pt-15 pb-15 px-30 borderBottom>
        {item?.isIcon && (
          <Block left pr-15>
            <AppIcon name={item.iconName || ''} size={22} color={item.iconColor ? item.iconColor : colors.primary} />
            {item.icon}
          </Block>
        )}
        <Block flex>
          <Text
            style={{
              color: item?.value === selectedItem?.value ? colors.primary : colors.defaultTextColor,
              fontSize: item?.value === selectedItem?.value ? 16 : 15,
              fontWeight: item?.value === selectedItem?.value ? 'bold' : 'normal',
            }}>
            {item?.title}
          </Text>
        </Block>
        {selectedItem && selectedItem?.value === item?.value && (
          <Block right pl-20>
            <AppIcon name={ICONS.Check} size={20} />
          </Block>
        )}
      </Block>
    </Pressable>
  );

  return (
    <AppBottomSheet snapPoints={[400]} isFlatList isVisible={isVisible} onClose={onClose}>
      <SafeAreaView style={{height: 350}}>
        {headerTitle?.length > 0 && (
          <Block py-10 middle center>
            <Text fs-18 black medium>
              {headerTitle}
            </Text>
          </Block>
        )}

        <AppFlatList<ItemProp> data={itemsList} renderItem={RenderItem} />

        {!!selectedItem?.value && (
          <Block px-20 pt-20>
            <AppButton
              type="primary"
              title={t('clear').toString()}
              onPress={() => {
                onSelect && onSelect({title: '', value: ''});
                onClose && onClose();
              }}
            />
          </Block>
        )}
      </SafeAreaView>
    </AppBottomSheet>
  );
};

export default memo(AppSelector);
