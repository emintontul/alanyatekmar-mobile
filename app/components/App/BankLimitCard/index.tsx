import React, {useRef} from 'react';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

import {useTranslation} from 'react-i18next';

import {DiscountedInvoicesModal, DiscountedInvoicesModalMethods} from './partials/DiscountedInvoicesModal';
import ExpiryModal, {ExpiryModalMethods} from './partials/ExpiryModal';
import InvoiceNotAcceptedModal, {InvoiceNotAcceptedModalMethods} from './partials/InvoiceNotAcceptedModal';

import {images} from '@/assets';
import {AppCheckbox, AppIcon, AppImage, Block, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {formatCurrency, IAllowancesCompanies, ICONS, IFinancementInvoices, RenderWhen} from '@/utils';

interface BankLimitCardProps {
  style?: ViewStyle | ImageStyle | TextStyle;
  item: IAllowancesCompanies;
  detail?: boolean;
  collapse?: boolean;
  checkbox?: boolean;
  checked?: boolean;
  onPressCheckbox?: () => void;
  invoices?: Array<IFinancementInvoices>;
}

const BankLimitCard = ({item, style, detail, collapse, checkbox, checked, onPressCheckbox, invoices, ...props}: BankLimitCardProps) => {
  const {t} = useTranslation();
  const DiscountedInvoicesModalRef = useRef<DiscountedInvoicesModalMethods>(null);
  const InvoiceNotAcceptedModalRef = useRef<InvoiceNotAcceptedModalMethods>(null);
  const ExpiryModalRef = useRef<ExpiryModalMethods>(null);
  const BankLimitCardContainer = useStyledTag(Block, 'bg-white p-12 pb-16', () => ({
    ...style,
  }));
  const ProgressContainer = useStyledTag(Block, 'h-4 bg-infoLight rounded-2');
  const ProgressBar = useStyledTag(Block, 'h-4 bg-info rounded-2', () => ({
    width: (1 / 1) * 100 + '%',
  }));

  //TODO: Seçtiği anda detail props ' u aktif edilecek
  //TODO: fatura seçildiği zaman kullanılabilir limit dağılımı değişecek.

  return (
    <Block rounded-4 mb-8>
      <BankLimitCardContainer pressable bg-white rounded-4 row {...props}>
        <AppImage url={item.Logo} width={32} height={32} rounded-4 />
        <Block ml-10 flex>
          <Block row justify-between>
            <Text medium>{item.CompanyName}</Text>
            {checkbox && <AppCheckbox rounded-50 checked={checked} onPress={onPressCheckbox} />}
          </Block>
          <Block row justify-between mt-4 mb-6>
            <Text bold>-</Text>
            <Text tiny opacity40 semibold>
              -
            </Text>
          </Block>
          <ProgressContainer>
            <ProgressBar />
          </ProgressContainer>
          <RenderWhen>
            <RenderWhen.If isTrue={detail}>
              <Block row wrap mt-14>
                <Block flex-1>
                  <Block pressable row center>
                    <Text tiny opacity60 mr-3>
                      common.amount_to_paid
                    </Text>
                  </Block>
                  <Text fs-14 bold pt-2>
                    -
                  </Text>
                  <Block row center>
                    <Text tiny mr-4>
                      {/* {item?.invoice || '-'} */}
                      {'-'}
                    </Text>
                    <Text tiny mr-4>
                      Fatura
                    </Text>
                    <Block pressable onPress={() => InvoiceNotAcceptedModalRef?.current?.open()}>
                      <AppIcon name={ICONS.LightInfo} size={16} color={COLORS.warning} />
                    </Block>
                  </Block>
                </Block>

                <Block flex-1 align-start ml-10>
                  <Block>
                    <Block row center>
                      <Text tiny opacity60 mr-3>
                        common.expiry
                      </Text>
                      <Block pressable onPress={() => ExpiryModalRef?.current?.open()}>
                        <AppIcon name={ICONS.LightInfo} size={16} color={COLORS.gray} />
                      </Block>
                    </Block>
                    <Text fs-14 bold pt-2 black>
                      {item?.expiryDay || '-'} Gün
                    </Text>
                    <Text tiny>{t('app_card.interest_rate', {amount: 12})}</Text>
                  </Block>
                </Block>
              </Block>
            </RenderWhen.If>
          </RenderWhen>
        </Block>
      </BankLimitCardContainer>
      {collapse && (
        <Block h-41 center middle bg-white mt-1 row pressable onPress={() => DiscountedInvoicesModalRef?.current?.open()}>
          <Text tinyGray>common.invoices</Text>
          <AppIcon name={ICONS.RightArrow} color={COLORS.gray} size={20} />
        </Block>
      )}
      <ExpiryModal ref={ExpiryModalRef} />
      <InvoiceNotAcceptedModal ref={InvoiceNotAcceptedModalRef} />
      <DiscountedInvoicesModal ref={DiscountedInvoicesModalRef} invoices={invoices || []} />
    </Block>
  );
};

export default BankLimitCard;
