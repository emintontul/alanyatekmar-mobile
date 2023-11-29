/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

import { useSharedValue } from 'react-native-reanimated';

import { Props } from './segmented-control';

import { AppFlatList, Block, Text } from '@/components';
import { useTheme } from '@/hooks';
import { COLORS } from '@/theme';
import { widthPixel } from '@/utils';

function SegmentedControl({ segments, onChange, containerMargin = 20, tabColor, activeColor, titleColor = COLORS.black, activeTitleColor = COLORS.black, width, ...props }: Props) {
  const { width: windowWidth } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);

  const memoizedTabPressCallback = React.useCallback(
    (index: number) => {
      onChange && onChange(index);
    },
    [onChange],
  );


  return (
    <Block h-50 backgroundColor='#fff' pt-0 pb-20 overflow="hidden" {...props}>


      <Block h-50 backgroundColor='#fff' style={[styles.headerBar]}>
        <AppFlatList
          horizontal
          scrollEnabled={true}
          data={segments}
          showsHorizontalScrollIndicator={false}
          renderItem={(segment) => (
            <Block
              key={segment.index}
              center
              pressable
              row
              onPress={() => {
                setCurrentIndex(segment.index);
                memoizedTabPressCallback(segment.index);
              }}>
              <Text
                px-20
                semibold
                style={{ color: currentIndex == segment.index ? COLORS.primary : COLORS.lightGray }}
                fontSize={14}>
                {segment.item.label}
              </Text>
              {segment.index !== (segments.length - 1) && (
                <Block
                  width={5}
                  height={5}
                  mt={8}
                  mx={10}
                  borderRadius={100}
                  alignItems="flex-end"
                  backgroundColor='#AAB2BA'></Block>
              )}
            </Block>
          )}
        />
      </Block>

    </Block>
  );
}
const styles = StyleSheet.create({
  headerBar: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  }
});

export default memo(SegmentedControl);
