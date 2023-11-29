import React, { ReactNode, useEffect, useState } from 'react';

import { AppFlatList, AppIcon, AppImage, AppScreen, AppSwipeCarousel, Block, Text } from '@/components';
import { COLORS, window } from '@/theme';
import { ICONS, rgba } from '@/utils';
import { useStyledTag } from '@/hooks';
import { BadgeItemProps } from '@/components/App/FastSelectDay';
import { FinancingBalances } from 'data/mock_data';
import KobiInformation from '../HomePage/partials/KobiInformation';
import SwipeWithBalance from '../HomePage/partials/SwipeWithBalance';
import AnnouncementCarousel from './partials/AnnouncementCarousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { t } from 'i18next';
import { images } from '@/assets';
import { MainStackNavigationPropsType } from '@/navigation/stacks/MainStack/types';
import { useNavigation } from '@react-navigation/native';
import moment = require('moment');
import {baseURL} from '../../api/config';
import { useTranslation } from 'react-i18next';


const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const Item = (props: { item: ReactNode }) => {
    const { item } = props;

    const ItemContainer = useStyledTag(Block, 'middle center', () => ({
      width: window.width,
    }));

    return <ItemContainer pressable>{item}</ItemContainer>;
  };

  const navigation = useNavigation<MainStackNavigationPropsType>();

  const navigationOptions = {
    headerTitle: () => <Text sectionTitleDark bold>{t("common.announcements")}</Text>,
    headerLeft: () => null,
    headerTransparent: false,
    headerStyle: {
      backgroundColor: COLORS.white,
      shadowColor: 'transparent',
      elevation: 0,
    },
    animationEnabled: true,
  };
  useEffect(() => {
    fetch(baseURL + '/announcements?populate=*&sort[0]=createdAt:desc&pagination[page]=1&pagination[pageSize]=3')
      .then((response) => response.json())
      .then(data => {
        setAnnouncements(data.data);
      })

  }
    , [])
  // const Carousels = {

  //   // Sadece tedarikçi finansmanı olduğu zaman
  //   pages: [
  //     <AnnouncementCarousel key={0} />,
  //     <AnnouncementCarousel key={0} />
  //   ]

  // };
  const Carousels = announcements.slice(0, 3).map((item, index) => {
    return <AnnouncementCarousel key={index} item={item} />
  })

  const { t } = useTranslation();

  const data = Carousels;

  return (
    <>
      <AppScreen scroll safe navigationOptions={navigationOptions} barStyle={"dark-content"} p-0 customStyle={{ backgroundColor: COLORS.flueGrey }}>

        <Block column center >
          <AppSwipeCarousel data={data} renderItem={Item} />
        </Block>
        <Block px-20 py-20>
          {
            announcements.map((item, index) => (

              <Block key={index} pressable onPress={() => {
                navigation.navigate("ANNOUNCEMENT_DETAIL",
                  {
                    announcement: item
                  }
                )
              }} backgroundColor='#fff' overflow rounded-15 mb-20>
                <AppImage url={item.attributes.Picture.data[0].attributes.formats.medium.url} height={150} width={null} />
                <Block absolute style={{ right: 10, top: 10, backgroundColor: rgba("#fff", 1) }} center middle px-5 py-5>

                  <Text style={{ fontSize: 15, color: COLORS.black }}>{moment(item.attributes.createdAt).format("LLL")}</Text>
                </Block>
                <Block p-20 column>
                  <Text bold style={{ fontSize: 18, color: COLORS.primaryDark }}>{ t("lang") == "tr" ? item?.attributes?.Title : item?.attributes?.localizations.data.filter((item: any) => item.attributes.locale == "en")[0]?.attributes?.Title}</Text>
                  <Text pt-5 style={{ fontSize: 16, color: COLORS.lightGray }}>{ t("lang") == "tr" ? item?.attributes?.Description.replace(/(\r\n|\n|\r)/gm, " ").slice(0, 200) : item?.attributes?.localizations.data.filter((item: any) => item.attributes.locale == "en")[0]?.attributes?.Description.replace(/(\r\n|\n|\r)/gm, " ").slice(0, 200)}...</Text>
                </Block>
              </Block>)
            )
          }
        </Block>
      </AppScreen>
    </>
  );
};



export default AnnouncementList;
