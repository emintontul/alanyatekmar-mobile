import React from 'react';

import {images} from '@/assets/images';
import {AppBottomSheet, AppFlatList, AppIcon, AppImage, Block, Text} from '@/components';
import {COLORS, window} from '@/theme';
import {heightPixel, ICONS} from '@/utils';

interface DashboardBottomSheetProps {
  bottomHeight: number;
}

export const DashboardBottomSheet = ({bottomHeight}: DashboardBottomSheetProps) => {
  return (
    <AppBottomSheet
      enablePanDownToClose={false}
      backdrop={false}
      backgroundStyle={{
        backgroundColor: '#F5F6FA',
      }}
      index={0}
      snapPoints={[bottomHeight, window.height - 90]}
      portal={false}>
      <Block pressable flex mt-5 mb-25 px-20>
        <Text title>home.bottom_sheet_title</Text>
        

        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <Block key={index} mt-20>
            <AppImage rounded-7 url={images.blogImage} width={'100%'} height={heightPixel(148)} />
            <Text mt-15 mb-10 default semibold>
              kingdom yanınızda
            </Text>
            <Text tiny>Anlaşmalı olduğumuz kurumlara kestiğiniz faturaları anında tahsil edebilmek için Tedarikçi Finansmanı`nı deneyin.</Text>
            <Block mt-10 pressable>
              <Text defaultInfo>home.discover_our_products</Text>
            </Block>
          </Block>
        ))}
      </Block>
    </AppBottomSheet>
  );
};
