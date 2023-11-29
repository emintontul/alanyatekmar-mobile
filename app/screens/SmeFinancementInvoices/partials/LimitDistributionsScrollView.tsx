import React, {useRef} from 'react';
import {Platform, ScrollView, StyleSheet} from 'react-native';

import {LimitDistributionModal, LimitDistributionModalMethods} from './LimitDistributionModal';

import {BankLimitCard, Block, Text} from '@/components';
import {window} from '@/theme';
import {heightPixel, IAllowancesCompanies, widthPixel} from '@/utils';

const CARD_WIDTH = window.width * 0.75;
const CARD_HEIGHT = 82;
const SPACING_FOR_CARD_INSET = window.width * 0.1 - 16;

interface LimitDistributionsScrollViewProps {
  allowancesCompaniesData: Array<IAllowancesCompanies> | undefined;
}

const LimitDistributionsScrollView = (props: LimitDistributionsScrollViewProps) => {
  const {allowancesCompaniesData} = props;
  const limitDistributionModal = useRef<LimitDistributionModalMethods>();

  return (
    <Block bg-darkGray py-16>
      <LimitDistributionModal ref={limitDistributionModal} />
      <Block px-16 row justify-between mb-10>
        <Text white semibold>
          sme.distribution_usable_limit
        </Text>
        <Text pressable opacity60 underline white60 onPress={() => limitDistributionModal.current?.open()}>
          common.see_all
        </Text>
      </Block>
      <ScrollView
        horizontal
        pagingEnabled
        decelerationRate={0}
        snapToInterval={widthPixel(CARD_WIDTH + 16)}
        snapToAlignment="center"
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {allowancesCompaniesData?.map((item: IAllowancesCompanies) => (
          <BankLimitCard key={item.Id} detail h-151 mr-6 style={styles.bankLimitCardItem} item={item} />
        ))}
      </ScrollView>
    </Block>
  );
};

export default LimitDistributionsScrollView;

const styles = StyleSheet.create({
  bankLimitCardItem: {
    width: widthPixel(CARD_WIDTH),
    minHeight: heightPixel(CARD_HEIGHT),
  },
  scrollContainer: {
    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : widthPixel(16),
  },
});
