import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { baseURL } from '@/api/config';
import { AppIcon, AppImage, AppScreen, Block, Shadow, Text } from '@/components';
import { RootState } from '@/store';
import { COLORS } from '@/theme';
import { ICONS } from '@/utils';
import { currency } from '@/config/utils';
import DropShadow from 'react-native-drop-shadow';
import { useAppSelector } from '@/hooks';
import { BluetoothManager } from 'tp-react-native-bluetooth-printer';
import { useIsFocused } from '@react-navigation/native';

export const getAuthState = (state: RootState) => state.auth;
const HomePage = () => {
  const navigation = useNavigation();

  const navigationOptions = {
    headerTitle: () => (
      <Text sectionTitleDark bold>
        common.notifications
      </Text>
    ),

    headerTransparent: false,
    headerStyle: {
      backgroundColor: COLORS.white,
      shadowColor: 'transparent',
      elevation: 0,
    },
    animationEnabled: true,
  };
  const [notifications, setNotifications] = useState([]);
  const { token } = useSelector(getAuthState);
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    console.log('%cindex.tsx line:37' + baseURL + '/Reservation/Get', 'color: #007acc;', baseURL + '/Reservation/Get');
    axios.get(baseURL + 'Reservation/Get', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setReservations(res.data.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }).catch(error => {
      //401
      if (error.response.status == 401) {
        navigation.navigate('AUTH_ROOT', { screen: 'LOGIN' });
      }
      setMoreLoading(false);
      setIsListEnd(true);
    });
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      axios.get(baseURL + 'Reservation/Get', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        setReservations(res.data.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }).catch(error => {
        //401
        if (error.response.status == 401) {
          navigation.navigate('AUTH_ROOT', { screen: 'LOGIN' });
        }
        setMoreLoading(false);
        setIsListEnd(true);
      });
    }
  }, [isFocused]);

  const connectedPrinter = useAppSelector(state => state.settings.connectedPrinter);
  const [isPrinterConnected, setIsPrinterConnected] = useState(false);
  const [printerName, setPrinterName] = useState('');
  useEffect(() => {
    // check if bluetooth printer is connected. If not connected try to reconnect
    // connectedPrinter contains name and address of the connected printer
    console.log('%capp/screens/HomePage/index.tsx:65 connectedPrinter', 'color: #007acc;', connectedPrinter);
    BluetoothManager.isBluetoothEnabled().then((enabled) => {
      console.log('%capp/screens/HomePage/index.tsx:68 enabled', 'color: #007acc;', enabled);
      BluetoothManager.getConnectedDevice().then((device) => {
        console.log('%capp/screens/HomePage/index.tsx:68 device', 'color: #007acc;', device);
        if (devices.length > 0) {
          const connected = devices.find((device) => device.name === connectedPrinter.name);
          if (connected) {
            setIsPrinterConnected(true);
            setPrinterName(connectedPrinter.name);
          } else {
            setIsPrinterConnected(false);
            setPrinterName('');
          }
        } else {
          setIsPrinterConnected(false);
          setPrinterName('');
        }
      }
      )
    }
    )

  

  }, [connectedPrinter]);


  return (
    <>
      <AppScreen scroll safe navigationOptions={navigationOptions} barStyle={'dark-content'}>
        <>
          {
            // check if bluetooth printer is connected
          }
          <Block
            pressable
            mb-20
            px-20
            py-15
            style={{
              fontSize: 12,
              backgroundColor: COLORS.flueGrey,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: COLORS.lightGrey,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <AppIcon name={ICONS.Copy} size={18} color={COLORS.gray} />
            <Block ml-15>
              <Text bold style={{ fontSize: 16 }}>
                {
                  isPrinterConnected ? 'Yazıcı bağlı: ' + printerName : 'Yazıcı bağlı değil!'
                }
              </Text>

              <Block pressable onPress={() => navigation.navigate('CONNECT_PRINTER')}>
              {
                isPrinterConnected ? (
                  <Text style={{ color: COLORS.primary }}>Yazıcıyı değiştir.</Text>
                ) : (
                  <Text style={{ color: COLORS.primary }}>Yazıcıya bağlan.</Text>
                )
              }
              </Block>
            </Block>
          </Block>
          {// latest reservations
          }
          <Block row justify-between mb-20>
            <Text sectionTitleDark>common.latestReservations</Text>
          </Block>
          {reservations.map((reservation) => (
            <Shadow md>
              <Block pressable onPress={() => {
                navigation.navigate('EXERCISE_ROOT', {
                  screen: 'RESERVATION_DETAIL',
                  params: {
                    reservation: reservation,
                  },
                })
              }} center middle row mb-10 style={{ backgroundColor: COLORS.white }} px-10 py-10 rounded-10>
                <Block w-43 h-43>
                  <AppImage url={"https://cdn.alanyatekmar.com/" + reservation.image} style={{ width: 50, height: 50 }} resizeMode="cover" rounded-6 />
                </Block>
                <Block middle mr-auto ml-10>
                  <Text>#{reservation.reservationCode} - {moment(reservation.createdAt).format('DD.MM.YYYY')}</Text>
                  <Text bold>{reservation.name}</Text>
                  <Text>{reservation.firstName + " " + reservation.lastName}</Text>
                </Block>
                <Block>
                  <Text style={{textAlign:"right"}}>{reservation.type == 0 ? reservation.dayCount + " Günlük" : reservation.type == 1 ? "Transfer" : reservation.type == 2 ? "Tur" : "Hotel"}</Text>
                  <Text style={{textAlign:"right"}}>{reservation.totalPrice} {currency(reservation.currency)}</Text>
                </Block>
              </Block>
            </Shadow>
          ))}

        </>
      </AppScreen>
    </>
  );
};

export default HomePage;
