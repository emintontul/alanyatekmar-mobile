import { useEffect, useState } from 'react';
import { AppIcon, AppScreen, Block, FloatingButton, Swipeable, Text } from '@/components';
import { COLORS } from '@/theme';
import { ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native';
import { useAppDispatch } from '@/hooks';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationPropsType } from '@/navigation/stacks/MainStack/types';
import { RootState, authRedux } from '@/store';
import { baseURL } from '@/api/config';
import { useTranslation } from 'react-i18next';
import ImageView from "react-native-image-viewing";
import { useSelector } from 'react-redux';
import FloatingActionButton from '@/components/Common/FloatingActionButton';
import { ICONS } from '@/utils';

export const getAuthState = (state: RootState) => state.auth;
const UserPhotoList = (props) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MainStackNavigationPropsType>();
  // get user from params
  const { user } = props.route.params;
  const [imageIndex, setImageIndex] = useState(0);
  const navigationOptions = {
    headerTitle: () => <Text sectionTitleDark bold>bottom_tab.photos</Text>,
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
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const { token } = useSelector(getAuthState);
  const [photoList, setPhotoList] = useState([]);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const fetchPhotos = () => {
    fetch(baseURL + '/users/' + user?.id + '?populate[0]=user_photos&populate[1]=user_photos.Photos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => response.json())
      .then(data => {
        console.log('%cindex.tsx line:40 data', 'color: #007acc;', data.user_photos);
        setPhotoList(data.user_photos[0].Photos.map((photo) => ({
          uri: photo.url,
          name: "",
          description: "",
        })));
        setPhotos(data.user_photos);
        setLoading(false);
      }).catch((error) => {
        if (error.status) {
          dispatch(authRedux.logout());
          navigation.replace('AUTH_ROOT');
        }
        setLoading(false);
      }
      );
  };
  useEffect(() => {
    fetchPhotos();
  }
    , []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPhotos();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const { t } = useTranslation();
  return (
    <>
      <AppScreen safe bg-white barStyle={"dark-content"} navigationOptions={navigationOptions}>
        {loading ? (
          <Block py-30 style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: "100%",
            borderRadius: 15,
          }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </Block>
        ) : (<>
          {photos?.length > 0 ? photos.map((photoItem, photoIndex) => (
            <Block mt-10 key={photoIndex}>
              <Swipeable
                key={photoIndex}           
                rightItems={[
                  {
                    text: 'Sil',
                    textColor: COLORS.white,
                    onPress: () => {
                      fetch(baseURL + '/user-photos/' + photoItem.id, {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`,
                        }
                      })
                        .then(data => {
                          fetchPhotos();
                        })
                    },
                    titleStyle: {
                      color: COLORS.white,
                      fontSize: 14,
                      fontWeight: 'bold',
                      paddingHorizontal:15,
                      paddingVertical:10,
                    },
                    icon: {
                      name: ICONS.Trash,
                      size: 20,
                      color: COLORS.white,
                    },
                    background: 'red',
                  }
                ]}>
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
          <FloatingActionButton
            isVisible={true}
            onPress={() => {
              navigation.navigate('ADMIN_ADD_USER_PHOTO', { user: user });
            }}
          />

        </>)}
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
export default UserPhotoList;
