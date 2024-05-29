import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppButton, AppImage, AppScreen, Block, Shadow, Text } from '@/components';
import { RootState } from '@/store';
import { COLORS } from '@/theme';
import { ReservationDto } from '@/base/dto/reservation.dto';
import moment from 'moment';
import { currency } from '@/config/utils';
import LinearGradient from 'react-native-linear-gradient';
import { ALIGN, BluetoothEscposPrinter } from 'tp-react-native-bluetooth-printer';
import { tekmarLogoBase } from '@/components/App/TekmarLogo';
export const getAuthState = (state: RootState) => state.auth;
const ReservationDetail = context => {
    const navigation = useNavigation();
    const navigationOptions = {
        headerTitle: () => <Text sectionTitleDark bold>Rezervasyon: #{reservation?.reservationCode}</Text>,
        headerTransparent: false,
        headerStyle: {
            backgroundColor: COLORS.white,
            shadowColor: 'transparent',
            elevation: 0,
        },
        animationEnabled: true
    };
    const [reservation, setReservation] = useState<ReservationDto>();
    useEffect(() => {

        setReservation(context.route.params.reservation);

    }, []);

    const getCurrency = (currency) => {
        switch (currency) {
            case 0:
                return "TL";
            case 1:
                return "USD";
            case 2:
                return "EUR";
            case 3:
                return "GBP";
            default:
                return "TL";
        }
    }
    // const printText = async (height = 1, width = 0) => {

    //     await BluetoothEscposPrinter.printText('Annem, sen dünyadaki en güzel çiçeksin\n\rSevgin, şefkatin hiç solmaz kalbimde.\n\rSeni çok seviyorum canım annem.\n\r', {
    //       encoding: 'Cp857',
    //       codepage: 13,
    //       widthtimes: 1,
    //       heigthtimes: 1,
    //       fonttype: 2,
    //     });
    //   };

    const printText = async (height = 1, width = 0) => {
        try {
            
            await BluetoothEscposPrinter.printerAlign(
                ALIGN.LEFT,
            );
            await BluetoothEscposPrinter.printPic(
                tekmarLogoBase,
                {
                  width: 384,
                  left: 60
                },
              );

              await BluetoothEscposPrinter.printerAlign(
                ALIGN.CENTER,
            );
            await BluetoothEscposPrinter.printText(
                'MIT TURIZM TIC. INS. LTD. STI.\n\r', {}
            );

            await BluetoothEscposPrinter.printText(
                'KIZLAR PINARI MAH. TORAMANLAR SOK. TOPRAK 4 APT, NO:12 B, Alanya/Antalya\n\r',
                {},
            );
            await BluetoothEscposPrinter.printText('0536 574 49 10.\n\r', {
            });

            await BluetoothEscposPrinter.printText('0242 512 49 10.\n\r', {
            });

            await BluetoothEscposPrinter.printText(
                '\n\r',
                {
                },
            );
            await BluetoothEscposPrinter.printerAlign(
                ALIGN.LEFT
            );

            await BluetoothEscposPrinter.printText("------------------------------------------------\n\r", {});
            await BluetoothEscposPrinter.printText('Rezervasyon Kodu: ' + reservation?.reservationCode + '\n\r', {encoding: 'cp857',
            codepage: 25,
            });

            await BluetoothEscposPrinter.printText('Tur Tarihi: ' + moment(reservation?.reservationDate).format("LL") + '\n\r', {
                encoding: 'UTF-8',
                codepage: 20,
            
            });

            // Oluşturan
            await BluetoothEscposPrinter.printText('Ad Soyad: ' + reservation?.firstName + ' ' + reservation?.lastName + '\n\r', {
                encoding: 'UTF-8',
                codepage: 20,
            });

            // E-Posta
            await BluetoothEscposPrinter.printText('E-Posta: ' + reservation?.email + '\n\r', {
                encoding: 'UTF-8',
                codepage: 20,
            
            });

            // Telefon Numarası
            await BluetoothEscposPrinter.printText('Telefon Numarası: ' + reservation?.phoneNumber + '\n\r', {
                encoding: 'UTF-8',
                codepage: 20,
            
            });
            await BluetoothEscposPrinter.printText('Otel Adı: ' + reservation?.hotelName + '\n\r', {
                encoding: 'UTF-8',
                codepage: 20,
            
            });

            await BluetoothEscposPrinter.printText('Oda Numarası: ' + reservation?.roomNumber + '\n\r', {
                encoding: 'UTF-8',
                codepage: 20,
            
            });
            reservation?.tourDepartureLocation &&

                await BluetoothEscposPrinter.printText('Tur Kalkis Noktası: ' + reservation?.tourDepartureLocation + '\n\r', {
                    encoding: 'UTF-8',
                    codepage: 20,
                    widthtimes: 0,
                    heigthtimes: 0,
                    fonttype: 1,
                });

            await BluetoothEscposPrinter.printText('Yetiskin Sayisı: ' + reservation?.adultCount + '\n\r', {
                encoding: 'UTF-8',
                codepage: 20,
            
            });

            await BluetoothEscposPrinter.printText('Cocuk Sayisı: ' + reservation?.childCount + '\n\r', {
                encoding: 'UTF-8',
                codepage: 20,
            
            });

            if (reservation?.infantCount) {
                await BluetoothEscposPrinter.printText('Bebek Sayisı: ' + reservation?.infantCount + '\n\r', {
                    encoding: 'UTF-8',
                    codepage: 20,
                });
            }

            await BluetoothEscposPrinter.printText('\n------------------------------------------------\n', {
                encoding: 'UTF-8',
                codepage: 20,
            
            });

            await BluetoothEscposPrinter.printText('Toplam Tutar: ' + getCurrency(reservation?.currency) + reservation?.totalPrice + '\n\r', {
                encoding: 'UTF-8',
                codepage: 20,
            
            });

            await BluetoothEscposPrinter.printText('------------------------------------------------\n\r', {encoding: 'UTF-8',
            codepage: 20,
        
            
            });
            await BluetoothEscposPrinter.printText('VAKIFLAR BANKASI:\n\r', {
                encoding: 'UTF-8',
                codepage: 20,
            
            });

            await BluetoothEscposPrinter.printText('TR87 0001 5001 5800 7307 3089 79\n\r', {encoding: 'UTF-8',
            codepage: 20,
        
            
            });

            await BluetoothEscposPrinter.printText('\n\r', {encoding: 'UTF-8',
            codepage: 20,
        
            
            });

            await BluetoothEscposPrinter.printText('\n\r', {
            
            });

            await BluetoothEscposPrinter.printText('\n\r', {
            
            });

            await BluetoothEscposPrinter.printText('\n\r', {
            
            });
        } catch (error) {
            console.log('%capp/screens/ReservationDetail/index.tsx:212 error', 'color: #007acc;', error);
            alert(error.message || 'ERROR');
        }


    };

    return (
        <>
            <AppScreen navigationOptions={navigationOptions} barStyle={'dark-content'} px-0 py-0>
                <>
                    <Block p-20 flex>

                        <Shadow md>
                            <Block center middle row mb-10 style={{ backgroundColor: COLORS.white }} px-20 py-10 rounded-10>
                                <Block w-43 h-43>
                                    <AppImage url={"https://cdn.alanyatekmar.com/" + reservation?.image} style={{ width: 50, height: 50 }} resizeMode="cover" rounded-6 />
                                </Block>
                                <Block middle mr-auto ml-10>
                                    <Text bold>{reservation?.name}</Text>
                                    <Text>{moment(reservation?.createdAt).format('DD.MM.YYYY')}</Text>
                                </Block>
                                <Block>
                                    <Text style={{ textAlign: "right" }}>{reservation?.type == 0 ? reservation?.dayCount + " Günlük" : reservation?.type == 1 ? "Transfer" : reservation?.type == 2 ? "Tur" : "Hotel"}</Text>
                                    <Text style={{ textAlign: "right" }}>{reservation?.totalPrice} {currency(reservation?.currency)}</Text>
                                </Block>
                            </Block>
                        </Shadow>
                        <Shadow md>
                            <Block middle column mb-10 style={{ backgroundColor: COLORS.white }} px-20 py-10 rounded-10>
                                <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                    <Text color="primary">
                                        Rezervasyon Kodu: {" "}
                                    </Text>
                                    <Text bold color="primary">
                                        {reservation?.reservationCode}
                                    </Text>
                                </Block>
                                <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                    <Text color="primary">
                                        Rezervasyon Tarihi:  {" "}
                                    </Text>
                                    <Text bold color="primary">
                                        {moment(reservation?.reservationDate).format("LL")}
                                    </Text>
                                </Block>
                                {reservation?.checkIn && <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                    <Text color="primary">
                                        Giriş Tarihi:  {" "}
                                    </Text>
                                    <Text bold color="primary">
                                        {moment(reservation?.checkIn).format("LL")}
                                    </Text>
                                </Block>}
                                {reservation?.checkOut && <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                    <Text color="primary">
                                        Çıkış Tarihi:  {" "}
                                    </Text>
                                    <Text bold color="primary">
                                        {moment(reservation?.checkOut).format("LL")}
                                    </Text>
                                </Block>}
                                <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                    <Text color="primary">
                                        Oluşturan:  {" "}
                                    </Text>
                                    <Text bold color="primary">
                                        {reservation?.firstName + " " + reservation?.lastName}
                                    </Text>
                                </Block>
                                <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                    <Text color="primary">
                                        E-Posta:  {" "}
                                    </Text>
                                    <Text bold color="primary">
                                        {reservation?.email}
                                    </Text>
                                </Block>

                                <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                    <Text color="primary">
                                        Telefon Numarası:  {" "}
                                    </Text>
                                    <Text bold color="primary">
                                        {reservation?.phoneNumber}
                                    </Text>
                                </Block>
                                {reservation?.type === 2 && (
                                    <Block>
                                        <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                            <Text color="primary">
                                                Otel Adı:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {reservation?.hotelName}
                                            </Text>
                                        </Block>
                                        <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                            <Text color="primary">
                                                Oda Numarası:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {reservation?.roomNumber}
                                            </Text>
                                        </Block>

                                        <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                            <Text color="primary">
                                                Tur Kalkış Noktası:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {reservation?.tourDepartureLocation}
                                            </Text>
                                        </Block>

                                        <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                            <Text color="primary">
                                                Yetişkin Sayısı:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {reservation?.adultCount}
                                            </Text>
                                        </Block>

                                        <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                            <Text color="primary">
                                                Çocuk Sayısı:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {reservation?.childCount}
                                            </Text>
                                        </Block>
                                        {reservation?.infantCount ? (
                                            <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                                <Text color="primary">
                                                    Bebek Sayısı:  {" "}
                                                </Text>
                                                <Text bold color="primary">
                                                    {reservation?.infantCount}
                                                </Text>
                                            </Block>) : ""
                                        }

                                        <Block py-10 row spaceBetween>
                                            <Text color="primary">
                                                Toplam Tutar:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {getCurrency(reservation?.currency) + reservation?.totalPrice}
                                            </Text>
                                        </Block>

                                    </Block>
                                )}
                                {reservation?.type === 1 && (
                                    <Block>
                                        <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                            <Text color="primary">
                                                Otel Adı:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {reservation?.hotelName}
                                            </Text>
                                        </Block>
                                        <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                            <Text color="primary">
                                                Oda Numarası:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {reservation?.roomNumber}
                                            </Text>
                                        </Block>

                                        <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                            <Text color="primary">
                                                Tur Kalkış Noktası:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {reservation?.tourDepartureLocation}
                                            </Text>
                                        </Block>

                                        <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                            <Text color="primary">
                                                Yetişkin Sayısı:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {reservation?.adultCount}
                                            </Text>
                                        </Block>

                                        <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                            <Text color="primary">
                                                Çocuk Sayısı:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {reservation?.childCount}
                                            </Text>
                                        </Block>

                                        <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                            <Text color="primary">
                                                Bebek Sayısı:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {reservation?.infantCount}
                                            </Text>
                                        </Block>

                                        <Block py-10 row spaceBetween>
                                            <Text color="primary">
                                                Toplam Tutar:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {getCurrency(reservation?.currency) + reservation?.totalPrice}
                                            </Text>
                                        </Block>

                                    </Block>
                                )}
                                {reservation?.type === 0 && (
                                    <Block>
                                        <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                            <Text color="primary">
                                                Otel Adı:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {reservation?.hotelName}
                                            </Text>
                                        </Block>
                                        <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                            <Text color="primary">
                                                Oda Numarası:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {reservation?.roomNumber}
                                            </Text>
                                        </Block>

                                        <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                            <Text color="primary">
                                                Tur Kalkış Noktası:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {reservation?.tourDepartureLocation}
                                            </Text>
                                        </Block>

                                        <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                            <Text color="primary">
                                                Yetişkin Sayısı:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {reservation?.adultCount}
                                            </Text>
                                        </Block>

                                        <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                            <Text color="primary">
                                                Çocuk Sayısı:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {reservation?.childCount}
                                            </Text>
                                        </Block>

                                        <Block py-10 borderBottom={"1px solid #f9f9f9"} row spaceBetween>
                                            <Text color="primary">
                                                Bebek Sayısı:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {reservation?.infantCount}
                                            </Text>
                                        </Block>

                                        <Block py-10 row spaceBetween>
                                            <Text color="primary">
                                                Toplam Tutar:  {" "}
                                            </Text>
                                            <Text bold color="primary">
                                                {getCurrency(reservation?.currency) + reservation?.totalPrice}
                                            </Text>
                                        </Block>

                                    </Block>
                                )}
                            </Block>
                        </Shadow>

                        <Block style={{ width: '100%' }} pb-30>
                            <Block style={{ width: '100%', borderRadius: 10 }} middle center>
                                <LinearGradient colors={['#0193D7', '#00B3E6']} useAngle={true} angle={45} style={{ width: '100%', borderRadius: 10 }}>
                                    <AppButton h-50 onPress={printText} mt-0 type={'transparent'} title={"Fiş Yazdır"} />
                                </LinearGradient>
                            </Block>
                        </Block>
                    </Block>

                </>

            </AppScreen>
        </>
    );
};

export default ReservationDetail;
