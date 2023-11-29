import React, { ReactNode, useEffect, useState } from 'react';

import { AppScreen, AppSwipeCarousel, Block, Text } from '@/components';
import { COLORS, window } from '@/theme';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStyledTag } from '@/hooks';
import HowToDoCarousel from './partials/HowToDoCarousel';
import { MainStackNavigationPropsType } from '@/navigation/stacks/MainStack/types';
import { t } from 'i18next';
import axios from 'axios';
import { baseURL } from '@/api/config';



const HowToDo = (context) => {
  const [loading, setLoading] = useState(true);
  const { params } = context.route;
  const Item = (props: { item: ReactNode }) => {
    const { item } = props;

    const ItemContainer = useStyledTag(Block, 'middle center', () => ({
      width: window.width,
    }));

    return <ItemContainer pressable>{item}</ItemContainer>;
  };
  const [exercise, setExercise] = useState({} as any);

  

  useEffect(() => {
    axios.get( baseURL + '/exercises/' + params.exercise.data.id + '?populate=*').then((res) => {
      setExercise(res.data.data.attributes);
      setLoading(false);
    }
    ).catch((err) => {
    }
    )
  },[]);

  const navigationOptions = {
    headerTitle: () => <Text sectionTitleDark bold>{exercise.Name}</Text>,
    headerTransparent: false,
    headerStyle: {
      backgroundColor: COLORS.white,
      shadowColor: 'transparent',
      elevation: 0,
    },
    animationEnabled: true,
  };
  const Carousels = {

    pages: exercise?.Media?.data ? exercise?.Media?.data.map((item: any) =>  <HowToDoCarousel key={item.id} image={item.attributes} />) : [],
  };
  
  const data = [<HowToDoCarousel key={0} video={exercise.VideoId} />, ...Carousels.pages];

  return (
    <>
    {loading ? (
      <Block center middle flex={1}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </Block>
    ) : (
    
      <AppScreen scroll safe navigationOptions={navigationOptions} barStyle={"dark-content"} px-0 py-0>

        <Block column center style={{borderBottomWidth: 1, borderBottomColor: COLORS.flueGrey, borderTopWidth: 1, borderTopColor: COLORS.flueGrey}}>
          <AppSwipeCarousel data={data} renderItem={Item}  />
        </Block>
        <Block px-20 pt-20>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: COLORS.dark, lineHeight: 26 }} bold mb-10>
            {t("common.how_to_do_title").replace("{exercise}", exercise?.Name)}
          </Text>
          <Text semibold style={{ fontWeight: "500", fontSize: 15, color: COLORS.lightGray, lineHeight: 26 }}>
            {t("lang") == "tr" ? exercise.Description : exercise.localizations?.data?.filter((item: any) => item.attributes.locale == "en")[0]?.attributes?.Description}
          </Text>
        </Block>

      </AppScreen>)}
    </>
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

export default HowToDo;
