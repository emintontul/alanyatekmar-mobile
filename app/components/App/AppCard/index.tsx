import React, {memo, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import moment from 'moment';

import {CardTypes, Props} from './app-card';
import {BankCard, CardAppropriate, CardDiscounted, CardInvoice, InvoiceRequest, WillBeDiscounted} from './partials';

import {images} from '@/assets';
import {AppCheckbox, AppIcon, AppImage, Block, Shadow, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {ICONS, IFinancementInvoices} from '@/utils';

function cardContentRender(type: string, item: IFinancementInvoices | undefined) {
  switch (type) {
    case CardTypes.FATURA:
      return <CardInvoice item={item} />;

    case CardTypes.ODEME_ONAYLANMIS:
      return <CardAppropriate item={item} />;

    case CardTypes.FATURA_TALEBI_KARTI:
      return <InvoiceRequest item={item} />;

    case CardTypes.ISKONTOLANMIS:
      return <CardDiscounted item={item} />;

    case CardTypes.BANKA:
      return <BankCard item={item} />;

    case CardTypes.ISKONTO_ISLEMDE_KIS:
      return <WillBeDiscounted item={item} />;
  }
}

const AppCard = (props: Props) => {
  const {cardType, isAllSelected, checkbox = false, onCheckedChange, item, summaryCard, icon, onIconPress} = props;
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isAllSelected);
  }, [isAllSelected]);

  const AppCardContainer = useStyledTag(Block, ' bg-white mb-6 relative p-16 rounded-4 pressable', () => ({
    backgroundColor: summaryCard ? COLORS.stroke60 : COLORS.white,
  }));

  return (
    <Shadow md>
      <AppCardContainer pressable>
        <Block row>
          <AppImage width={28} height={28} url={item?.image || images.akbank} rounded-4 />
          <Block ml-12 flex>
            <Block middle>
              <Block row justify-between flex>
                <Text fs-14 semibold>
                  {item?.ReceiverName || '-'}
                </Text>
                {CardTypes.ISKONTOLANMIS === cardType && <AppIcon name={ICONS.Clock2} color={COLORS.gray} />}
                {checkbox && (
                  <AppCheckbox
                    style={styles.checkbox}
                    onPress={() => {
                      setChecked(!checked);
                      onCheckedChange && onCheckedChange(item as IFinancementInvoices, !checked);
                    }}
                    checked={checked || false}
                  />
                )}
                {icon && (
                  <Block pressable onPress={onIconPress}>
                    <AppIcon name={icon} size={16} color={COLORS.gray} />
                  </Block>
                )}
              </Block>

              <Block row pt-2>
                <Text fs-12 info>
                  {item?.InvoiceNumber}
                </Text>
                {!summaryCard && moment(item?.IssueDate).format('DD.MM.YYYY') && <Text fs-12 opacity60>{` / ${moment(item?.IssueDate).format('DD.MM.YYYY')}`}</Text>}
              </Block>
            </Block>
            <Block style={styles.cardContentHeader}>{cardContentRender(cardType, item)}</Block>
          </Block>
        </Block>
      </AppCardContainer>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  cardContentHeader: {
    borderColor: COLORS.lightGray,
    borderTopWidth: 1,
    marginTop: 8,
    paddingTop: 8,
  },
  checkbox: {
    position: 'absolute',
    padding: 16,
    right: -16,
    top: -16,
  },
});

export default memo(AppCard);
