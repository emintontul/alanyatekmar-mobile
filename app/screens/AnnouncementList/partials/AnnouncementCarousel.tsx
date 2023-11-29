import React, { useState } from 'react';

import { DocumentsData } from 'data/mock_data';

import { images } from '@/assets';
import { AppImage, Block, BottomModal, DocumentCard, Text } from '@/components';
import { useStyledTag } from '@/hooks';
import { COLORS, window } from '@/theme';
import LinearGradient from 'react-native-linear-gradient';
import { rgba } from '@/utils';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationPropsType } from '@/navigation/stacks/MainStack/types';

const AnnouncementCarousel = (item: any) => {
  const data =item.item.attributes;
  const { t } = useTranslation(); 

  const navigation = useNavigation<MainStackNavigationPropsType>();
  return (
    <>
      <Block relative style={{ alignSelf: 'stretch'}}  pressable onPress={() => {
                navigation.navigate("ANNOUNCEMENT_DETAIL",
                  {
                    announcement: item.item
                  }
                )
              }}
      >
        <AppImage url={data.Picture.data[0].attributes.formats.medium.url} height={250} width={null}/>
        <Block absolute style={{ left:0, right:0,top:0,bottom:0, backgroundColor: rgba("#000", 0.3)}} center middle>
          <Text bold style={{ fontSize: 30, color: COLORS.white, width:"70%", textAlign:"center"}}>{ t("lang") == "tr" ? data?.Title : data?.localizations.data.filter((item: any) => item.attributes.locale == "en")[0]?.attributes?.Title}</Text>
        </Block>

      </Block>
    </>
  );
};

export default AnnouncementCarousel;
