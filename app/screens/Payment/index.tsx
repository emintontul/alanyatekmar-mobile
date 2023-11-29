import React, {useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {RegisteredCardData} from 'data/mock_data';
import {UseFormReturn} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import PaymentForm from './partials/PaymentForm';
import usePaymentForm, {IPaymentForm} from './partials/PaymentForm/useForm';
import RegisteredCards from './partials/RegisteredCard';

import {images} from '@/assets';
import {AppButton, AppIcon, AppImage, AppScreen, Block, Text} from '@/components';
import {useDialog, useStyledTag} from '@/hooks';
import {ICONS, RenderWhen} from '@/utils';

const PaymentFooter = ({form}: {form: UseFormReturn<IPaymentForm>}) => {
  const [isDisabled, setIsDisabled] = useState<boolean | undefined>(false);
  const navigation = useNavigation();
  const dialog = useDialog();

  const {watch} = form;

  useEffect(() => {
    const subscription = watch(value => {
      setIsDisabled(value?.isCheck);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = () => {
    navigation.goBack();
    setTimeout(() => {
      dialog.show({
        type: 'payment_success',
        position: 'left',
        title: 'Ödemeniz Başarılı',
        message: 'Tekliflerden biriyle devam edebilmeniz için yönlendiriliyorsunuz',
        action: [],
      });
    }, 300);
  };

  return (
    <Block absolute bottom-0 left-0 right-0 h-126 bg-white center px-18>
      <Block row>
        <Text opacity60 medium pt-12>
          payment.processing_fee
        </Text>
        <Text opacity60 lineThrough pt-12>
          : 120,00 TL
        </Text>
      </Block>
      <Block row pt-2>
        <Text success medium>
          payment.for_you
        </Text>
        <Text success bold>
          : 90,00 TL
        </Text>
      </Block>
      <AppButton disabled={!isDisabled} onPress={form.handleSubmit(onSubmit)} mt-8 h-47 type="primary" title="payment.pay" />
    </Block>
  );
};

const Payment = () => {
  const {t} = useTranslation();
  const {form} = usePaymentForm();

  const [isRegisteredCardsVisible, setIsRegisteredCardsVisible] = useState(RegisteredCardData.length > 0);

  const navigationOptions = {
    headerTitle: t('payment.payment'),
    headerRight: () => (
      <Text tinyGray pr-20>
        common.cancel
      </Text>
    ),
  };

  const Divider = useStyledTag(Block, 'h-1 bg-light w-full');
  const Header = useStyledTag(Block, 'px-20 pt-20 pb-14');
  const Content = useStyledTag(Block, 'p-20');

  return (
    <React.Fragment>
      <AppScreen scroll p-0 navigationOptions={navigationOptions}>
        <Block pb-40>
          <Header>
            <Text fs-24 semibold mb-12>
              payment.title
            </Text>
            <Text tiny opacity60>
              payment.subtitle
            </Text>
          </Header>
          <Divider />
          <Content>
            <Block row justify-between center>
              <Text fs-16 mb-12>
                payment.card_info
              </Text>
              <Text
                pressable
                tinyInfo
                medium
                onPress={() => {
                  setIsRegisteredCardsVisible(!isRegisteredCardsVisible);
                }}>
                {isRegisteredCardsVisible ? 'payment.add_new_card' : 'payment.saved_cards'}
              </Text>
            </Block>
            <RenderWhen>
              <RenderWhen.If isTrue={isRegisteredCardsVisible}>
                <RegisteredCards cardData={RegisteredCardData} />
              </RenderWhen.If>
              <RenderWhen.If isTrue={!isRegisteredCardsVisible}>
                <PaymentForm form={form} />
              </RenderWhen.If>
            </RenderWhen>
            <Block row mt-26>
              <AppIcon name={ICONS.LightInfo} />
              <Block flex>
                <Text ml-12 tiny opacity60 mb-20>
                  payment.info_text
                </Text>
                <AppImage url={images.ssl} width={57} height={28} />
              </Block>
            </Block>
          </Content>
        </Block>
      </AppScreen>
      <PaymentFooter form={form} />
    </React.Fragment>
  );
};

export default Payment;
