import React, {forwardRef, Ref, useImperativeHandle, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';

import Collapsible from 'react-native-collapsible';

import {images} from '@/assets';
import {AppButton, AppIcon, AppImage, Block, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {ICONS, RenderWhen} from '@/utils';

interface CollapsibleMethods {
  toggle: () => void;
}

interface BankDetailCardProps {
  item: IBankDetailCard;
  pending: boolean;
  isPaid: boolean;
}

export interface IBankDetailCard {
  id: number;
  bankName: string;
  paymentDate: string;
  paymentAmount: string;
  onConfirm: () => void;
}

const CollapsibleDetail = forwardRef(({item}: {item: any}, ref: Ref<CollapsibleMethods>) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  useImperativeHandle(ref, () => ({
    toggle: () => setIsCollapsed(!isCollapsed),
  }));

  return (
    <Collapsible collapsed={isCollapsed}>
      <Block style={styles.container}>
        <Block style={styles.item}>
          <Text tiny>request_detail.funding_rate</Text>
          <Text medium>{((item?.TotalBidAmount / item?.TotalPayableAmount) * 100).toFixed(2) || '-'}%</Text>
        </Block>
        <Block style={styles.item}>
          <Text tiny>request_detail.discountable_amount</Text>
          <Text medium>{item?.TotalPayableAmount || '-'}</Text>
        </Block>
        <Block style={styles.item}>
          <Text tiny>request_detail.total_deduction</Text>
          <Text medium>{(item?.TotalPayableAmount - item.TotalBidAmount).toFixed(2) || '-'}</Text>
        </Block>
        <Block style={styles.item}>
          <Text tiny>request_detail.interest_amount</Text>
          <Text medium>{item?.TotalInterestAmount || '-'}</Text>
        </Block>
        <Block style={styles.item}>
          <Text tiny>request_detail.comission_amount</Text>
          <Text medium>{item?.CommissionAmount || '-'}</Text>
        </Block>
        <Block style={styles.item}>
          <Text tiny>request_detail.rate</Text>
          <Text medium>{item?.InterestRate || '-'}</Text>
        </Block>
        <Block style={styles.item}>
          <Text tiny>request_detail.total_bsmw</Text>
          <Text medium>{item?.TotalBsmvAmount || '-'}</Text>
        </Block>
        <Block style={styles.item}>
          <Text tiny>request_detail.cost_amount</Text>
          <Text medium>{item?.CostAmount || '-'}</Text>
        </Block>
      </Block>
    </Collapsible>
  );
});

export const BankDetailCard = (props: BankDetailCardProps) => {
  const {item, pending, isPaid, onConfirm} = props;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const collapsibleRef = useRef<CollapsibleMethods>(null);
  const DetailButton = useStyledTag(Block, 'row center absolute right-0');
  const [loading, setLoading] = useState(false);

  return (
    <Block row bg-white mt-6 rounded-4 p-16>
      <AppImage url={item?.CompanyLogo || images.fibabank} width={24} height={24} />
      <Block ml-12 flex>
        <Block row justify-between>
          <Text semibold>{item?.CompanyName}</Text>
        </Block>
        <RenderWhen>
          <RenderWhen.If isTrue={pending}>
            <Text tiny mt-4>
              Teklif ortalama 10 dk içinde gelecek.
            </Text>
          </RenderWhen.If>
          <RenderWhen.If isTrue={!pending}>
            <DetailButton
              pressable
              onPress={() => {
                setIsCollapsed(!isCollapsed);
                collapsibleRef?.current?.toggle();
              }}>
              <Text tinyInfo semibold>
                common.detail
              </Text>
              <AppIcon name={isCollapsed ? ICONS.DownArrow : ICONS.UpArrow} size={14} color={COLORS.info} />
            </DetailButton>
            <Block>
              <CollapsibleDetail item={item} ref={collapsibleRef} />
              <Block row mt-6>
                <Block flex>
                  <Text tiny>request_detail.payment_receipt_date</Text>
                  <Text bold>{'-'}</Text>
                </Block>
                <Block flex>
                  <Text tiny>common.amount_to_paid</Text>
                  <Text bold>{item?.TotalBidAmount || '-'}</Text>
                </Block>
              </Block>
              <AppButton
                h-40
                mt-16
                loading={loading}
                disabled={!isPaid}
                onPress={async () => {
                  setLoading(true);
                  await onConfirm();
                  setLoading(false);
                }}
                type="primary"
                title="request_detail.confirm"
              />
            </Block>
          </RenderWhen.If>
        </RenderWhen>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  item: {
    flexDirection: 'column',
    marginTop: 10,
    width: '50%',
  },
});
