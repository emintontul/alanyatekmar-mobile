import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { BluetoothEscposPrinter, BluetoothManager } from 'tp-react-native-bluetooth-printer';
import { AppButton, AppScreen, Block, Text } from '@/components';
import { COLORS } from '@/theme';
import { setConnectedPrinter } from '@/store/reducers/settings';
import { settingsRedux } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { title } from 'process';

const ConnectPrinter = () => {
  const [paired, setPaired] = useState([]);
  const [loading, setLoading] = useState(false);
  const [boundAddress, setBoundAddress] = useState('');
  const [foundDs, setFoundDs] = useState([]);
  const dispatch = useAppDispatch();
  
  // useEffect(() => {
  //   const fetchConnectedPrinter = async () => {
  //     const savedPrinter = await AsyncStorage.getItem('connectedPrinter');
  //     if (savedPrinter) {
  //       const printer = JSON.parse(savedPrinter);
  //       setBoundAddress(printer.address);
  //       connectToDevice(printer.address);
  //     }
  //   };

  //   fetchConnectedPrinter();
  // }, []);

  const navigationOptions = {
    headerTitle: () => (
      <Block row center>
        <Text ml-10 fs-16 sectionTitleDark bold>
          Cihaz Eşleştirme
        </Text>
      </Block>
    ),
    headerTransparent: false,
    headerStyle: {
      backgroundColor: COLORS.white,
      shadowColor: 'transparent',
      elevation: 0
    },
    animationEnabled: true
  };

  const requestBluetoothPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.requestMultiple(
          [
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
          ],
          {
            title: 'Bluetooth Scan Permission',
            message: 'Your app needs this permission to scan for Bluetooth devices.'
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Bluetooth scan permission granted');
        } else {
          console.log('Bluetooth scan permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const scanDevices = async () => {
    setLoading(true);
    try {
      const scannedDevices = await BluetoothManager.scanDevices();
      setPaired(JSON.parse(scannedDevices.paired));
      setFoundDs(JSON.parse(scannedDevices.found));
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
      Alert.alert('Error', JSON.stringify(error));
    }
  };

  const connectToDevice = async (address) => {
    setLoading(true);
    try {
      await BluetoothManager.connect(address);
      setLoading(false);
      setBoundAddress(address);
      dispatch(settingsRedux.setConnectedPrinter({ address }));
      await AsyncStorage.setItem('connectedPrinter', JSON.stringify({ address }));
      Alert.alert('Yazıcı bağlantısı başarılı.');
    } catch (error) {
      setLoading(false);
      Alert.alert('Bağlantı hatası:', error.toString());
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await requestBluetoothPermission();

      BluetoothManager.isBluetoothEnabled().then(enabled => {
        if (enabled) {
          BluetoothManager.enableBluetooth().then(r => {
            const pairedDevices = r.map(device => JSON.parse(device));
            setPaired(pairedDevices);
            console.log(JSON.stringify(pairedDevices));
          }).catch(err => {
            Alert.alert(err);
          });
        }
      }).catch(err => {
        Alert.alert(err);
      });
    };

    fetchData();
  }, []);

  return (
    <>
      <AppScreen scroll safe navigationOptions={navigationOptions} barStyle={
        Platform.OS === 'android' ? 'dark-content' : 'light-content'
      }>
        <Block style={{ borderRadius: 10 }} middle center>
          <LinearGradient colors={['#0193D7', '#00B3E6']} useAngle={true} angle={45} style={{ width: '100%', borderRadius: 10 }}>
            <AppButton
              h-50
              onPress={scanDevices}
              mt-0
              type={'transparent'}
              title={'Taramayı Başlat'}
              loading={loading}
            />
          </LinearGradient>
        </Block>
        {!loading ?
          <Block>
            {foundDs.filter(rowData => rowData?.name != '').map((rowData, index) => (
              <Block
                key={index}
                pressable
                style={
                  boundAddress === rowData.address ? {
                    backgroundColor: '#e3ffe3',
                    marginTop: 15,
                    padding: 15,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: 'lightgreen',
                  } : {
                    backgroundColor: '#FAFAFA',
                    marginTop: 15,
                    padding: 15,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                  }
                }
                onPress={() => connectToDevice(rowData.address)}
              >
                <Text>{rowData.name}</Text>
                <Text>{rowData.address}</Text>
              </Block>
            ))}
            {paired.map((rowData, index) => (
              <TouchableOpacity key={index}>
                <Block
                  pressable
                  style={{
                    backgroundColor: '#FAFAFA',
                    marginTop: 15,
                    padding: 15,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                  }}
                  onPress={() => connectToDevice(rowData.address)}
                >
                  <Text>{rowData.name}</Text>
                  <Text>{rowData.address}</Text>
                  {boundAddress === rowData.address && <Text style={{ backgroundColor: 'lightgreen' }}>Bağlantı kuruldu.</Text>}
                </Block>
              </TouchableOpacity>
            ))}
          </Block> : <Block mt-5>
            <Text>Cihazlar taranıyor...</Text>
          </Block>}
      </AppScreen>
    </>
  );
};

export default ConnectPrinter;