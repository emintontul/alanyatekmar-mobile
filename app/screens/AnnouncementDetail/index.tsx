import { AppImage, AppScreen, Block, Text } from '@/components';
import { COLORS } from '@/theme';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { rgba } from '@/utils';
import { useStyledTag } from '@/hooks';

import Markdown from 'react-native-markdown-display';
import React, { useState, useEffect } from 'react';
import style from '@/components/Common/AppButton/style';
import { useTranslation } from 'react-i18next';


const AnnouncementDetail = (props) => {
  const { announcement } = props.route.params;
  const navigationOptions = {
    headerTitle: () => <Text sectionTitleDark bold>common.announcements</Text>,
    headerTransparent: false,
    headerStyle: {
      backgroundColor: COLORS.white,
      shadowColor: 'transparent',
      elevation: 0,
    },
    animationEnabled: true,
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }
    , [announcement]);
    const ScreenHeight = Dimensions.get("window").height;
  const { t } = useTranslation();
  return (
    <AppScreen scroll navigationOptions={navigationOptions} barStyle={"dark-content"} px-0 py-0>
      {
        loading ?
          (<Block center middle flex={1} style={{ height:ScreenHeight - 100 }}>

            <ActivityIndicator size="large" color={COLORS.primary} />
          </Block>)
          :
          (
            <>

              <Block relative style={{ alignSelf: 'stretch' }}>
                <AppImage url={announcement.attributes.Picture.data[0].attributes.formats.medium.url} height={200} width={null} />
                <Block absolute style={{ left: 0, right: 0, top: 0, bottom: 0, backgroundColor: rgba("#000", 0.3) }} center middle>
                  <Text bold style={{ fontSize: 34, color: COLORS.white, width: "70%", textAlign: "center" }}>{ t("lang") == "tr" ? announcement?.attributes?.Title : announcement?.attributes?.localizations.data.filter((item: any) => item.attributes.locale == "en")[0]?.attributes?.Title}</Text>
                </Block>

              </Block>
              <Block px-20 py-20>
                <Markdown style={{
                  body: { color: "#7C7C7C", fontSize: 16, lineHeight: 26 },
                }}
                >
                  { t("lang") == "tr" ? announcement?.attributes?.Description : announcement?.attributes?.localizations.data.filter((item: any) => item.attributes.locale == "en")[0]?.attributes?.Description}
                </Markdown>
              </Block>

            </>
          )}

    </AppScreen>
  );
};


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
    shadowRadius: 5,
    elevation: 2,
  },
  customShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  container: {
    flex: 1,
    paddingTop: 30,
  },
  block: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  boxWrapper: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  body: {
    padding: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  containerStyle: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 20,
    width: 60,
  },
  containerStyleLeft: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 0,
    width: 60,
  },
});

export default AnnouncementDetail;
