import { useEffect, useState } from 'react';
import { AppScreen, Block, Swipeable, Text } from '@/components';
import { COLORS } from '@/theme';
import { FlatList, Image, StyleSheet } from 'react-native';
import { useAppDispatch } from '@/hooks';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationPropsType } from '@/navigation/stacks/MainStack/types';
import { RootState, authRedux } from '@/store';
import { baseURL } from '@/api/config';
import { useTranslation } from 'react-i18next';
import ImageView from "react-native-image-viewing";
import { useSelector } from 'react-redux';
import { ICONS } from '@/utils';

export const getAuthState = (state: RootState) => state.auth;
const PhotoList = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MainStackNavigationPropsType>();
  const [imageIndex, setImageIndex] = useState(0);
  const navigationOptions = {
    headerTitle: () => <Text sectionTitleDark bold>bottom_tab.photos</Text>,
    headerLeft: () => null,
    headerTransparent: false,
    headerStyle: {
      backgroundColor: COLORS.white,
      shadowColor: 'transparent',
      borderBottomWidth: 1,
      borderBottomColor: COLORS.flueGrey,
      elevation: 0,
    },
    animationEnabled: true,
  };

  const [photos, setPhotos] = useState([]);
  const {token} = useSelector(getAuthState);
  const [photoList, setPhotoList] = useState([]);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  useEffect(() => {
    fetch(baseURL + '/users/me?populate=*', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => response.json())
      .then(data => {
        setPhotoList(data.user_photos[0].Photos.filter(x => x.photo != null).map((photo) => (
          {
          uri: photo.url,
          name: "",
          description: "",
        })));
        setPhotos(data.user_photos.filter(x => x.Photos != null));

        console.log('%cindex.tsx line:52 data.user_photos', 'color: #007acc;', data.user_photos.filter(x => x.Photos != null));
      }).catch((error) => {
        if (error.status) {
          dispatch(authRedux.logout());
          navigation.replace('AUTH_ROOT');
        }
      }
      );

  }
    , []);
  const { t } = useTranslation();
  return (
    <>
    <AppScreen safe bg-white barStyle={"dark-content"} navigationOptions={navigationOptions}>
      {photos?.length > 0 ? photos.map((photoItem, photoIindex) => (
        <Block mt-10 key={photoIindex}>
          <Swipeable
            key={photoIindex}>
            <Block style={{ borderWidth: 1, borderColor: "#E3E6EC", backgroundColor: "#fff" }} px-20 py-20 br-10 border rounded-15 row center>
              <Block column >
                <Block column pb-10>
                  <Text bold style={{ fontSize: 15 }}>
                    {photoItem.Title}
                  </Text>
                  <Text bold style={{ color: "#AAB2BA" }}>{photoItem?.Photos?.length} {t("common.photos")}</Text>
                </Block>
                <FlatList
                  horizontal
                  data={photoItem.Photos}
                  renderItem={({ item, index }) => {
                    return (
                      <Block pressable 
                      key={item.id}
                      onPress={() => {
                        setIsGalleryVisible(true);
                        setImageIndex(index)
                        setPhotoList(photoItem.Photos.map((photo) => ({
                          uri: photo.url
                        })));
                      }}
                      >
                      <Image
                        source={{
                          uri: item.url,
                        }}
                        style={styles.animatedContainer}
                      />
                      </Block>
                    );
                  }}
                  keyExtractor={(item) => item.id}
                />

              </Block>
            </Block>

          </Swipeable>
        </Block>
      )) : (
        <Block py-30 style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: COLORS.flueGrey,
          borderRadius: 15,
        }}>
          <Text style={{ fontSize: 14 }}>common.noPhotos</Text>
        </Block>
        
      )}
    </AppScreen>

      <ImageView
        images={photoList}
        imageIndex={imageIndex}
        visible={isGalleryVisible}
        onRequestClose={() => setIsGalleryVisible(false)}
      /> 
    </>
  );
};
const styles = StyleSheet.create({
  image1: {
    width: 200,
    aspectRatio: 1,
  },
  image2: {
    height: 300,
    width: 200,
    resizeMode: 'contain',
    marginLeft: 40,
    marginTop: 60,
  },
  text: {
    margin: 30,
  },
  animatedContainer: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 10,
  },
});
export default PhotoList;
