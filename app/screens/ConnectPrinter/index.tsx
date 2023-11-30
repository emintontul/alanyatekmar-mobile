import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
  Pressable,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import dateFormat, { masks } from 'dateformat';
import { t } from 'i18next';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {
  BluetoothEscposPrinter,
  BluetoothManager,
  BluetoothTscPrinter
} from 'tp-react-native-bluetooth-printer';

import { AppButton, AppIcon, AppScreen, Block, Text } from '@/components';
import { COLORS } from '@/theme';
import { ICONS } from '@/utils';

const HomePage = () => {
  const [paired, setPaired] = useState([]);
  const [loading, setLoading] = useState(false);
  const [boundAddress, setBoundAddress] = useState([]);
  const [shopname, setShopname] = useState('kc');
  const [phone, setPhone] = useState('GLOABL.PHONE');
  const [address, setAddress] = useState('GLOABL.ADDRESS');
  const [currentDate, setCurrentDate] = useState('');
  const [profileData, setProfileData] = useState({});
  const [foundDs, setFoundDs] = useState([]);
  const [navigationOptions, setNavigationOptions] = useState({
    headerTitle: () => (
      <Block row center>
        <AppIcon name={ICONS.user} size={24} color={COLORS.primary} />
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
  });

  const requestBluetoothPermission = async () => {
    try {
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
    } catch (err) {
      console.warn(err);
    }
  };


  const scanDevices = async () => {
    setLoading(true);
    console.log('%cBillPrintExample.js line:73 scan', 'color: #007acc;', 'scan');
    try {
      const scannedDevices = await BluetoothManager.scanDevices();
      setPaired(JSON.parse(scannedDevices.paired));
      setFoundDs(JSON.parse(scannedDevices.found));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('error' + JSON.stringify(error));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await requestBluetoothPermission();

      const date = new Date().getDate(); //Current Date
      const month = new Date().getMonth() + 1; //Current Month
      const year = new Date().getFullYear(); //Current Year
      const hours = new Date().getHours(); //Current Hours
      const min = new Date().getMinutes(); //Current Minutes

      setCurrentDate(
        date + '/' + month + '/' + year + ' Time' + hours + ':' + min + ':'
      );

      BluetoothManager.isBluetoothEnabled().then(
        enabled => {
          console.log(enabled);

          BluetoothManager.enableBluetooth().then(
            r => {
              const pairedDevices = [];
              if (r && r.length > 0) {
                for (let i = 0; i < r.length; i++) {
                  try {
                    pairedDevices.push(JSON.parse(r[i])); // NEED TO PARSE THE DEVICE INFORMATION
                  } catch (e) {
                    //ignore
                  }
                }
              }
              setPaired(pairedDevices);

              console.log(JSON.stringify(pairedDevices));
            },
            err => {
              Alert.alert(err);
            }
          );
        },
        err => {
          Alert.alert(err);
        }
      );
    };

    fetchData();
  }, []);

  // Other functions and JSX structure remains the same

  return (
    <>
        <AppScreen scroll safe navigationOptions={navigationOptions} barStyle={
          // check platform
          Platform.OS === 'android' ? 'dark-content' : 'light-content'
        }>
          <Block style={{borderRadius: 10}} middle center>
            <LinearGradient colors={['#0193D7', '#00B3E6']} useAngle={true} angle={45} style={{width: '100%', borderRadius: 10}}>
              {loading ? 
              <Block h-50 center middle>
              <ActivityIndicator color={COLORS.white} /></Block> :
              <AppButton
                h-50
                onPress={() => {
                  scanDevices();
                }}
                mt-0
                type={'transparent'}
                title={'Taramayı Başlat'}
                loading={loading}
              />}
            </LinearGradient>
          </Block>
          {!loading ?
          <Block>
            {foundDs
              ?.filter((rowData, index) => rowData?.name != '')
              ?.map((rowData, index) => {
                return (
                  <Block
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
                    onPress={() => {
                      console.log(rowData.address);
                      BluetoothManager.connect(rowData.address).then(
                        s => {
                          setLoading(false);
                          setBoundAddress(rowData.address);
                          Alert.alert('Connected');
                        },
                        e => {
                          setLoading(false);
                          Alert.alert(e);
                        },
                      );
                    }}>
                    <Text>{rowData.name}</Text>
                    <Text>{rowData.address}</Text>
                  </Block>
                );
              })}
          {/* paired devices */}

          {paired.map((rowData, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  console.log(rowData.address);
                  BluetoothManager.connect(rowData.address).then(
                    s => {
                      setLoading(false);
                      setBoundAddress(rowData.address);
                      Alert.alert('Connected');
                    },
                    e => {
                      setLoading(false);
                      Alert.alert(e);
                    },
                  );
                }}>
                
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
                    key={index}>
                  <Text>{rowData.name}</Text>
                  <Text>{rowData.address}</Text>

                  {boundAddress === rowData.address ? <Text style={{backgroundColor: 'lightgreen'}}>Connected</Text> : null}
                </Block>
              </TouchableOpacity>
            );
          })}
          </Block> : <Block mt-5>
            <Text>Cihazlar taranıyor...</Text>
          </Block>}
        </AppScreen>
      </>
  );
};

export default HomePage;


// const [printerConnected, setPrinterConnected] = useState(false);

//   const billContent = `
//     Date: 2023-08-26
//     ------------------------------
//     Item        Qty    Price
//     ------------------------------
//     Item 1      2      $10
//     Item 2      3      $15
//     ------------------------------
//     Total:             $55
//     ------------------------------
//   `;

//   const connectToPrinter = async () => {
//     try {
//       // const printerStatus = await Printers.; // Connect to the printer

//       setPrinterConnected(isConnected);
//     } catch (error) {
//       console.error('Error connecting to the printer:', error);
//     }
//   };

//   const printBill = async () => {
//     if (printerConnected) {
//       try {
//         await Printer.printText(billContent); // Print the bill content
//       } catch (error) {
//         console.error('Error printing bill:', error);
//         Alert.alert('Error printing bill:', error);
//       }
//     } else {
//       console.log('Printer not connected.');
//       Alert.alert('Printer not connected.');
//     }
//   };

//   return (
//     <View>
//       <TouchableOpacity
//         style={{backgroundColor: 'red',
//         width: 300,
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10,
//         margin: 10,
//       }}
//       onPress={connectToPrinter}>
//         <Text
//           style={{  color: 'white',
//           fontSize: 16,
//           fontWeight: 'bold',}}
//         >Connect to Printer</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//        style={{backgroundColor: 'green',
//        width: 300,
//        height: 50,
//        justifyContent: 'center',
//        alignItems: 'center',
//        borderRadius: 10,
//        margin: 10,
//      }}
//       onPress={printBill}>
//         <Text
//           style={{  color: 'white',
//           fontSize: 16,
//           fontWeight: 'bold',}}

//         >Print Bill</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
