import React, {forwardRef, Ref, useImperativeHandle, useState} from 'react';
import {ScrollView} from 'react-native';

import {useTranslation} from 'react-i18next';

import AppCard from '../../AppCard';
import {CardTypes} from '../../AppCard/app-card';
import BottomModal from '../../BottomModal';

import {AppIcon, Block, Text} from '@/components/Common';
import {useStyledTag} from '@/hooks';
import {COLORS, window} from '@/theme';
import {heightPixel, ICONS, IFinancementInvoices, RenderWhen} from '@/utils';

export interface DiscountedInvoicesModalMethods {
  open: () => void;
}
interface DiscountedInvoicesModalProps {
  invoices: Array<IFinancementInvoices>;
}

export enum SuitableTypes {
  SUITABLE = 'suitable',
  UNSUITABLE = 'unsuitable',
}

interface ISuitableTypeProps {
  suitableType: SuitableTypes;
  onPress: (type: SuitableTypes) => void;
}

const SuitableView = ({suitableType, onPress}: ISuitableTypeProps) => {
  const {t} = useTranslation();
  const PaymentType = useStyledTag(Block, 'flex-1 rounded-4 border border-gray center middle', (itemProps: {active?: boolean}) => ({
    backgroundColor: itemProps.active ? COLORS.primaryLightOpacity : '',
    borderColor: itemProps.active ? COLORS.primaryLighter : COLORS.gray,
  }));

  return (
    <Block row wrap mb-16>
      <PaymentType mr-3 active={suitableType === SuitableTypes.SUITABLE} pressable onPress={() => onPress(SuitableTypes.SUITABLE)}>
        <Text defaultGray fs-12 px-15 py-9 textCenter semibold style={{color: suitableType === SuitableTypes.SUITABLE ? COLORS.primaryLighter : COLORS.gray}}>
          {t('create_sme.suitable_ones', {amount: '3'})}
        </Text>
      </PaymentType>
      <PaymentType ml-3 active={suitableType === SuitableTypes.UNSUITABLE} pressable onPress={() => onPress(SuitableTypes.UNSUITABLE)}>
        <Text defaultGray fs-12 px-15 py-9 textCenter semibold style={{color: suitableType === SuitableTypes.UNSUITABLE ? COLORS.primaryLighter : COLORS.gray}}>
          {t('create_sme.unsuitable_ones', {amount: '0'})}
        </Text>
      </PaymentType>
    </Block>
  );
};

export const DiscountedInvoicesModal = forwardRef((props: DiscountedInvoicesModalProps, ref: Ref<DiscountedInvoicesModalMethods>) => {
  const {invoices} = props;
  const [isVisible, setIsVisible] = useState(false);
  const [suitableType, setSuitableType] = useState<SuitableTypes>(SuitableTypes.SUITABLE);

  useImperativeHandle(ref, () => ({
    open: () => setIsVisible(true),
  }));

  // Uygun Olanlar
  const SuitableOnes = () => {
    return (
      <Block>
        <Text medium>create_sme.partially_discounted_invoices</Text>
        <Text tiny opacity60 mt-4>
          create_sme.partially_discounted_invoices_subtitle
        </Text>
        <Block mt-12>
          {invoices.map((item: IFinancementInvoices, index: number) => (
            <AppCard key={index} checkbox cardType={CardTypes.ISKONTO_ISLEMDE_KIS} item={item} isAllSelected={false} />
          ))}
        </Block>
        <Text medium mt-24>
          create_sme.invoices_eligible_for_discount
        </Text>
        <Text tiny opacity60 mt-4>
          create_sme.invoices_eligible_for_discount_subtitle
        </Text>
        <Block mt-12>
          {invoices.map((item: IFinancementInvoices, index: number) => (
            <AppCard key={index} checkbox cardType={CardTypes.ISKONTO_ISLEMDE_KIS} item={item} isAllSelected={false} />
          ))}
        </Block>
      </Block>
    );
  };

  // Uygun Olmayanlar
  const UnSuitableOnes = () => {
    return (
      <>
        <Text>Uygun Olmayanlar</Text>
      </>
    );
  };

  return (
    <BottomModal
      contentStyle="px-20 pt-12"
      title={
        <Block row center>
          <AppIcon name={ICONS.Paper} color={COLORS.font} size={16} />
          <Text sm ml-8>
            create_sme.invoices_modal_title
          </Text>
        </Block>
      }
      height={window.height - heightPixel(40)}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      closeButton>
      <Block flex>
        <SuitableView suitableType={suitableType} onPress={(_type: SuitableTypes) => setSuitableType(_type)} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <RenderWhen>
            <RenderWhen.If isTrue={suitableType === SuitableTypes.SUITABLE}>
              <SuitableOnes />
            </RenderWhen.If>
            <RenderWhen.If isTrue={suitableType === SuitableTypes.UNSUITABLE}>
              <UnSuitableOnes />
            </RenderWhen.If>
          </RenderWhen>
        </ScrollView>
      </Block>
    </BottomModal>
  );
});
