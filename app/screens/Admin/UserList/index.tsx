import { AppBottomSheet, AppFlatList, AppIcon, AppImage, AppInput, AppScreen, AppSelector, Block, Text } from '@/components';
import { COLORS, window } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { baseURL } from '@/api/config';
import moment from 'moment';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { TekmarLogo, images } from '@/assets';
import { ICONS, heightPixel, rgba } from '@/utils';
import { ActivityIndicator, Animated, Button, Image, Pressable, RefreshControl, StyleSheet, View } from 'react-native';
import { useStyledTag } from '@/hooks';
import { t } from 'i18next';
import { DashboardBottomSheet } from '@/screens/HomePage/partials/DashboardBottomSheet';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { FlatList } from 'react-native-gesture-handler';
import { Portal } from '@gorhom/portal';
import { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

export const getAuthState = (state: RootState) => state.auth;
const UserList = () => {
  const navigation = useNavigation();
  const navigationOptions = {
    headerTitle: () => (
      <Block row center>
        <AppIcon name={ICONS.user} size={24} color={COLORS.primary} />
        <Text ml-10 fs-16 color={COLORS.primary}>
          {t("user.list")}
        </Text>
      </Block>
    ),
    headerRight: () => null,
    headerLeft: () => null,
    headerTransparent: false,
    headerStyle: {
      backgroundColor: COLORS.white,
      shadowColor: 'transparent',
      elevation: 0,
    },
    animationEnabled: true,
  };




  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['35%', '35%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);




  const [users, setUsers] = useState([{}]);
  const { token } = useSelector(getAuthState);
  const [page, setPage] = useState(0);
  const [moreLoading, setMoreLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);

  const fetchUsers = (_page: any) => {
    console.log('%cindex.tsx line:65 _page', 'color: #007acc;', _page);
    let Page = _page != undefined ? _page : page;
    setMoreLoading(true);
    console.log('%cindex.tsx line:66 page', 'color: #007acc;', Page);
    axios.get(baseURL + '/users?start=' + Page + '&limit=30', {
      headers: {
        "Authorization": "Bearer " + token,
        "Cache-Control": "no-cache",
      }
    }).then(response => {
      if (Page == 0) {
        console.log('%cindex.tsx line:74 ', 'color: #007acc;', 'aaa');
        setUsers(response.data);
      } else {
        setUsers(
          [...users, ...response.data]
        );
      }
      setPage(Page + 30);
      setTimeout(() => {

        setMoreLoading(false);
      }, 500);
    });
  }

  useEffect(() => {
    console.log('%cindex.tsx line:63 1', 'color: #007acc;', '1');
    fetchUsers();
  }, []);
  const itemExtractorKey = (item, index) => {
    return index.toString();
  };
  const search = (e) => {
    console.log('%cindex.tsx line:107 e', 'color: #007acc;', e.nativeEvent);
    axios.get(baseURL + '/users?filters[$or][0][Name][$containsi]=' + e.nativeEvent.text?.toLowerCase() + '&filters[$or][1][email][$containsi]=' + e.nativeEvent.text?.toLowerCase(), {
      headers: {
        "Authorization": "Bearer " + token,
        "Cache-Control": "no-cache",
      }
    }).then(response => {
      console.log('%cindex.tsx line:107 response', 'color: #007acc;', response.data);
      setUsers(response.data);
    });
  }
  const renderFooter = () => (
    <View style={styles.footerText}>
      {moreLoading && <ActivityIndicator />}
      {isListEnd && <Text>No more users at the moment</Text>}
    </View>
  )

  const [isFetching, setIsFetching] = useState(false);
  const onRefresh = () => {
    setPage(0);
    console.log('%cindex.tsx line:121 refressing', 'color: #007acc;', "refressing");
    setIsFetching(true);
    setTimeout(() => {

      setIsFetching(false);
      fetchUsers(0);
    }, 1000);
  }
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  return (
    <>
      <Block px-20 row center middle space={'between'} style={{ backgroundColor: COLORS.white }}>
        <AppInput placeholder={t("common.search")} flex={1} icon={ICONS.Search} onEndEditing={search} />
      </Block>
      <AppScreen flatList navigationOptions={navigationOptions} barStyle={"dark-content"} p-0>
        {isBottomSheetOpen && (
          <AppBottomSheet
            ref={bottomSheetRef}
            onClose={() => {
              setIsBottomSheetOpen(false);
              bottomSheetRef.current?.close();
            }}
            isVisible={isBottomSheetOpen}
            enablePanDownToClose
            backdrop
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            isFlatList={true}

          >
            <Block flex={false} row center space={'between'} px-20 py-10 style={{ borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey }}>
              {
                selectedUser.Name ? <Text fs-16 bold>{selectedUser.Name}</Text> : (
                  <Text>
                    -
                  </Text>
                )
              }
            </Block>
            <Block flex={1} pressable row center space={'between'} px-20 py-15 style={{ borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey }} onPress={() => {
              console.log('%cindex.tsx line:168 selectedUser', 'color: #007acc;', selectedUser);
              navigation.navigate('ADMIN_USER_PHOTOS', { user: selectedUser });
              setIsBottomSheetOpen(false);
              bottomSheetRef.current?.close();
            }
            }>
              <Text fs-14 fw-700>bottom_tab.photos</Text>
            </Block>
            <Block flex={1} pressable row center space={'between'} px-20 py-15 style={{ borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey }} onPress={() => {
              navigation.navigate('ADMIN_USER_SURVEY', { user: selectedUser });
              setIsBottomSheetOpen(false);
              bottomSheetRef.current?.close();
            }
            }>
              <Text fs-14 fw-700>Kullanıcı Anketi Görüntüle</Text>
            </Block>
            <Block flex={1} pressable row center space={'between'} px-20 py-15 style={{ borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey }} onPress={() => {
              navigation.navigate('ADMIN_USER_INFORMATIONS', { user: selectedUser });
              setIsBottomSheetOpen(false);
              bottomSheetRef.current?.close();
            }
            }>
              <Text fs-14 fw-700>Kullanıcı Bilgileri Düzenle</Text>
            </Block>
          </AppBottomSheet>)}
        {/* search bar */}
        <FlatList
          style={{ paddingHorizontal: 20, paddingTop: 10 }}
          scrollEnabled
          data={users}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={onRefresh}
            />
          }

          keyExtractor={itemExtractorKey}
          onEndReached={() => {
            fetchUsers();
          }}
          onEndReachedThreshold={0.01}

          renderItem={({ item, index }) => (
            <Block
              row
              center
              space={'between'}
              mb-10
              p-10
              style={{ backgroundColor: COLORS.white, borderRadius: 12, borderWidth: 1, borderColor: COLORS.lightGrey }}
              onPress={() => {
                setSelectedUser(item);
                setIsBottomSheetOpen(true);
                bottomSheetRef.current?.expand();
              }}
            >
              <AppImage url={
                item?.ProfilePictureUrl
                  ? item?.ProfilePictureUrl
                  : images.avatar
              } width={45} height={45} rounded-12 />
              <Block column px-10>
                {item?.Name && <Text bold style={{ fontSize: 16 }}>
                  {item?.Name}
                </Text>}
                <Text bold style={{ color: "#AAB2BA" }} mt-2>
                  {item?.email}
                </Text>
              </Block>
              <Block flex={1} style={{ alignItems: "space-between" }} pressable onPress={() => {
                setSelectedUser(item);
                setIsBottomSheetOpen(true);
                bottomSheetRef.current?.expand();
              }
              }>
                <AppIcon name={ICONS.more} size={24} color={COLORS.primary} />
              </Block>
            </Block>
          )}
          ListFooterComponent={renderFooter}
        />
      </AppScreen>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 15,
    marginHorizontal: 10
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginBottom: 30
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default UserList;
